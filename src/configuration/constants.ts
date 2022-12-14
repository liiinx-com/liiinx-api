export const API_VERSION = "API_VERSION";
export const API_NAME = "API_NAME";
export const JWT_SECRET = "JWT_SECRET";

export const VERIFY_TOKEN = "VERIFY_TOKEN";
export const FACEBOOK_PAGE_ACCESS_TOKEN = "FACEBOOK_PAGE_ACCESS_TOKEN";

export const POSTGRES_URL = "POSTGRES_URL";
export const REDIS_URL = "REDIS_URL";
export const REDIS_MESSENGER_QUEUE = {
  name: "MESSENGER_QUEUE",
  keys: {
    messageReceived: "message-received",
    postbackReceived: "postback-received",

    sendResponse: "send-response",
    sendSenderAction: "send-sender-action",
  },
};
export const JIRA_CONFIG = {
  HOST: "JIRA_HOST",
  USERNAME: "JIRA_USERNAME",
  TOKEN: "JIRA_TOKEN",
};

export const MAIL_CONFIG = {
  HOST: "MAIL_HOST",
  USERNAME: "MAIL_USERNAME",
  PASSWORD: "MAIL_PASSWORD",
  PORT: "MAIL_PORT",
  DEFAULT_SENDER: "MAIL_DEFAULT_SENDER",
};

export const WOO_COMMERCE_CONFIG = {
  URL: "WOO_COMMERCE_URL",
  KEY: "WOO_COMMERCE_KEY",
  SECRET: "WOO_COMMERCE_SECRET",
};
