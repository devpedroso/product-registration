import S from './styles.module.scss';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading = ({ loading }) => {
  return (
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined />}
      className={loading ? S.loading : S.none}
    />
  );
};

export default Loading;
