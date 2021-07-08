module.exports = {
  addGroup: async (req, res) => {
    const db = req.app.get("db");
    const { group_name, creator } = req.body;
    try {
      const [newGroup] = await db.groups.create_group(group_name, creator);
      await db.groups.create_group_users(newGroup.group_id, creator);
      return res.status(200).send(newGroup);
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  },
  getGroupsByUser: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    try {
      const groups = await db.groups.get_groups_by_user(user_id);
      return res.status(200).send(groups);
    } catch (err) {
      return res.sendStatus(404);
    }
  },
  searchGroups: async (req, res) => {
    const db = req.app.get("db");
    const { searchQuery } = req.query;
    try {
      const searchResults = await db.groups.search_groups(searchQuery);
      if (!searchResults) {
        return res
          .status(404)
          .send({ message: "Nothing matches your search request" });
      } else {
        return res.status(200).send(searchResults);
      }
    } catch (err) {
      console.log(err);
    }
  },
  addPersonToGroup: async (req, res) => {
    const db = req.app.get("db");
    const { group_id } = req.params;
    const { first_name, last_name, birthday, picture, zipcode, message } = req.body;
    try {
      const [newPerson] = await db.people.create_person(
        first_name,
        last_name,
        birthday,
        picture,
        zipcode,
        message
      );
      if (!newPerson) {
        return res.sendStatus(409);
      } else {
        await db.groups.create_groups_people(group_id, newPerson.person_id);
        newPerson.group_id = group_id;
        return res.status(200).send(newPerson);
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(err);
    }
  },
  deletePersonFromGroup:async (req,res) =>{
    const db = req.app.get("db");
    const {person_id,group_id}=req.params;
    try{
      const [person]=await db.people.get_person(person_id);
      if(!person){
        return res.status(409).send({"message":"person does not exist."})
      }else{
        await db.groups.delete_person_from_group(person_id,group_id);
        return res.status(200).send(person);
      }
    }
    catch(err){
      return res.sendStatus(404)
    }
  },
  deleteGroup:async (req,res)=>{
      const db = req.app.get("db");
      const {group_id}=req.params;
      try{
        await db.groups.delete_group(group_id)
        return res.status(200).send({"message":"group was deleted!"}); 
      }
      catch(err){
        return res.sendStatus(404)
      }
  }
};
