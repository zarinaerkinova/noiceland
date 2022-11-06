module.exports.auth = (req, res, next) => {
    const login = req.session.login

    if(!login) {
        return res.redirect('/login')
    }

    const admin = req.session.admin
    res.locals.admin = admin

    next()
}