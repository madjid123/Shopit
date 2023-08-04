const { Router } = require('./login')
Router.get('/explore', (req, res) => {
    if(req.session.user === undefined){
        return res.redirect("/log-in")
    }
    res.render('explore', { title: " Explore", user: req.session.user, explore: 'exp' });
}
);
module.exports = Router