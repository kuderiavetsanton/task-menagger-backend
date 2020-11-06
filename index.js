const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

let { isEmail } = require('validator')

const typeDefs = require('./graphql/typeDefs')

const resolvers = require('./graphql/resolvers')
const isAuth = require('./middleware/isAuth')

const PORT = process.env.PORT || 4000

mongoose.connect(require('./util/db'), { useNewUrlParser: true,useUnifiedTopology: true }).catch(err => console.log(err))


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (context) => {
        return isAuth(context)
    }
})

server.listen(PORT).then(({url}) => {
    console.log(url)
})