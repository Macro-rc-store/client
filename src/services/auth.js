const username_admin = "admin";
const password_admin = "admin";

export default {
  login: function(params) {
    const {username, password, responseRecaptcha} = params;

    if(responseRecaptcha.error) {
      throw new Error("reCaptcha has error. Please come back later!");
    }

    if(!responseRecaptcha.success) {
      throw new Error("You have not verified the recaptcha. Please verify!");
    }

    if((username === username_admin) && (password === password_admin))
      return username;
    else 
      throw new Error("Username or Password invalid!");
  }
}