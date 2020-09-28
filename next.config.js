/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

module.exports = {
  webpack: (config) => {
    if (
      fs.existsSync('./plugins/index.ts') ||
      fs.existsSync('./plugins/index.tsx') ||
      fs.existsSync('./plugins/index.js') ||
      fs.existsSync('./plugins.ts') ||
      fs.existsSync('./plugins.tsx') ||
      fs.existsSync('./plugins.js')
    ) {
      config.resolve.alias['@plugins'] = path.resolve('./plugins')
    } else {
      config.resolve.alias['@plugins'] = path.resolve('./src/plugins')
    }

    return config
  }
}
