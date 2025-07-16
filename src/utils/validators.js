import {isValidUsername, isValidEmail} from '6pp'

export const usernameVaidator = (username) => {
    if(!isValidUsername(username)){
        return { isValid: false, errorMessage: "Username is invalid"}
    }
}

export const emailVaidator = (email) => {
    if(!isValidEmail(email)){
        return { isValid: false, errorMessage: "email is invalid"}
    }
}