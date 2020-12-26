const DEFAULT_OPTS = {branding: 'FileDrop by David J. Albers'}


const fs = require('fs')

var config = {}

exports.getMaintainerOrDefault = function() { 
    if ('maintainer' in config) { 
        return config.maintainer 
    } else { 
        return 'den Administrator dieser Seite' 
    }
}

try {
    config = JSON.parse(fs.readFileSync('config/options.json'))
} catch { // Probably a format error, or a file not found; use default config object
    config = DEFAULT_OPTS
}

exports.config = config