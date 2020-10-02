
const login = require('./login')
login.get('/about', (req, res) => {
    res.render('about', { title: " About", user: req.session.user });
}
);
module.exports = login