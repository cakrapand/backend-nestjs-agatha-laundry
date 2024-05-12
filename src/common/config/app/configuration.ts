import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  access_token: process.env.ACCESS_TOKEN_SECRET,
  refresh_token: process.env.REFRESH_TOKEN_SECRET,
  midtrans_client_key: process.env.MIDTRANS_CLIENT_KEY,
  midtrans_server_key: process.env.MIDTRANS_SERVER_KEY,
}));
