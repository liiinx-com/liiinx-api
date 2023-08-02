export const API_VERSION = 'API_VERSION';
export const API_NAME = 'API_NAME';

export const POSTGRES_URL = 'POSTGRES_URL';
export const REDIS_URL = 'REDIS_URL';
export const REDIS_QUEUE = {
  name: 'QUEUE_NAME',
  keys: {
    messageReceived: 'message-received',
  },
};

export const JWT_CONFIG = {
  SECRET: 'JWT_SECRET',
  EXPIRES_IN: 'JWT_EXPIRES_IN',
};

export const MAIL_CONFIG = {
  HOST: 'MAIL_HOST',
  USERNAME: 'MAIL_USERNAME',
  PASSWORD: 'MAIL_PASSWORD',
  PORT: 'MAIL_PORT',
  DEFAULT_SENDER: 'MAIL_DEFAULT_SENDER',
};

export const WOO_COMMERCE_CONFIG = {
  URL: 'WOO_COMMERCE_URL',
  KEY: 'WOO_COMMERCE_KEY',
  SECRET: 'WOO_COMMERCE_SECRET',
};
