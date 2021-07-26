module.exports = {
  getAnnouncement: async (req, res) => {
    const db = req.app.get("db");
    const { announcement_id } = req.params;
    try {
      const [announcement] = await db.announcements.get_announcement(
        announcement_id
      );

      if (announcement) {
        const paragraphs = await db.announcements.get_announcement_paragraphs(
          announcement_id
        );
        return res.status(200).send([announcement, paragraphs]);
      } else {
        return res.status(404).send("announcement hasnt been published yet!");
      }
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  },
  createAnnouncement: async (req, res) => {
    const db = req.app.get("db");
    const { title, group_id, user_id } = req.body;
    try {
      const [announcement] = await db.announcements.create_group_announcement(
        title
      );
      await db.announcements.create_group_announce_user(
        announcement.announcement_id,
        group_id,
        user_id
      );

      return res.status(200).send(announcement);
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  },
  createAnnouncementParagraph: async (req, res) => {
    const db = req.app.get("db");
    const { announcement_id } = req.params;
    const { paragraph_content } = req.body;
    try {
      const [announcementParagraph] =
        await db.announcements.create_announcement_paragraph(
          announcement_id,
          paragraph_content
        );
      return res.status(200).send(announcementParagraph);
    } catch (err) {
      console.log(err);
      return res.status(404).send(err);
    }
  },
  deleteAnnouncement: async (req, res) => {
    const db = req.app.get("db");
    const { announcement_id } = req.query;
    try {
      const [announcement] = await db.announcements.get_announcement(
        announcement_id
      );
      await db.announcements.delete_group_announcement(announcement_id);
      return res.status(200).send(announcement);
    } catch (err) {
      return res.status(404).send(err);
    }
  },
};
