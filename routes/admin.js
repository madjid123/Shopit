
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
    if (!req.session.admin || req.file === undefined) return;
    const { name, price, category, description } = req.body;
    const ext = path.extname(req.file.originalname);
    const NewPath = path.join(req.file.destination, category, req.file.filename) + ext
    var msg = ''
    fs.rename(req.file.path, NewPath, (err) => {
        if (err) console.log(err)
    })
    var InserQuery = 'INSERT INTO Product(NAME, PRICE , DESCRIPTION ,Category , ImgUrl) VALUES( ? , ? , ? , ?, ?) '
    const ImgUrl = `/${category}/${req.file.filename + ext}`
    db.run(InserQuery, [name, price, description, category, ImgUrl], (err, row) => {
        if (err) console.log(err)

    })

    res.redirect('admin')

})
//
Router.post('/delete-product/:id', (req, res) => {
    db.get("SELECT ImgUrl FROM Product WHERE id = ? ", [req.params.id], (err, row) => {
        fs.unlink(path.join(ShopItPath, '/templates/images/products/', row.ImgUrl), (err) => {
            console.log(err)
        })
    })
    db.run("DELETE FROM Product WHERE ID = ? ", [req.params.id], (err, row) => {
        if (err) console.log(err)

    })
    res.redirect('../admin')

})
Router.post('/update-product/:id', upload.single("img"), (req, res) => {
    if (req.file === undefined) return;
    console.log(req.params.id)
    db.get("SELECT ImgUrl FROM Product WHERE ID = ? ", [req.params.id], (err, row) => {
        if (err) console.log(err)
        fs.unlink(path.join(ShopItPath, '/templates/images/products/', row.ImgUrl), (err) => {
            if (err) console.log(err)

        })
    })

    const { name, price, category, description } = req.body;
    const ext = path.extname(req.file.originalname);
    const NewPath = path.join(req.file.destination, category, req.file.filename) + ext
    fs.rename(req.file.path, NewPath, (err) => {
        console.log(err)
    })
    UpdateQuery = "UPDATE Product SET  NAME = ? , PRICE = ? , DESCRIPTION = ? , Category = ? , ImgUrl = ? WHERE ID = ?  "
    const params = [name,
        price,
        description,
        category,
        `/${category}/${req.file.filename + ext}`,
        req.params.id
    ]
    db.run(UpdateQuery, params, (err) => {
        if (err) console.log(err)
    })
    res.redirect('/admin')

})

