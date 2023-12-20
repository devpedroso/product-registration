import S from './styles.module.scss';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { Carousel, Col, Divider, Image, Row, Space, Tag } from 'antd';
import {
  FileImageOutlined,
  LeftOutlined,
  PhoneFilled,
  RightOutlined,
} from '@ant-design/icons';

import Title from '@/components/atoms/Title';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';

import { BreakpointContext } from 'src/contexts/BreakpointContext';
import { colorTypography, sizes } from '@/utils/enum';

const Preview = ({
  title,
  price = null,
  description,
  state,
  city,
  photos,
  condition,
  phoneNumber = null,
  fullName = null,
  isRenew = false,
  onConfirm = () => {},
  onClose = () => {},
}) => {
  const { isMobile } = useContext(BreakpointContext);

  const [files, setFiles] = useState([]);

  setTimeout(() => setFiles(photos), 100);

  const myInterval = setInterval(() => {
    if (files.length <= 0) {
      setFiles(photos);
    }
  }, 1000);
  setTimeout(() => clearInterval(myInterval), 5000);

  let priceFormat = new Intl.NumberFormat('pt-BR').format(
    price?.toString().replace(',', '.')
  );

  if (priceFormat.split(',')[1]?.length === 1) {
    priceFormat = `${priceFormat}0`;
  }

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Space direction="vertical" size={16} className={S.container}>
      <div className={S.preview}>
        <Space direction="vertical" size={24}>
          <Space direction="vertical" size={16}>
            <Row justify="space-between" align="middle">
              <Text color={colorTypography.NEUTRAL_500} size={sizes.sm}>
                {city ? `${city} - ${state}` : 'Localização'}
              </Text>
            </Row>

            {files?.length > 0 ? (
              <div>
                <Carousel
                  className={S.carroussel}
                  arrows={!isMobile && true}
                  prevArrow={<LeftOutlined />}
                  nextArrow={<RightOutlined />}
                >
                  {files?.map((image) => (
                    <img
                      key={image?.uid}
                      src={image?.url}
                      alt={image?.name}
                      className={S.img}
                    />
                  ))}
                </Carousel>
              </div>
            ) : (
              <div className={S.message}>
                <Space direction="vertical" align="center" size={16}>
                  <FileImageOutlined />
                  <Text color={colorTypography.NEUTRAL_600}>
                    Imagens, você poderá ver a prévia de como aparecerá para
                    outras pessoas.
                  </Text>
                </Space>
              </div>
            )}
          </Space>

          <Space direction="vertical" size={16}>
            <Row justify="space-between" style={{ paddingRight: '0.5rem' }}>
              <Title color={colorTypography.NEUTRAL_600} size={sizes.md}>
                {title ? title : 'Título'}
              </Title>
            </Row>
            <span className={S.price}>
              R$ {price != null ? priceFormat : 0}
            </span>
          </Space>

          <Title color={colorTypography.NEUTRAL_500} size={sizes.sm}>
            Condição: {condition}
          </Title>
        </Space>

        <Divider />

        <Space direction="vertical">
          <Title color={colorTypography.NEUTRAL_600} size={sizes.lmd}>
            Descrição
          </Title>

          <Text color={colorTypography.NEUTRAL_600}>
            <div style={{ whiteSpace: 'pre-line' }}>{description}</div>
          </Text>
        </Space>

        <Divider />

        <Space direction="vertical" size={24}>
          <Space direction="vertical" className={S.phone}>
            <Title color={colorTypography.NEUTRAL_600} size={sizes.md}>
              <Space>
                Contato <PhoneFilled />
              </Space>
            </Title>
            <Space direction="vertical">
              <Space>
                <Text color={colorTypography.NEUTRAL_500}>
                  Telefone / Celular:
                </Text>
                <Link href={`tel:${phoneNumber}`}>
                  <Title
                    color={colorTypography.NEUTRAL_600}
                    className={S.phoneNumber}
                  >
                    {phoneNumber}
                  </Title>
                </Link>
              </Space>

              {fullName && (
                <Space>
                  <Text color={colorTypography.NEUTRAL_500}>Vendedor:</Text>
                  <Title color={colorTypography.NEUTRAL_600}>
                    {fullName.split(' ')[0]}
                  </Title>
                </Space>
              )}
            </Space>
          </Space>

          {isMobile && (
            <Row gutter={8}>
              <Col span={12}>
                <Button size="large" block onClick={onClose}>
                  Corrigir
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleConfirm}
                >
                  Confirmar
                </Button>
              </Col>
            </Row>
          )}

          {isRenew && (
            <Button type="primary" size="large" block onClick={handleConfirm}>
              Confirmar
            </Button>
          )}
        </Space>
      </div>
    </Space>
  );
};

export default Preview;
