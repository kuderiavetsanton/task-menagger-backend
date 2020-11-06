const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../util/secret')

module.exports = async (context) => {
    if(context.req.headers.authorization) {
        token = context.req.headers.authorization.split('Bearer ')[1]
        if(token){
            const user = jwt.verify(token,SECRET_KEY)
            context.user = user
        }
    }
    

    return context
}