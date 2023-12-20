import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';

export const errorMessage = {
  UserNotActive: 'Usuário ainda não foi ativado',
  Unauthorized: 'Credenciais inválidas',
  CPFAlreadyExists: 'CPF já existe na base de dados',
  Forbidden: 'Senha atual Incorreta',
};

export const feedback = {
  'confirm-account': {
    icon: faEnvelopeCircleCheck,
    title: 'Cadastro confirmado com sucesso!',
    description:
      'Seu cadastro foi concluído! Agora, você pode começar a utilizar nossa plataforma. Bem-vindo!',
    redirect: {
      href: '/auth/login',
      text: 'Voltar a tela de login',
    },
  },
  'confirm-register': {
    icon: faEnvelopeCircleCheck,
    title: 'Cadastro realizado com sucesso!',
    description:
      'Verifique o e-mail encaminhado para você, clique no link gerado para realizar a confirmação de seu cadastro.',
    redirect: {
      href: '/',
      text: 'Voltar ao início',
    },
  },
  'forgot-password': {
    icon: faEnvelopeCircleCheck,
    title: 'E-mail encaminhado, verifiquei sua caixa de entrada.',
    description:
      'Dentro de instantes, acesse seu e-mail e clique no link para redefinir sua senha.',
    redirect: {
      href: '/auth/login',
      text: 'Voltar a tela de login',
    },
  },
  'reset-password': {
    icon: faEnvelopeCircleCheck,
    title: 'Senha alterada com sucesso!',
    description:
      'Agora você já pode realizar o login utilizando sua nova senha.',
    redirect: {
      href: '/auth/login',
      text: 'Voltar a tela de login',
    },
  },
};
