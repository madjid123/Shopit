const Router = require('./login')

Router.get('/product', (req, res) => {
    res.render('product', { title: " product", user: req.session.user, product: 'exp' });
}
);
module.exports = Router