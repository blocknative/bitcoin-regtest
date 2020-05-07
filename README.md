# Bitcoin simulated network

## Description

Testing Bitcoin is difficult because block times are slow, and there are not many testnet transactions.

Bitcoin simulated network allows spinning up a Dockerized Bitcoin regtest network consisting of many connected nodes. The nodes have funded wallets, and periodically send Bitcoin between each other. A random node is selected every 5 seconds to mine a block.

This allows for much more rapid development compared to using the Bitcoin testnet, expecially when testing logic related to new blocks.

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

RPC exposed on port 1999

- user: rpcuser
- pw: rpcpassword

ZMQ exposed on port 29000

## Troubleshooting

1. `docker build --pull --no-cache --tag bitcoin-simulated-network-image:latest .`
2. `./s/stop`

## Credit

Credit to Alexey Lunacharsky for [the foundation](https://github.com/alun/bitcoin-regtest) this project was built on
