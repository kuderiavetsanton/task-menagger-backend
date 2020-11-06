const { gql } = require('apollo-server')

module.exports = gql`
        type Task{
            id:ID!,
            title:String!,
            description:String!,
            status:String!,
            userId:ID!
        }
        type User{
            id:ID!,
            email:String!,
            token:String
        }
        type  Query{
            login(email:String!,password:String!):User!
            getTasks:[Task]!
        },
        type Mutation{
            signUp(email:String!,password:String!,confirmPassword:String!):User!
            addTask(title:String!,description:String!):Task!
            removeTask(id:ID!,userId:ID!):Task!
            updateStatus(taskId:ID!,status:String!, userId:ID!):Task!
        }
`