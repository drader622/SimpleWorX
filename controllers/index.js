module.exports = {
    getIndex: (req, res) => {
        if (req.user) {
            res.render('index.ejs', { user: req.user });
        } else {
            res.render('login.ejs', {user: req.user})
        }
    }
}