import mongoose from 'mongoose'
import { Password } from '../services/password'

// An interface that describes the attributes that are required to create a new User
interface UserAttrs {
    email: string, 
    password: string
}

// an interface that describes the attributes and methods the User Model (aka User collection has) 
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): UserDoc
}

// an interface that describes the attributes and methods of a User Document (aka Single User record)
interface UserDoc extends mongoose.Document {
    email: string, 
    password: string
}

const userSchema =  new mongoose.Schema({
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
})

// new method to ensure our password gets hashed in our User model
// This uses a function coming from mongoose called `pre` where we can indicate a middleware action
// have to use the function keyword vs. an arrow function b/c we will reference 'this' ... using the funciton keyword this's context is different 
// then if it were an arrow function
userSchema.pre('save', async function(done) {
    // we only want to rehash a password if it has been modified
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

// by adding our build() method to the userSchema statics attribute, we do not need to have a seperate function to manage.
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel> ('User', userSchema)

export { User }
