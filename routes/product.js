const { Router, db } = require('./login')

Router.get('/product/:cat', (req, res) => {
    const SelectQuery = "SELECT * FROM Product WHERE Category = ? "

    db.all(SelectQuery, [req.params.cat], (err, rows) => {
        if (err) console.log(err)

        if (rows !== undefined) {
            var isEmpty = rows.length === 0 ? true : false;


            res.render("product", { title: `${req.params.cat}`, user: req.session.user, rows: rows, isEmpty: isEmpty })
        }
    })

}
);
module.exports = Router