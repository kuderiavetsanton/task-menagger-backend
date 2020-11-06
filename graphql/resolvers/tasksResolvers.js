const { UserInputError, AuthenticationError } = require('apollo-server')
const { findById } = require('../../models/task')
const Task = require('../../models/task')

module.exports = {
    Query:{
        async getTasks(_,__, {user}){
            if(!user){
                throw new AuthenticationError('You are not log in')
            }else{
                const tasks = await Task.find({ userId:user.id })
                return tasks
            }
        }
    },
    Mutation:{
        async addTask(_,{ title, description }, { user }){
            if(!user){
                throw new AuthenticationError('You are not log in')
            }else{
                if(title.trim() === ''){
                    throw new UserInputError('Title can`t be empty')
                }else if(description.trim() === ''){
                    throw new UserInputError('Description can`t be empty')
                }

                const task = await Task.create({
                    title,
                    description,
                    userId:user.id
                })
                return task
            }
        },
        async removeTask(_,{ id, userId }, { user }){
            if(!user){
                throw new AuthenticationError('You are not log in')
            }else{
                if(user.id === userId){
                    const removedTask = await Task.findByIdAndRemove(id)
                    console.log(removedTask)
                    return await removedTask
                }else{
                    throw new AuthenticationError('You are not lallowed to do it')
                }
            }
        },
        async updateStatus(_,{ taskId, status, userId }, { user }){
            if(!user){
                throw new AuthenticationError('You are not log in')
            }else{
                if(user.id === userId){
                    const task = await Task.findById(taskId)
                    if(task.status === 'open'){
                        task.status = status
                    }else if(task.status === 'pending' && status === 'open'){
                        throw new UserInputError('Can`t cahnge status pending to open')
                    }
                    else if(task.status === 'pending' && status === 'closed'){
                        task.status = status
                    }
                    return await task.save()
                }else{
                    throw new AuthenticationError('You are not lallowed to do it')
                }
            }
        }
    }
}