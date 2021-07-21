module.exports={
    getHomeView: async (req, res) => {
        const db = req.app.get("db");
        const { user_id } = req.params;
        try {
          const allAnnouncements =
            await db.announcements.get_group_announcements_by_user(user_id);
          const groupsByUser = await db.groups.get_groups_by_user(user_id);
          const friendships = await db.friends.get_friendships_by_user(user_id);
          return res.status(200).send([allAnnouncements,groupsByUser,friendships]);
        } catch (err) {
          console.log(err);
          return res.status(404).send(err);
        }
      },
}