const express = require('express')
const fs = require('fs')

const version = require('../version')

const options = require('../options')
try { 
    var filedrops = JSON.parse(fs.readFileSync('config/filedrops.json'))
} catch {
    var filedrops = []
}

var router = express.Router() 

router.get('/:filedrop', (req, res) => {
    for (filedrop of filedrops) {
        if (filedrop.name === req.params.filedrop) {
            if (filedrop.type === 'direct_url'){
                res.redirect(filedrop.url);
                return
            } else if (filedrop.type === 'urls') {
                res.render('redirect_page', {...filedrop, pageBranding: options, version: version})
                return
            } else if (filedrop.type === 'files') {
                res.render('collection', {...filedrop, pageBranding: options.branding, version: version})
                return
            }
        }
    }
    res.status(404).send(`Die angeforderte Ressource "${req.params.filedrop}" konnte nicht gefunden werden.`)
})

module.exports = router
