export default () => ({
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
  nvm: {
    environment: process.env.NVM_ENVIRONMENT,
    agentDid: process.env.NVM_AGENT_DID,
    subscriptionDid: process.env.NVM_SUBSCRIPTION_DID
  },
  logger: {
    level: process.env.LOG_LEVEL || ['error', 'log', 'warn']
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
})
