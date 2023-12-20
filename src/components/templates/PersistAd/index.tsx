import { useEffect, useState } from 'react';

import Header from '@/components/molecules/Header';
import PersistAd from '@/components/organisms/PersistAd';
import { headerType } from '@/utils/enum';

import { Ad } from 'src/services/models/ad';
import { api } from 'src/services/api';
import { useRouter } from 'next/router';
import Loading from '@/components/atoms/Loading';

const PersistAdTemplate = () => {
  const [ad, setAd] = useState<Ad>({} as Ad);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <Loading loading={loading} />
      <Header type={headerType.ANUNCIO} />
      <PersistAd />
    </>
  );
};

export default PersistAdTemplate;
