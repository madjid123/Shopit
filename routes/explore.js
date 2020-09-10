const Router = require('./login')
Router.get('/explore', (req, res) => {
    res.render('../templates/views/explore', { title: " Explore", user: req.session.user, explore: 'exp' });
}
);
module.exports = Router