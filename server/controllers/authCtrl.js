const bcrypt = require("bcryptjs");
let errorMessage = "Bzzzzt- Email is not registered";

module.exports = {
  //register controller function
  register: async (req, res) => {
    //gain access to db functions
    const db = req.app.get("db");
    const { first_name, last_name, email, password } = req.body;
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
      return res.status(500).send(errorMessage);
    }
  },
  registerAdmin: async (req, res) => {
    //gain access to db functions
    const db = req.app.get("db");
    const { first_name, last_name, email, password } = req.body;
    const admin =true
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

        const [registeredUser] = await db.auth.register_admin(
          first_name,
          last_name,
          email,
          hash,
          admin
        );
        return res.status(200).send(registeredUser);
      }
    } catch (err) {
      return res.status(500).send(errorMessage);
    }
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    try {
      const [existingUser] = await db.auth.get_user_by_email(email);
      if (!existingUser) {
        return res.status(403).send(errorMessage);
      } else {
        const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);
        if (!isAuthenticated) {
          errorMessage = "bad password";
          return res.status(403).send(errorMessage);
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
  updateEmail: async (req, res) => {
    const db = req.app.get("db");
    const { email, newEmail, password } = req.body;
    try {
      const [existingUser] = await db.auth.get_user_by_email(email);
      const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);
      if (!isAuthenticated) {
        errorMessage = "Bad Password";
        return res.status(409).send(errorMessage);
      } else {
        const [updatedUser] = await db.auth.update_email(email, newEmail);
        return res.status(200).send(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
  },
  updatePassword: async (req, res) => {
    const db = req.app.get("db");
    // const {user_id}=req.session.user
    const { email, password, newPassword } = req.body;
    if (password === newPassword) {
      return res
        .status(409)
        .send({
          message:
            "Old password and new password match. Please re-enter your new password.",
        });
    }
    try {
      const [existingUser] = await db.auth.get_user_by_email(email);
      console.log(existingUser)
      const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);

      if (!isAuthenticated) {
        return res.sendStatus(409);
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        const [updatedUser] = await db.auth.update_password(email, hash);
        return res.status(200).send(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
