const bcrypt = require("bcryptjs");
let errorMessage = "Bzzzzt- Email is not registered";

module.exports = {
  //register controller function
  register: async (req, res) => {
    //gain access to db functions
    const db = req.app.get("db");
    const { first_name,last_name, email,password } = req.body;
    //check if email used
    try {
      //checking email status
      const [existingUser] = await db.auth.get_user_by_email(email);

      //if an object is returned, send an error
      if (existingUser) {
       return res.status(409).send("User already Exists");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const [registeredUser] = await db.auth.register_user(
          first_name,
          last_name,
          email,
          hash
        );
       return res.status(200).send(registeredUser);
      }
    } catch (err) {
      console.log(err);
return res.status(500).send(errorMessage);
    }
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { user } = req.body;

    try {
      const [existingUser] = await db.auth.get_user_by_email(user.email);
      if (!existingUser) {
        return res.status(403).send(errorMessage);
      } else {
        const { hash } = existingUser;
        const isAuthenticated = bcrypt.compareSync(user.password, hash);
        if (!isAuthenticated) {
          errorMessage = "bad password";
          res.status(403).send(errorMessage);
        } else {
          delete existingUser.hash;
          existingUser.isLoggedIn = true;
          req.session.user = existingUser;
          return res.status(200).send(req.session.user);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(errorMessage);
    }
  },
  logout: (req, res) => {
    if (req.session.user) {
      req.session.destroy();
      const logoutMsg = "you have successfully logged out!";
      return res.status(200).send(logoutMsg);
    } else {
      const logoutMsg = "you are not logged in, so you can't log out";
      return res.status(409).send(logoutMsg);
    }
  },
updateEmail: (req,res)=>{
    const db = req.app.get("db");    
    const {email,password}=req.body;
    const [existingUser]=db.auth.get_user_by_email(email);
    const {hash}= existingUser
    const isAuthenticated = bcrypt.compareSync(password,hash)
    if(!isAuthenticated){
        errorMessage= 'Bad Password'
        return res.status(409).send(errorMessage);
    }else{
        const [updatedEmail]= db.auth.update_email(email);
        return res.status(200).send(updatedEmail)
    }
},
};
