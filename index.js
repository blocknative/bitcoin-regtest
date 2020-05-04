/*
 * Prepares & runs a network of Bitcoin regtest nodes.
 * Txns will be randomly created and propegated between nodes,
 * and a new block will be mined every 5s.
 */

const { execSync } = require('child_process')

async function main() {
  try {
    // If regtest nodes are already running stop them
    const dockerPsOut = execSync('docker ps -a').toString()
    if (dockerPsOut.includes('regtest')) {
      console.log('--- STOPPING EXISTING REGTEST NODES ---')
      execSync(`${__dirname}/s/stop`)
      console.log('Stopped')
    }

    // Build Docker image
    console.log('--- BUILDING DOCKER IMAGE ---')
    execSync(`${__dirname}/s/build`, { stdio: 'inherit' })

    // Run Docker image
    console.log('--- STARTING NODES ---')
    execSync(`${__dirname}/s/run`)
    console.log('Nodes running!')

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => setTimeout(r, 1000))
    }
  } catch (error) {
    console.error('Unexpected error starting nodes')
    console.error(error)
  }
}

main()

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
