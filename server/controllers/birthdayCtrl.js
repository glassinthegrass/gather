module.exports={
    getBirthday: (req, res) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const mmdd = String(`${mm}-${dd}`);
    const db = req.app.get("db");
    db.get_birthday(mmdd)
      .then((dbRes) => {
        res.status(200).send(dbRes);
      })
      .catch((err) => console.log(err));
  },
}