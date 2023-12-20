import S from './styles.module.scss';

import { MouseEvent, useEffect, useState } from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

const Favorite = ({ favorited, onClick }) => {
  const [favorite, setFavorite] = useState(favorited);

  useEffect(() => {
    setFavorite(favorited);
  }, [favorited]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setFavorite(!favorite);
    onClick(!favorite);
  };

  return (
    <div onClick={handleClick}>
      {favorite ? (
        <HeartFilled className={S.icon} />
      ) : (
        <HeartOutlined className={S.icon} />
      )}
    </div>
  );
};

export default Favorite;
