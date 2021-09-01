const cloudinary = require("cloudinary").v2;
const today = new Date();
const mmddyyyy = String(
  `${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}-${String(today.getYear() + 1900)}`
);
module.exports = {
  getPeople: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.query;
    try {
      const people = await db.people.get_all_people(user_id);
      res.status(200).send(people);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  },
  personSearch: async (req, res) => {
    const db = req.app.get("db");
    const { inquery } = req.query;

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
    const { path } = req.files.image;
    const { first_name, last_name, birthday, message, creator } = req.query;

    try {
      const [newPerson] = await db.people.create_person(
        first_name,
        last_name,
        birthday,
        message,
        creator,
        mmddyyyy
      );

      cloudinary.uploader.upload(
        path,
        {
          eager: {
            fetch_format: "auto",
            width: 150,
            height: 150,
            crop: "fill",
            gravity: "face",
            quality: "80",
          },
          use_filename: true,
        },
        function (error, result) {
          if (result) {
            console.log(result);
            const { eager } = result;
            const profile_picture_url = eager[0].url;
            const picture_public_id = result.public_id;
            const version = "v" + result.version;

            db.people.update_person_picture(
              newPerson.person_id,
              profile_picture_url,
              picture_public_id,
              version
            );
            newPerson.picture_public_id=picture_public_id
            newPerson.picture_version=version
            newPerson.profile_picture_url=profile_picture_url
            return res.status(200).send(newPerson);
          }
          if (error) {
            console.log(error);
            return res.status(404);
          }
        }
      );

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

      return res.status(200).send([person, updatedPerson].flat());
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  },
  deletePerson: async (req, res) => {
    const db = req.app.get("db");
    const { person_id, user_id } = req.query;
    console.log(person_id, user_id);
    try {
      const [person] = await db.people.get_person(person_id);
      if (!person) {
        return res.status(404).send({ message: "user doesn't exist" });
      } else {
        await db.people.delete_person(person_id);
        let people = await db.people.get_all_people(user_id);
        return res.status(200).send(people);
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
