$(function () {
    if (validator.trim($("#error").html()) !== "") {
        $("#error").addClass("alert alert-danger");
    }

    $("#login_form").submit(function () {
        $("#error").text("").hide(); // Empty the error message

        var errors = [];

        if (containsSpaces($("#user").val())) {
            errors.push("Username or email cannot contain spaces");
        }
        if (containsSpaces($("#password").val())) {
            errors.push("password cannot contain spaces");
        }

        if (errors.length > 0) {
            var errorString = "Error:";
            for (var i = 0; i < errors.length; i++) {
                errorString += "<br>" + errors[i];
            }
            $("#error").html(errorString).show(); // Set the error message
            $("#error").addClass("alert alert-danger"); // Update error message style
            return false;
        }
        else {
            return true;
        }
    });
});