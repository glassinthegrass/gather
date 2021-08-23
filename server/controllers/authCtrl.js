const bcrypt = require("bcryptjs");

let errorMessage = "Bzzzzt- Email is not registered";

module.exports = {
  //register controller function
  register: async (req, res) => {
    //gain access to db functions
    const db = req.app.get("db");
    const { first_name, last_name, username, email, password } = req.body;
    //check if email used
    try {
      //checking email status
      const [existingUser] = await db.auth.get_user_by_email(email, username);

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
          username,
          hash
        );

        await db.groups.create_group_users(1, registeredUser.user_id, false);
        delete registeredUser.hash;
        registeredUser.isRegistered = true;
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
    const admin = true;
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
      const [existingUser] = await db.auth.get_user_by_email(email, email);
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
    let user = {};
    if (req.session.user) {
      req.session.destroy();
      return res.status(200).send(user);
    } else {
      return res.status(200).send(user);
    }
  },
  updateEmail: async (req, res) => {
    const db = req.app.get("db");
    const { email,newEmail,password } = req.query;
    try {
      const [existingUser] = await db.auth.get_user_by_email(email,'');
      console.log(existingUser)
      const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);
      if (!isAuthenticated) {
        errorMessage = "Bad Password";
        return res.status(409).send(errorMessage);
      } else {
        const [updatedUser] = await db.auth.update_email(email, newEmail);
        delete updatedUser.hash
        req.session.user= updatedUser
        return res.status(200).send(req.session.user);
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
      return res.status(409).send({
        message:
          "Old password and new password match. Please re-enter your new password.",
      });
    }
    try {
      const [existingUser] = await db.auth.get_user_by_email(email);
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
  getUser: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    try {
      const [existingUser] = await db.auth.get_user_by_user_id(user_id);
      if (!existingUser) {
        return res.send("you are not registered");
      }


      existingUser.isLoggedIn = true;
      delete existingUser.hash;
      return res.status(200).send(existingUser);
    } catch (err) {
      console.log(err);
      return res.send(404);
    }
  },
  updateUser: async (req, res) => {
    const db = req.app.get("db");
    const { newInfo } = req.body;
    console.log(newInfo);
    try {
      await db.auth.update_user(
        newInfo.first_name,
        newInfo.last_name,
        newInfo.birthday,
        newInfo.user_id
      );
      const [user] = await db.auth.get_user_by_user_id(newInfo.user_id);
      return res.status(200).send(user);
    } catch (err) {
      console.log(err);
    }
  },
};
