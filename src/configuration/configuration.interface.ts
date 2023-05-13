export interface ApiInfo {
  name: string;
  version: string;
}

export interface RedisConfig {
  url: string;
}

export interface PostgresConfig {
  url: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface MailConfig {
  host: string;
  username: string;
  password: string;
  defaultSender: string;
}

export interface WooCommerceConfig {
  url: string;
  key: string;
  secret: string;
  version: string;
}