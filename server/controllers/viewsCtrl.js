module.exports = {
  getHomeView: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    try {
      const groupsByUser = await db.groups.get_groups_by_user(user_id);
      return res.status(200).send(groupsByUser);
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
      users.forEach((user) => {
        delete user.hash;
      });

      const posts = await db.posts.get_posts_by_group(group.group_name, "0");
      return res.status(200).send([group, people, users, posts]);
    } catch (err) {
      console.log(err);
    }
  },
  getGroupPosts: async (req, res) => {
    const db = req.app.get("db");
    const { offset, group_name } = req.query;
    try {
      const posts = await db.posts.get_posts_by_group(group_name, offset);
      return res.status(200).send(posts);
    } catch (err) {
      console.log(err);
    }
  },
};
