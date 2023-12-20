export const requireAuthentication = async (context) => {
  if (!context.req.headers.cookie) {
    return {
      props: {
        authenticated: false,
      },
      redirect: {
        destination: '/auth/login',
      },
    };
  }

  return {
    props: {
      authentication: true,
    },
  };
};
