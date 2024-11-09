import mongoose from 'mongoose'

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

// by adding our build() method to the userSchema statics attribute, we do not need to have a seperate function to manage.
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel> ('User', userSchema)

export { User }
