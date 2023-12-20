import S from './styles.module.scss';

import { Modal as ModalAnt } from 'antd';

import Title from '../Title';
import { sizes } from '@/utils/enum';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  footer: ReactNode;
  width?: number | string;
  destroyOnClose?: boolean;
  children: ReactNode;
}

const Modal = ({
  title,
  open,
  setOpen,
  footer,
  width,
  destroyOnClose = true,
  children,
  ...props
}: ModalProps) => {
  return (
    <ModalAnt
      forceRender
      width={width}
      title={<Title size={sizes.df}>{title}</Title>}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={footer}
      destroyOnClose={destroyOnClose}
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      {...props}
    >
      {children}
    </ModalAnt>
  );
};

export default Modal;
