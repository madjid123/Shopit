
const { Router } = require('./login')
Router.get('/about', (req, res) => {
    res.render('about', { title: " About", user: req.session.user });
}
);
module.exports = Router