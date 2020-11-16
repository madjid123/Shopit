// const R = require('./Router')

// const Router = R.Router
// const db = R.db
const { Router, db } = require('./Router')

Router.get("/admin", (req, res) => {
    if (req.session.admin !== undefined) {
        db.all("SELECT * FROM Product", (err, rows) => {
            if (!req.session.admin) return;
            if (err) console.log(err)
            let isEmpty = true;
            if (rows.length !== 0) {
                isEmpty = false;
            }

            res.render("admin", { admin: req.session.admin, rows: rows, isEmpty: isEmpty })
        })
    } else
        res.render('adminLogin')
})

