import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

// From a Promise implementation to an Async implementation for scrypt
const scryptAsync = promisify(scrypt)

export class Password {
    static async toHash(password: string) {
        // generate a random string
        const salt = randomBytes(8).toString('hex')
        // anytime you make a call to scrypt the return object is a Buffer
        // Typescript will not know that the return type is Buffer so we have to explictily call it out
        const buf = await (scryptAsync(password, salt, 64)) as Buffer

        // We need to then return out Buffer object and conver it to a String, and add our salt
        return `${buf.toString('hex')}.${salt}`

    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        // The stored password is a 'password + salt' combo. When we retrieve a password from the db, we need to parse the 2 pieces prior to comparing 
        // the password. 
        const [hashedPassword, salt] = storedPassword.split('.')
        const buf = await (scryptAsync(suppliedPassword, salt, 64)) as Buffer

        return buf.toString('hex') === hashedPassword
    }

}