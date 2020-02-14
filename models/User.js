const validator = require('validator')

let User = function(data) {
    this.data = data
    this.errors = []
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
    this.validate()

    // 2. only if there are no validation errors
    // then save the data into a database
}

module.exports = User