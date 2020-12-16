const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {
        title: "Startseite",
        pageBranding: "FileDrop by David J. Albers"
    })
})

app.get('/test', (req, res) => {
    res.render('collection', {
        title: "Testsammlung",
        meta: [
            "Referat",
            "<Kurs>",
            "<Schule>",
            "David Albers"
        ],
        files: [
            {
                name: "Vortragsfolien",
                path: "/path/to/file.pdf"
            },
            {
                name: "Handout",
                path: "/path/to/file.pdf"
            },
            {
                name: "Quellennachweise",
                path: "/path/to/file.pdf"
            }
        ],
        pageBranding: "FileDrop by David J. Albers"
    })
})

app.listen(80, () => {
    console.log('Listening on http://locahost:80')
})
