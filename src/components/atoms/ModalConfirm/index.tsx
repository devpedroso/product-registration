import S from './styles.module.scss';

import { ReactNode } from 'react';
import { Modal } from 'antd';

const { confirm } = Modal;

interface ModalConfirmData {
  onOk: () => void;
  title: ReactNode;
  content: ReactNode;
  icon: ReactNode;
}

const ModalConfirm = ({ onOk, title, content, icon }: ModalConfirmData) => {
  confirm({
    className: S.confirmation,
    title: title,
    icon: icon,
    content: content,
    onOk() {
      onOk();
    },
    okButtonProps: {
      type: 'primary',
      className: S.btnOk,
    },
    cancelButtonProps: {
      className: S.btnCancel,
    },
    centered: true,
  });
};

export default ModalConfirm;
