const usersCollection = require('../db').collection('users')
const validator = require('validator')


class User {

    constructor(data) {
        this.data = data
        this.errors = []
    }

    cleanUp() {
        
        this.data.email = this.ensureElementIsString(this.data.email)
        this.data.username = this.ensureElementIsString(this.data.username)
        this.data.password = this.ensureElementIsString(this.data.password)

        // get rid of any bogus properties
        this.data = {
            username: this.data.username.trim().toLowerCase(),
            email: this.data.email.trim().toLowerCase(),
            password: this.data.password
        }
    }

    validate() {
        this.validateEmail()
        this.validateUsername()
        this.validatePassword()
    }

    validateEmail() {
        if (!validator.isEmail(this.data.email)) {
            this.errors.push("You must provide a valid email address.")
        }
    }

    validateUsername() {
        if (this.data.username == "") {
            this.errors.push("You must provide a username.")
        }
        if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
            this.errors.push("Username can only contains letters and numbers.")
        }
        this.validateLength(this.data.password, 3, 30, "Username")
    }

    validatePassword() {
        if (this.data.password == "") {
            this.errors.push("You must provide a username.")
        }
        this.validateLength(this.data.password, 12, 100, "Password")
    }

    register() {

        // 1. validate user data
        this.cleanUp()
        this.validate()

        // 2. only if there are no validation errors
        // then save the data into a database
        if (!this.errors.length) {
            usersCollection.insertOne(this.data)
        }
    }

    ensureElementIsString(element) {
        if (typeof (element) != "string") {
            return ""
        }
        return element
    }

    validateLength(value, minLength, maxLength, ) {
        if (value.length > 0 && value.length < minLength) {
            this.errors.push(`${} must be at least ${minLength} characters.`)
        }
        if (value.length > maxLength) {
            this.errors.push(`${} cannot exceed ${maxLength} characters.`)
        }
    }
}

module.exports = User