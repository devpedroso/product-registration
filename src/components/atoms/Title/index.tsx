import { colorTypography, sizes } from '@/utils/enum';
import { conversionPixelToRem } from '@/utils/functions';
import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';

export interface TitleObjectProps extends TitleProps {
  size?: sizes;
  padding?: [number, number];
  color?: colorTypography;
  children: React.ReactNode;
}

const Title = ({
  size = sizes.df,
  padding = [0, 0],
  color,
  children,
  ...props
}: TitleObjectProps) => {
  return (
    <Typography.Title
      style={{
        fontSize: `${conversionPixelToRem(size)}rem`,
        color: `var(--neutral-${color})`,
        padding: `${conversionPixelToRem(padding[0])}rem ${conversionPixelToRem(
          padding[1]
        )}rem`,
      }}
      {...props}
    >
      {children}
    </Typography.Title>
  );
};

export default Title;
