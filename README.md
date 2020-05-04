# Bitcoin regtest

## Description

Testing Bitcoin is difficult because block times are slow, and there are not many testnet transactions.

Bitcoin regtest allows spinning up a Dockerized Bitcoin private network consisting of many connected nodes. The nodes periodically send Bitcoin eachother and mine a block every 5 seconds, allowing for much for rapid development.

## Dependencies

- Docker
- Nodejs
- NPM

## Usage

Install dependencies

```bash
npm install
```

Run nodes (first time running this will take some time because Docker needs to build the container)

```bash
node index.js
```

RPC exposed on port 2000

- user: rpcuser
- pw: rpcpassword

ZMQ exposed on port 29000

## Troubleshooting

Rebuild the Docker image: `docker build --pull --no-cache --tag regtest-image:latest .`

## Credit

Thank you Alexey Lunacharsky for the initial implementation (https://github.com/alun/bitcoin-regtest)

(c) 2015-2016 Alexey Lunacharsky

Updated to work with latest Bitcoin version and further modified by Blocknative
