const fs = require('fs')

try {
    module.exports = JSON.parse(fs.readFileSync('config/options.json'))
} catch {
    module.exports = {branding: 'FileDrop by David J. Albers'}
}