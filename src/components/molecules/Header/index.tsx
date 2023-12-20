import S from './styles.module.scss';

import Link from 'next/link';
import { Image, Row } from 'antd';

const Header = () => (
  <Row align="middle" justify="space-between" className={S.header}>
    <Link href="/">
      <Image
        src="/assets/logo.svg"
        alt="Imagem do logo"
        preview={false}
        className={S.logo}
      />
    </Link>
  </Row>
);

export default Header;
