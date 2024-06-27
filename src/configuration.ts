export const appConfig = {
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
    type: process.env.DATABASE_TYPE || 'sqlite', // sqlite, mysql, postgres, etc
    name: process.env.DATABASE_NAME || '/tmp/agent-template.db', // path to the database file if sqlite if is a different database type put the database name instead
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    schena: process.env.DATABASE_SCHEMA
  },
  processor: {
    sleepDuration: Number(process.env.AGENT_SLEEP_DURATION) || 3000, // In milliseconds
    ipfsGateway: process.env.IPFS_GATEWAY || 'https://ipfs.infura.io:5001',
    ipfsProjectId: process.env.IPFS_PROJECT_ID,
    ipfsProjectSecret: process.env.IPFS_PROJECT_SECRET
  }
}
export default () => appConfig
