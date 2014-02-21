function validateJoin(username, email, password) {
    return validateUsername(username, "join") && validateEmail(email, "join") && validatePassword(password, "join");
}

function validateLogin(usernameOrEmail, password) {
    return (validateUsername(usernameOrEmail, "login") || validateEmail(usernameOrEmail, "login")) && validatePassword(password, "login");
}

function validateEmail(email, context) {
    var message = {
        join: "Please enter a valid email address",
        login: "That email doesn't look quite right"
    };
    if (validator.isEmail(email) && !containsSpace(email)) {
        return true;
    }
    else {
        alert(message[context]);
        return false;
    }
}

function validateUsername(username, context) {
    var message = {
        join: "Please enter a username with at least 4 characters",
        login: "That username doesn't look quite right"
    };
    if (username.length >= 4 && !containsSpace(username)) {
        return true;
    }
    else {
        alert(message[context]);
        return false;
    }
}

function validatePassword(password, context) {
    var message = {
        join: "Please enter a password with at least 6 characters",
        login: "That password doesn't look quite right"
    };
    if (password.length >= 6 && !containsSpace(password)) {
        return true;
    }
    else {
        alert(message[context]);
        return false;
    }
}

function containsSpace(value) {
    return value.indexOf(" ") !== -1;
}