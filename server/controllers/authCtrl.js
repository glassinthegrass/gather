const bcrypt = require("bcryptjs");

module.exports = {
  //register controller function
  register: async (req, res) => {
    //gain access to db functions
    const db = req.app.get("db");
    const { first_name, last_name, username, email, password } = req.body;

    if (password.length < 6) {
      return res.status(411).send("Password be at least 6 characters");
    }
    const today = new Date();
    const mmddyyyy = String(
      `${String(today.getMonth() + 1).padStart(2, "0")}-${String(
        today.getDate()
      ).padStart(2, "0")}-${String(today.getYear() + 1900)}`
    );
    //check if email used
    try {
      //checking email status
      const [existingUser] = await db.auth.get_user_by_email(email, username);

      //if an object is returned, send an error
      if (existingUser) {
        return res.status(409).send("Email or username is already registered");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const [registeredUser] = await db.auth.register_user(
          first_name,
          last_name,
          email,
          username,
          hash,
          mmddyyyy
        );

        await db.groups.create_group_users(1, registeredUser.user_id, false);
        delete registeredUser.hash;
        req.session.user = registeredUser;
        req.session.user.isLoggedIn=true
        registeredUser.isRegistered = true;
        return res.status(200).send(registeredUser);
      }
    } catch (err) {
      return res.status(500).send("Bzzzt- something went wrong.");
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
      return res.status(500).send("Bzzzt- Something went wrong. Try again.");
    }
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    try {
      const [existingUser] = await db.auth.get_user_by_email(email, email);
      if (!existingUser) {
        return res.status(403).send("Email is not registered");
      }
      const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);
      if (!isAuthenticated) {
        return res.status(403).send("Password is incorrect");
      } else {
        delete existingUser.hash;
        existingUser.isLoggedIn = true;
        req.session.user = existingUser;
        return res.status(200).send(req.session.user);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Bzzzt- Something went wrong. Try again.");
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
    const { email, newEmail, password } = req.query;
    try {
      const [existingUser] = await db.auth.get_user_by_email(email, "");
      console.log(existingUser);
      const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);
      if (!isAuthenticated) {
        return res.status(409).send("Password is incorrect");
      } else {
        const [updatedUser] = await db.auth.update_email(email, newEmail);
        delete updatedUser.hash;
        req.session.user = updatedUser;
        return res.status(200).send(req.session.user);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Bzzzt- Something went wrong. Try again.");
    }
  },
  updatePassword: async (req, res) => {
    const db = req.app.get("db");
    // const {user_id}=req.session.user
    const { email, password, newPassword } = req.body;
    if (password === newPassword) {
      return res
        .status(409)
        .send("New password cannot match old password- try again.");
    }
    try {
      const [existingUser] = await db.auth.get_user_by_email(email);
      const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);

      if (!isAuthenticated) {
        return res
          .status(409)
          .send("current password is incorrect- cannot update password");
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
        return res.status(500).send("You are not registered.");
      }
      existingUser.isLoggedIn = true;
      delete existingUser.hash;
      return res.status(200).send(existingUser);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Bzzt- something went wrong.");
    }
  },
  updateUser: async (req, res) => {
    const db = req.app.get("db");
    const { newInfo } = req.body;
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
      return res.status(404).send("Bzzt- something went wrong.");
    }
  },
  createSession: (req, res) => {
    const { remember } = req.body;
    req.session.user = remember;
    return res.status(200).send(req.session.user);
  },
};
