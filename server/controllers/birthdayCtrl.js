const { format } = require("date-fns");

module.exports = {
  getBirthday: async (req, res) => {
    const {user_id}=req.query

    const db = req.app.get("db");
    let date =format(new Date(), 'MM-dd')

    try {
      let birthdays = await db.birthdays.get_birthdays(date,user_id);
      console.log(birthdays)
      return res.status(200).send(birthdays);
    } catch (err) {
      console.log(err);
    }
  },
};
