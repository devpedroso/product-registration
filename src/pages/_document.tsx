import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MP72NJ74');`,
            }}
          />
          <meta
            name="facebook-domain-verification"
            content="dgejlsiiq8fypru73n0fjd62g4dgof"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/assets/logo.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript
            dangerouslySetInnerHTML={{
              __html:
                '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MP72NJ74" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
            }}
          />
        </body>
      </Html>
    );
  }
}
