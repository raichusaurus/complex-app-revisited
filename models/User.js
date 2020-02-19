const usersCollection = require('../db').collection('users')
const validator = require('validator')

let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function() {

    this.data.email = ensureElementIsString(this.data.email)
    this.data.username = ensureElementIsString(this.data.username)
    this.data.password = ensureElementIsString(this.data.password)

    // get rid of any bogus properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validate = function() {

    if (!validator.isEmail(this.data.email)) {
        this.errors.push("You must provide a valid email address.")
    }
    if (this.data.username == "") {
        this.errors.push("You must provide a username.")
    }
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
        this.errors.push("Username can only contains letters and numbers.")
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
        this.errors.push("Username must be at least 3 characters.")
    }
    if (this.data.username.length > 30) {
        this.errors.push("Password cannot exceed 30 characters.")
    }
    if (this.data.password == "") {
        this.errors.push("You must provide a username.")
    }
    if (this.data.password.length > 0 && this.data.password.length < 12) {
        this.errors.push("Password must be at least 12 characters.")
    }
    if (this.data.password.length > 100) {
        this.error.push("Password cannot exceed 100 characters.")
    }
}

User.prototype.register = function() {

    // 1. validate user data
    this.cleanUp()
    this.validate()

    // 2. only if there are no validation errors
    // then save the data into a database
    if (!this.errors.length) {
        usersCollection.insertOne(this.data)
    }
}

function ensureElementIsString(element) {
    if (typeof(element) != "string") {
        return ""
    }
    return element
}

module.exports = User