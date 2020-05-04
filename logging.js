const log = {
  normal: msg => console.log(`${(new Date()).toISOString()}: ${msg}`),
  warn: msg => console.warn(`${(new Date()).toISOString()}: ${msg}`),
  error: msg => console.error(`${(new Date()).toISOString()}: ${msg}`),
}

module.exports = { log }
