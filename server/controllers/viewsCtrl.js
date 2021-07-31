module.exports = {
  getHomeView: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    try {
      const allAnnouncements =
        await db.announcements.get_group_announcements_by_user(user_id);
      const groupsByUser = await db.groups.get_groups_by_user(user_id);
      return res.status(200).send([allAnnouncements, groupsByUser]);
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  },
  getGroupView: async (req, res) => {
    const db = req.app.get("db");
    const { group_name } = req.params;
    try {
      const [group] = await db.groups.get_group_by_group_name(group_name);
      const people = await db.groups.get_people_grouped(group.group_id);
      const users = await db.groups.get_users_grouped(group.group_id);
      return res.status(200).send([group, people, users]);
    } catch (err) {
      console.log(err);
    }
  },
};
