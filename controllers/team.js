module.exports = {
    getIndex: (req, res) => {
        res.render('team.ejs', { user: req.user });
    }
}