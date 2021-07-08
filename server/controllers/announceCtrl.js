module.exports = {
  createAnnouncement: async (req, res) => {
    const db = req.app.get("db");
    const { title, announcement_picture, announcement_url, group_id } =
      req.body;
    try {
      const [announcement] = await db.announcements.create_group_announcement(
        title,
        announcement_picture,
        announcement_url,
        group_id
      );
      return res.status(200).send(announcement);
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  },
};
