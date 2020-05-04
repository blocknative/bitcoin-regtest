/*
 * Prepares & runs a network of Bitcoin regtest nodes.
 * Txns will be randomly created and propegated between nodes,
 * and a new block will be mined every 5s.
 */

const { execSync } = require('child_process')

const N_USERS = 3
const BLOCK_TIME = 5

async function main() {
  try {
    // If regtest nodes are already running stop them
    const dockerPsOut = execSync('docker ps -a').toString()
    if (dockerPsOut.includes('regtest')) {
      console.log('--- CLEANING UP FROM PREVIOUS RUN ---')
      execSync(`${__dirname}/s/stop`)
      console.log('Done')
    }

    // Build Docker image
    console.log('--- BUILDING DOCKER IMAGE ---')
    execSync(`${__dirname}/s/build`, { stdio: 'inherit' })
    console.log('Built')

    // Run Docker image
    console.log('--- STARTING NODES ---')
    execSync(`${__dirname}/s/run`)
    await new Promise(r => setTimeout(r, 10000))
    console.log('Running')

    // Fund fake user accounts
    console.log('--- FUNDING FAKE USERS ---')
    await fundUsers()
    console.log('Funded')

    // Start sending random transactions
    randomTransaction()

    // Start mining blocks
    mine()

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => setTimeout(r, 1000))
    }
  } catch (error) {
    console.error('Unexpected error starting nodes')
    console.error(error.toString())
  }
}

main()

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function fundUsers() {
  for (let i = 0; i <= N_USERS; i += 1) {
    // Mines a block for each user, giving them some btc
    const address = execSync(`${__dirname}/cli/user${i} -regtest getnewaddress`).toString()
    execSync(`${__dirname}/cli/user${i} -regtest generatetoaddress 101 ${address}`)
    console.log(`User ${i} funded`)
  }
}

async function randomTransaction() {
  // Wait between 0.05-1s
  await new Promise(r => setTimeout(r, randomNumber(50, 1000)))

  // Choose sender, receiver, amt to send
  const sender = randomInteger(0, N_USERS)
  const receiver = randomInteger(0, N_USERS)
  const amount = randomNumber(0.00001, 0.01).toFixed(5)

  // Generate receive addr
  const toAddress = execSync(`${__dirname}/cli/user${receiver} -regtest getnewaddress`).toString()

  // Send to receiver
  const txId = execSync(`${__dirname}/cli/user${sender} sendtoaddress "${toAddress}" ${amount}`)
    .toString()
    .replace(/(\r\n|\n|\r)/gm, '') // remove training newline

  console.log(`New pending tx ${txId}`)
  randomTransaction()
}

function mine() {
  const miner = randomInteger(0, N_USERS)
  const minerAddress = execSync(`${__dirname}/cli/user${miner} -regtest getnewaddress`).toString()
  execSync(`${__dirname}/cli/user${miner} -regtest generatetoaddress 1 ${minerAddress}`)
  setTimeout(mine, BLOCK_TIME * 1000)
}

function stopNodes() {
  console.log('\nShutting down regtest nodes..')
  try {
    execSync(`${__dirname}/s/stop`)
    process.exit(0)
  } catch (error) {
    console.log('error shutting down')
    console.log(error)
    process.exit(1)
  }
}

process.on('SIGTERM', stopNodes)
process.on('SIGINT', stopNodes)
process.on('SIGHUP', stopNodes)
