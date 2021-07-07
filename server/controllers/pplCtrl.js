module.exports = {
  getPeople: async (req, res) => {
    const db = req.app.get("db");
    try {
      const people = await db.people.get_all_people();
      res.status(200).send(people);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  },
  personSearch: async (req, res) => {
    const db = req.app.get("db");
    const { inquery } = req.body;
    console.log(inquery);
    try {
      const results = await db.people.search_people(inquery);
      res.status(200).send(results);
    } catch (err) {
      console.log(err);
    }
    res.sendStatus(404);
  },
  createPerson: async (req, res) => {
    const db = req.app.get("db");
    const { first_name, last_name, birthday, picture, zipcode, message } =
      req.body;

    try {
      const [newPerson] = await db.people.create_person(
        first_name,
        last_name,
        birthday,
        picture,
        zipcode,
        message
      );
      return res.status(200).send(newPerson);
    } catch (err) {
      console.log(err);
      return res.sendStatus(404);
    }
  },
  updatePerson: async (req, res) => {
    const db = req.app.get("db");
    const { person_id } = req.params;
    const { first_name, last_name, birthday, picture, zipcode, message } =
      req.query;
    try {
      const person = await db.people.get_person(person_id);
      const updatedPerson = await db.people.edit_person(
        person_id,
        first_name,
        last_name,
        birthday,
        picture,
        zipcode,
        message
      );

      //http://localhost:3111/api/people/1?first_name=banana&last_name=candy&birthday=01-02-0304&picture=asdfasdf&zipcode=99336&message=wowwowowowwowowo
      return res.status(200).send([person, updatedPerson].flat());
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  },
  deletePerson: async (req, res) => {
    const db = req.app.get("db");
    const { person_id } = req.params;
    try {
      const [person] = await db.people.get_person(person_id);
      if (!person) {
        return res.status(404).send({ message: "user doesn't exist" });
      } else {
        await db.people.delete_person(person_id);
        return res
          .status(200)
          .send({ message: "Person Successfully Deleted!" });
      }
    } catch (err) {
      return res.status(404).send(err);
    }
  },
  getPerson: (req, res) => {
    const db = req.app.get("db");
    const { person_id } = req.params;

    db.people
      .get_person(person_id)
      .then((dbRes) => {
        res.status(200).send(dbRes);
      })
      .catch((err) => console.log(err));
  },
  getPeopleGrouped: async (req, res) => {
    const db = req.app.get("db");
    let { offset = 0 } = req.query;
    try {
      let currentPage = await db.person.get_limit_person(+offset);
      let [total] = await db.person.count_persons_table();
      let { count } = total;
      let totalPages = Math.ceil(parseInt(count) / 9);
      return res.status(200).send({ currentPage, totalPages });
    } catch (err) {
      return res.status(404).send("err" + err);
    }
  },
};
