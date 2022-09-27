module.exports = {
    getIndex: async (req, res) => {
        res.render('create.ejs', { user: req.user });
    }
}