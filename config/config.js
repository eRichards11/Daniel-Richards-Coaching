module.exports = {
    mongoDbUrl: `mongodb+srv://test1:testing123@atlascluster.vqftcve.mongodb.net/userDR?retryWrites=true&w=majority`,
    PORT: process.env.PORT || 3000,
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message')
        res.locals.error_message = req.flash('error-message')
        res.locals.user = req.user || null
        next()
    }
}