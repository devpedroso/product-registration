import { colorTypography, sizes } from '@/utils/enum';
import { conversionPixelToRem } from '@/utils/functions';
import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';

interface TextObjectProps extends TextProps {
  size?: sizes;
  color?: colorTypography;
  children: React.ReactNode;
}

const Text = ({
  size = sizes.df,
  color,
  children,
  ...props
}: TextObjectProps) => (
  <Typography.Text
    style={{
      fontSize: `${conversionPixelToRem(size)}rem`,
      color: `var(--neutral-${color})`,
    }}
    {...props}
  >
    {children}
  </Typography.Text>
);

export default Text;
