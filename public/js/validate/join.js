function checkJoinFields(user, email, password) {
    var list = [];
    //Check if any of the fields contain spaces, they should not
    if (containsSpaces(user)) {
        list.push("Username cannot contain spaces");
    }
    if (containsSpaces(email)) {
        list.push("Email cannot contain spaces");
    }
    if (containsSpaces(password)) {
        list.push("Password cannot contain spaces");
    }

    if (!validator.isAlphanumeric(user)) {
        list.push("Username must only contain letters and/or numbers");
    }
    if (!validator.isEmail(email)) {
        list.push("Please enter a valid email address");
    }
    return list;
}

$(function () {
    $("#join_form").submit(function () {
        if (validator.trim($("#error").html()) !== "") {
            $("#error").addClass("alert alert-danger");
        }

        var errors = checkJoinFields($("#user").val(), $("#email").val(), $("#password").val());

        if (errors.length > 0) {
            var errorString = "Error:";
            for (var i = 0; i < errors.length; i++) {
                errorString += "<br>" + errors[i];
            }
            $("#error").html(errorString).show(); // Set the error message
            $("#error").addClass("alert alert-danger");
            return false;
        }
        else {
            var response = $.post(
                "http://localhost:5000/validate/join",
                {
                    user: $("#user").val(),
                    email: $("#email").val()
                }
            );
            var responseObject = JSON.parse(response);

            if (responseObject.ok && responseObject.errors.length === 0) {
                return true;
            }
            else {
                var errorString = "Error:";
                for (var e = 0; e < responseObject.errors.length; e++) {
                    errorString += "<br>" + responseObject.errors[e];
                }
                
                $("#error").html(errorString).show(); // Set the error message
                $("#error").addClass("alert alert-danger");
                return false; // return false to cancel form action
            }
        }
    });
});