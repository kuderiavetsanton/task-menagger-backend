const tasksResolvers = require('./tasksResolvers')
const usersResolvers = require('./usersResolvers')
module.exports = {
    Query:{
        ...usersResolvers.Query,
        ...tasksResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...tasksResolvers.Mutation
    }
}