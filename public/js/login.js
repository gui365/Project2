$(document).ready(function () {
  var loginForm = $("#signin-btn");
  var emailInput = $("#email");
  var passwordInput = $("#psw");

  loginForm.on("click", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  function loginUser(email, password) {
    $.post("/login", {
      email: email,
      password: password
    }).then(function (data) {
      // This data is html page (/dashboard)
      window.location.replace("/dashboard");
    }).catch(function (err) {
      console.log(err);
    });
  }

});