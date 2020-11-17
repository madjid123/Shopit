
const { Router, db } = require('./Router')
const multer = require('multer')
const { ShopItPath } = require('../Paths')
const path = require('path')
const fs = require('fs')
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

var upload = multer({
    dest: path.join(ShopItPath, '/templates/images/products')
})
Router.post('/add-product', upload.single("img"), (req, res) => {
    const { name, price, category, description } = req.body;
    const ext = path.extname(req.file.originalname);
    const NewPath = path.join(req.file.destination, category, req.file.filename) + ext
    var msg = ''
    fs.rename(req.file.path, NewPath, (err) => {
        if (err) console.log(err)
    })
    var InserQuery = 'INSERT INTO Product(NAME, PRICE , DESCRIPTION ,Category , ImgUrl) VALUES( ? , ? , ? , ?, ?) '

    db.run(InserQuery, [name, price, description, category, NewPath], (err, row) => {
        if (err) console.log(err)
        else msg = 'the product has been added succefully to the Data base.'
    })

    res.render("admin", { msg: msg })
})
