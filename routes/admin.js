
const { Router, db } = require('./Router')
const multer = require('multer')
const { ShopItPath } = require('../Paths')

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


const upload = multer({
    dest: ShopItPath
})
Router.post('/add-product', upload.single("img"), (req, res) => {
    const { name, price, category, descreption

    } = req.body;

    console.log(req.file)

    res.render("admin")
})
