const { Router, db } = require("./login")




Router.get('/search', (req, res) => {
    const pattern = req.body.key
    const SearhQuery = `SELECT * FROM Product WHERE NAME LIKE '%${pattern}%' `
    db.all(SearhQuery, [pattern], (err, rows) => {
        if (err) console.log(err)
        res.render('search-res', { title: `${pattern} result`, rows: rows })
    })
})