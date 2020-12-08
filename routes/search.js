const { Router, db } = require("./Router")




Router.post('/search', (req, res) => {
    const pattern = req.body.key
    console.log(pattern)
    const SearhQuery = `SELECT * FROM Product WHERE NAME LIKE '%${pattern}%' `
    db.all(SearhQuery, (err, rows) => {
        if (err) console.log(err)
        res.render('search-res', { title: `${pattern} result`, rows: rows })
    })
})