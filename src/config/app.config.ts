export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGO_DB_URL,
  port: +process.env.PORT || 3001,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7,
  defaultOffset: +process.env.DEFAULT_OFFSET || 0,
});
