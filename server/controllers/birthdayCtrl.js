module.exports = {
  getBirthday: async (req, res) => {
    const {user_id}=req.query
    const db = req.app.get("db");
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

const mmdd=mm+dd
    const mmddyyyy = String(`${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}-${String(today.getYear()+1900)}`);
    console.log(mmddyyyy);
    try {
      let birthdays = await db.birthdays.get_birthdays(mmdd,user_id);
      return res.status(200).send(birthdays);
    } catch (err) {
      console.log(err);
    }
  },
};
