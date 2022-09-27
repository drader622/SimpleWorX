module.exports = {
    getIndex: async (req, res) => {
        res.render('woInfo', { user: req.user });
    }
}