module.exports = {
    getIndex: (req, res) => {
        res.render('account.ejs', { user: req.user });
    }
}