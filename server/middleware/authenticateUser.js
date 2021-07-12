module.exports = {
    // isAdmin: (req, res, next) => {
    //   if (!req.session.user.admin) {
    //     res.status(403).send("Cool your jets, Jimmy!");
    //   } else {
    //     next();
    //   }
    // },
    isLoggedIn: (req, res, next) => {
      if (!req.session.user.isLoggedIn) {
        return res.status(403).send({"message":"you are not not logged in"});
      } else {
        next();
      }
    },
  };
  