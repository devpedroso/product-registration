import S from './styles.module.scss';

import { Button as Btn, ButtonProps } from 'antd';

interface ButtonObjectProps extends ButtonProps {
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed';
  color?: string;
  callback?: () => void;
  children?: React.ReactNode;
}

const Button = ({
  type = 'default',
  color,
  children,
  ...props
}: ButtonObjectProps) => {
  const style = {
    default: S.default,
    primary: S.primary,
    ghost: S.blacked,
    dashed: S.dashed,
    link: S.link,
    text: S.text,
  };

  const classButton = style[type];

  return (
    <Btn
      type={type}
      className={classButton}
      style={{ color: `${color}` }}
      {...props}
    >
      {children}
    </Btn>
  );
};

export default Button;
