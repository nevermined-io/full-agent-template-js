export const testConfig = {
  api: {
    host: process.env.API_HOST || 'localhost',
    port: parseInt(process.env.API_PORT, 10) || 4100,
    url:
      process.env.API_URL ||
      `http://${process.env.API_HOST || 'localhost'}:${
        process.env.API_PORT || '4100'
      }`,
    authToken: process.env.API_AUTH_TOKEN,
    enableHttpsRedirect: process.env.API_ENABLE_HTTPS_REDIRECT === 'true'
  },
  database: {
    type: process.env.DATABASE_TYPE || 'sqlite', // sqlite, mysql, postgres, etc
    name: process.env.DATABASE_NAME || '/tmp/test/agent-template.db', // path to the database file if sqlite if is a different database type put the database name instead
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    schena: process.env.DATABASE_SCHEMA
  }
}
export default () => testConfig
