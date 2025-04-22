"use server"

function isAlphaNumeric(x) {
    const regex = /^[a-zA-Z0-9]*$/
    return regex.test(x)
}

export const Register = async function(prevState, formData) {
    
    const errors = {}

    const user = {
        username: formData.get('username'),
        password: formData.get('password')
    }

    if(typeof user.username != 'string') user.username = ''
    if(typeof user.password != 'string') user.password = ''

    Object.entries(user).forEach(([key, value]) => {
        key.trim()
        value.trim()
    })

    // Username validation
    if(user.username.length < 8) errors.username = 'Username must be at least 8 characters long!'
    if(user.username.length > 30) errors.username = 'Username cannot exceed 30 characters!'

    if(!isAlphaNumeric(user.username)) errors.username = 'Username can only contain letters and numbers!'

    if(user.username == '') errors.username = 'You must provide a username!'

    //Password validation
    if(user.password.length < 8) errors.password = 'Password must be at least 12 characters long!'
    if(user.password.length > 30) errors.password = 'Password cannot exceed 30 characters!'

    if(!isAlphaNumeric(user.password)) errors.password = 'Password can only contain letters and numbers!'

    if(user.password == '') errors.password = 'You must provide a password!'

    if(errors.username || errors.password){
        return {
            errors: errors,
            status: false
        }
    }

    // store new user in DB
    

    // log user in with cookie

    return {
        success: true
    }
    }