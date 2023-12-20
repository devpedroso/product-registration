import Head from 'next/head';

interface SeoProps {
  title?: string;
  description?: string;
}

const Seo = ({ title = 'Cadastro de Produto', description = '' }: SeoProps) => {
  const metaTitle = title;
  const metaDescription = description;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={metaTitle} />
      <meta name="og:description" content={metaDescription} />
    </Head>
  );
};

export default Seo;
