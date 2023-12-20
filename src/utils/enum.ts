export enum headerType {
  AUTH = 'auth',
  ESQUECI_SENHA = 'esqueci-senha',
  REDEFINIR_SENHA = 'redefinir-senha',
  EMAIL_CONFIRMACAO = 'email-confirmacao',
  DASHBOARD = 'dashboard',
  ANUNCIO = 'anuncio',
}

export enum inputTypes {
  DEFAULT = 'default',
  PASSWORD = 'password',
}

export enum sizes {
  xs = 12,
  sm = 14,
  df = 16,
  lmd = 18,
  md = 20,
  lg = 24,
  llg = 26,
  xl = 32,
  xxl = 40,
  xxxl = 48,
}

export enum personTypes {
  PROFESSIONAL,
  CUSTOMER,
}

export enum colorTypography {
  NEUTRAL_400 = '400',
  NEUTRAL_500 = '500',
  NEUTRAL_600 = '600',
}

export const rating = {
  1: 'Muito ruim',
  2: 'Ruim',
  3: 'Neutro',
  4: 'Bom',
  5: 'Muito bom',
};

export const ratingColor = {
  1: '--primary-100',
  2: '--primary-100',
  3: '--neutral-500',
  4: '--success-100',
  5: '--success-100',
};

export const goBurnChartData = {
  meanAccuracy: 'Acurácia média',
  totalActiveTime: 'Tempo ativo total',
  totalCalories: 'Total de calorias gastas',
  totalScore: 'Score total acumulado',
  totalSessions: 'Total de sessões mapeadas',
};
