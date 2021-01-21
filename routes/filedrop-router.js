const express = require('express')
const fs = require('fs')

const version = require('../version')

const opt = require('../options')
try { 
    var filedrops = JSON.parse(fs.readFileSync('config/filedrops.json'))
} catch {
    var filedrops = []
}

var router = express.Router() 

router.get('/:filedrop', (req, res) => {
    for (filedrop of filedrops) {
        if (filedrop.name === req.params.filedrop) {
            if ('url' in filedrop){
                res.redirect(filedrop.url);
                return
            } else if ('date' in filedrop) {
                res.render('countdown', {...filedrop, ...opt.config, version: version})
                return
            } else if ('title' in filedrop) {
                res.render('collection', {...filedrop, ...opt.config, version: version})
                return
            } else {
                res.status(500).send(`Die angeforderte Ressource ist falsch spezifiziert. Bitte wenden Sie sich an ${opt.getMaintainerOrDefault()}.`)
            }
        }
    }
    res.status(404).send(`Die angeforderte Ressource "${req.params.filedrop}" konnte nicht gefunden werden. Wenn Sie glauben, dass es sich hierbei um einen Fehler handelt, wenden Sie sich an ${opt.getMaintainerOrDefault()}.`)
})

module.exports = router
