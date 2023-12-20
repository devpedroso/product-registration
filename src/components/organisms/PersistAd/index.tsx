import S from './styles.module.scss';

import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, message, Modal, Select, Space } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { TextArea } = Input;

import Drag from '@/components/atoms/Drag';
import Title from '@/components/atoms/Title';
import Button from '@/components/atoms/Button';
import ModalConfirm from '@/components/atoms/ModalConfirm';
import InputCurrency from '@/components/atoms/InputCurrency';
import Preview from '../Preview';

import { api, apiState } from 'src/services/api';

import { BreakpointContext } from 'src/contexts/BreakpointContext';

import conditions from '@/utils/conditions.json';

const PersistAd = () => {
  const { isMobile } = useContext(BreakpointContext);

  const router = useRouter();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({} as any);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [contidions, setConditions] = useState(conditions);
  const [preview, setPreview] = useState<ReactNode>();
  const [open, setOpen] = useState(false);
  const [isSafeRoute, setIsSafeRoute] = useState(false);

  const [fileList, setFileList] = useState<any[]>([]);
  const [photosToDelete, setPhotosToDelete] = useState([]);

  const currencyRef = useRef(null);
  const photosRef = useRef(null);

  useEffect(() => {
    apiState.get('').then((response) => {
      setStates(
        response.data.map((q) => {
          return { name: q.nome, id: q.id, uf: q.sigla };
        })
      );
    });
  }, []);

  useEffect(() => {
    const warningText =
      'Deseja sair desta página? É possível que as alterações feitas não sejam salvas?';

    const handleWindowClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = warningText);
    };

    const handleBrowseAway = () => {
      if (isSafeRoute) return;
      if (window.confirm(warningText)) return;

      if (router.asPath !== window.location.pathname) {
        window.history.pushState('', '', router.asPath);
      }

      throw 'routeChange aborted.';
    };

    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
  }, [router, isSafeRoute]);

  const handleChangeState = (state) => {
    getCities(state);
    handleChangeForm();
  };

  const getCities = (state) => {
    apiState.get(`${state}/municipios`).then((response) => {
      form.setFieldValue('cityId', {
        label: response.data?.municipio?.nome,
        value: response.data?.id,
      });

      setCities(
        response.data.map((q) => {
          return { name: q.nome, id: q.id };
        })
      );
    });
  };

  const onFinish = () => {
    showConfirm();
  };

  const onFinishFailed = (errorInfo: any) => {
    const namePath = errorInfo.errorFields[0].name[0];

    if (namePath === 'photos') {
      photosRef.current?.focus();
    } else if (namePath === 'price') {
      currencyRef.current.focus();
    } else {
      form.getFieldInstance(namePath)?.focus();
    }
  };

  const handlePersistAd = async () => {
    message.success(
      'Produto enviado com sucesso, obrigado por contribuir com nossa base de dados.'
    );

    form.resetFields();
    setFormValues({});
    setFileList([]);
    setOpen(false);
  };

  const handleChangeForm = () => {
    setFormValues(form.getFieldsValue());
  };

  const handleChangePrice = (value) => {
    form.setFieldValue('price', value);
  };

  const onPreview = async () => {
    try {
      await form.validateFields();
      setOpen(true);
    } catch (err) {
      onFinishFailed(err);
    }
  };

  const showConfirm = () => {
    ModalConfirm({
      onOk: () => handlePersistAd(),
      title: 'Criar anúncio',
      icon: <ExclamationCircleFilled />,
      content: (
        <Space direction="vertical" size={20}>
          <span>Criar esse anúncio?</span>
        </Space>
      ),
    });
  };

  useEffect(() => {
    setPreview(
      <Preview
        key={1}
        title={formValues?.title}
        price={formValues?.price}
        description={formValues?.description}
        state={states.find((state) => state.id === formValues?.state)?.uf}
        city={cities.find((city) => city.id === formValues?.cityId)?.name}
        photos={fileList}
        condition={
          contidions.find(
            (condition) => condition.id === formValues?.itemConditionId
          )?.condition
        }
        onConfirm={() => form.submit()}
        onClose={() => setOpen(false)}
      />
    );
  }, [form, formValues, cities, states, contidions, fileList]);

  return (
    <>
      <Modal
        title="Preview do anúncio"
        width="100%"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        className={S.modal}
      >
        {preview}
      </Modal>

      <div className={S.container}>
        <div className={S.formAd}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onChange={handleChangeForm}
            scrollToFirstError={{
              behavior: 'auto',
              block: 'center',
              inline: 'end',
            }}
          >
            <Space direction="vertical" size={32}>
              <Space direction="vertical" size={isMobile ? 10 : 16}>
                <Form.Item
                  name="photos"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator() {
                        if (getFieldValue('intent') === 'BUY') {
                          return Promise.resolve();
                        }

                        if (fileList?.length > 0) {
                          return Promise.resolve();
                        }

                        if (!fileList || fileList.length === 0) {
                          return Promise.reject(
                            new Error('Insira pelo menos uma imagem')
                          );
                        }

                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Drag
                    ref={photosRef}
                    photosToDelete={photosToDelete}
                    setPhotosToDelete={setPhotosToDelete}
                    fileList={fileList}
                    setFileList={setFileList}
                  />
                </Form.Item>

                <Form.Item
                  label="Título"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: 'Insira um título válido',
                    },
                  ]}
                >
                  <Input size="small" maxLength={70} />
                </Form.Item>

                <Form.Item
                  label="Preço (R$)"
                  name="price"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (getFieldValue('intent') === 'BUY') {
                          return Promise.resolve();
                        }

                        if (!value || Number(value) === 0) {
                          return Promise.reject(
                            new Error('Insira um preço no seu item')
                          );
                        }

                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <InputCurrency
                    ref={currencyRef}
                    value={0}
                    onChange={handleChangePrice}
                  />
                </Form.Item>

                <Form.Item
                  label="Condição"
                  name="itemConditionId"
                  rules={[
                    {
                      required: true,
                      message: 'Insira a condição do item',
                    },
                  ]}
                >
                  <Select
                    onChange={handleChangeForm}
                    options={contidions?.map((condition) => ({
                      label: condition.condition,
                      value: condition.id,
                    }))}
                  />
                </Form.Item>

                <Form.Item
                  label="Estado"
                  name="state"
                  rules={[
                    {
                      required: true,
                      message: 'Selecione estado',
                    },
                  ]}
                >
                  <Select
                    onChange={handleChangeState}
                    options={states?.map((state) => ({
                      label: state.name,
                      value: state.id,
                      uf: state.uf,
                    }))}
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Cidade"
                  name="cityId"
                  rules={[
                    {
                      required: true,
                      message: 'Selecione cidade',
                    },
                  ]}
                >
                  <Select
                    onChange={handleChangeForm}
                    options={cities?.map((city) => ({
                      label: city.name,
                      value: city.id,
                    }))}
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Descrição"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: 'Insira a descrição do item',
                    },
                  ]}
                >
                  <TextArea rows={6} maxLength={600} showCount />
                </Form.Item>
              </Space>

              <Space direction="vertical">
                {isMobile ? (
                  <Button type="primary" size="large" block onClick={onPreview}>
                    Enviar anúncio
                  </Button>
                ) : (
                  <Button type="primary" size="large" block htmlType="submit">
                    Enviar anúncio
                  </Button>
                )}
              </Space>
            </Space>
          </Form>
        </div>

        <div className={S.preview}>
          <Space direction="vertical" size={16}>
            <Title>Preview do anúncio</Title>
            {preview}
          </Space>
        </div>
      </div>
    </>
  );
};

export default PersistAd;
