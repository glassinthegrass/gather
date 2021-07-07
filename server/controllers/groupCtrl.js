module.exports = {
  addGroup: async (req, res) => {
    const db = req.app.get("db");
    const { group_name, creator} = req.body;
    try {
      const [newGroup] = await db.groups.create_group(group_name, creator);
      await db.groups.create_group_users(newGroup.group_id,creator)
      return res.status(200).send(newGroup);
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  },
  getGroups: async(req,res)=>{
      const db = req.app.get("db");
      
  }
};
