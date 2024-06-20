[![banner](https://raw.githubusercontent.com/nevermined-io/assets/main/images/logo/banner_logo.png)](https://nevermined.io)

# Nevermined Agent API Template (Typescript)

> Build AI Agents able to interact with other Agents and the Nevermined Network.

---

## Table of Contents

- [Nevermined Agent API Template (Typescript)](#nevermined-agent-api-template-typescript)
  - [Table of Contents](#table-of-contents)
  - [Info](#info)
  - [How to run it](#how-to-run-it)
  - [How to configure the agent](#how-to-configure-the-agent)
  - [How to use the template to build your AI Agent](#how-to-use-the-template-to-build-your-ai-agent)
  - [License](#license)

---

## Info

This repository contains a template to build AI Agents able to interact with other Agents and the Nevermined Network. Using this template, you get out of the box the following features:

- Standard HTTP API interface to expose your AI agent logic to others
- Generic model normalizing tasks and steps in such a way external users can interface with your agent in a standard way
- Automatic OpenAPI documentation generation
- Generic boilerplate code allowing to keep track and retrieve the tasks and steps executed by the agent
- HTTP Authorization to protect the API endpoints
- Integration with Nevermined ecosystem

## How to run it

Just clone this repository and run the following commands:

```bash
# Install all the dependencies
$ yarn

# Start the server
$ yarn start
```

By default the server will start at `http://localhost:4100`. You can change the port by setting the `API_PORT` environment variable.

## How to configure the agent

The agent can be configured using environment variables. The following variables are available:

- `API_HOST`: The host where the server will listen to. Default is `localhost`.
- `API_PORT`: The port where the server will listen to. Default is `4100`.
- `API_AUTH_TOKEN`: If given the server will require this token to be passed in the `Authorization` header to access the API. Example: If `AUTH_TOKEN=my-secret-token` the client will need to send the following header in the request: `Authorization: Bearer my-secret-token`.
- `API_ENABLE_HTTPS_REDIRECT`: Enable the automatic redirection to HTTPS. Default is `false`.
- `NVM_ENVIRONMENT`: The Nevermined environment where the agent is registered. Default is `appTesting`. You can find the full list here: <https://docs.nevermined.app/docs/environments/>
- `NVM_AGENT_DID`: The DID of the agent. This is used to identify the agent in the Nevermined network. Example: `did:nv:123456789abcdefghi`.
- `NVM_SUBSCRIPTION_DID`: The DID of the subscription. This is used to identify the subscription in the Nevermined network. Example: `did:nv:123456789abcdefghi`.

## How to use the template to build your AI Agent

The template is designed to be as simple as possible to allow you to focus on the AI logic of your agent. The main files you need to modify are:

- `agent.service.ts`: This file contains the main logic of your agent. You can implement your AI logic here.

## License

```text
Copyright 2024 Nevermined AG

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
