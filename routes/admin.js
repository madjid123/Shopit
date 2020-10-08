const R = require('./Router')

const router = R.Router
const db = R.db

router.get("/admin", (req, res) => {
    if (req.session.admin !== undefined)
        res.render('admin', { admin: req.session.admin })
    else
        res.render('adminLogin')
})

router.get("/listproducts", (req, res) => {

    db.all("SELECT * FROM Product", (err, rows) => {
        if (!req.session.admin) return;
        if (err) console.log(err)
        console.log(rows.length)
        if (rows.length !== 0) {
            res.render("admin", { admin: req.session.admin, rows: rows })
        }
        else {
            console.log("Product Table is empty")
        }
    })

}
)