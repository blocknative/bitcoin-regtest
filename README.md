# Bitcoin regtest

## Description

Testing Bitcoin is difficult because block times are slow, and there are not many testnet transactions.

Bitcoin regtest allows spinning up a Dockerized Bitcoin private network consisting of many connected nodes. The nodes have funded wallets, and periodically send Bitcoin between eachother and mine a block every 5 seconds.

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

RPC exposed on port 2000

- user: rpcuser
- pw: rpcpassword

ZMQ exposed on port 29000

## Troubleshooting

Rebuild the Docker image: `docker build --pull --no-cache --tag regtest-image:latest .`

## Credit

Thank you Alexey Lunacharsky for the initial implementation (https://github.com/alun/bitcoin-regtest)

(c) 2015-2016 Alexey Lunacharsky

Forked and modified for internal use by Blocknative
