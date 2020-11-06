const User = require('../../models/user')
const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../../util/secret')

module.exports = {
    Query:{
        async login(_,{ email, password }){
            let errors = {}
            if(email.trim() === ''){
                errors.email = 'Email can`t be empty'
            }
            if(password.trim() === ''){
                errors.password = 'Password can`t be empty'
            }
            try {
                if(Object.keys(errors).length > 0){
                    throw new UserInputError('Wrong credentials provided',{error:`Wrong email or password`})
                }
                const user = await User.findOne({email})

                if(!user){
                    throw new UserInputError('Wrong credentials provided',{error:`Wrong email or password`})
                }
                const match = await bcrypt.compare( password, user.password )

                if(!match){
                    throw new UserInputError('Wrong credentials provided',{error:`Wrong email or password`})
                }

                const token = jwt.sign({ email,id:user.id }, SECRET_KEY,{ expiresIn: '1h' })

                return { ...user._doc, id: user._id, token } 
            } catch (error) {
                throw error
            }
        }
    },
    Mutation:{
        async signUp(_,{ email, password, confirmPassword }){
            let errors = {}
            if(email.trim() === ''){
                errors.email = 'Email can`t be empty'
            }
            if(password.trim() === ''){
                errors.password = 'Password can`t be empty'
            }
            if(confirmPassword !== password){
                errors.confirmPassword = 'Passwords must match'
            }
            try {
                if(Object.keys(errors).length > 0){
                    throw new UserInputError('Wrong credentials provided',{ errors })
                }
                const user = await User.create({email, password})
                return user
            } catch (error) {
                if(error.message.includes('User validation failed:')){
                    for(e in error.errors){
                        error.errors[e] = error.errors[e].message
                    }
                }
                
                if(error.code === 11000){
                    throw new UserInputError('Wrong credentials provided', { errors: { email:'Email must be unique' }})
                }
                throw error
            }
            
        }
    }
}