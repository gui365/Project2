$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("#signup-button");
  var usernameInput = $("#form-username");
  var emailInput = $("#form-email");
  var passwordInput = $("#form-password");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", function(event) {
    console.log("this works");
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.username, userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, email, password) {
    $.post("/signup", {
      username: username,
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace("/");
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
