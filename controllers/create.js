module.exports = {
    getIndex: (req, res) => {
        res.render('create.ejs', { user: req.user });
    }
}