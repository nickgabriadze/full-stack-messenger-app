export const signUpChecker = (username: string, password: string, repeated: string):(string|boolean)=> {

    if(username.trim().length === 0 || password.trim().length === 0) {
        return "None of the fields should be empty";
    }

    if(password !== repeated){
        return "Passwords don't match";
    }

    let requirements = {
        oneNumber: false,
        oneUpper: false,
        oneSpecial: false,
        min8Char: false
    }

    if(/[0-9]/.test(password)){
       requirements = {...requirements, oneNumber: true}
    }else{
        return "Password should contain at least one digit";
    }

    if(/[A-Z]/.test(password)){
        requirements  = {...requirements, oneUpper: true}
    }else{
        return "Password should contain at least one upper case letter";
    }

    if(/[!@#$%^&*(),.?":{}|<>]/.test(password)){
        requirements = {...requirements, oneSpecial: true}
    }else{
        return "Password should contain at least one special letter";
    }


    if(/(?=.{8,})/.test(password)){
        requirements = {...requirements, min8Char: true}
    }else{
        return "Password should contain at least 8 characters";
    }
    

    if(requirements.min8Char && requirements.oneNumber && requirements.oneUpper && requirements.oneSpecial){
        return true;
    }


    return false;

};
export default signUpChecker;