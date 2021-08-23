module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.query;
    try {
      const posts = await db.posts.get_post_by_user_id(user_id);
      res.status(200).send(posts);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  getPostsByJoinedGroups: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.query;
    try {
      const posts = await db.posts.get_posts_by_joined_group(user_id);
      return res.status(200).send(posts);
    } catch (err) {
      console.log(err);
    }
  },

  editPost: async (req, res) => {
    const db = req.app.get("db");
    const { post_id } = req.params;
    const { post_content, post_url } = req.body;
    try {
      const edited = true;
      const [post] = await db.posts.edit_post(
        post_id,
        post_content,
        post_url,
        edited
      );

      return res.status(200).send(post);
    } catch (err) {
      console.log(err);
      return res.sendStatus(200);
    }
  },
  deletePost: async (req, res) => {
    const db = req.app.get("db");
    const { post_id } = req.params;
    try {
      const [toBeDeleted] = await db.posts.get_post_for_deletion(post_id);
      if (!toBeDeleted?.post_id) {
        return res.sendStatus(404);
      } else {
        const { post_content, post_url, user_id, person_id } = toBeDeleted;
        const [deletedPostEntry] = await db.posts.create_deleted_post_entry(
          post_content,
          post_url,
          user_id,
          person_id,
          post_id
        );
        if (deletedPostEntry) {
          await db.posts.delete_post(post_id);
          return res.status(200).send(deletedPostEntry);
        }
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(404);
    }
  },
  getPostsByPersonId: async (req, res) => {
    const db = req.app.get("db");
    const { person_id } = req.query;
    console.log(person_id)
    try {
      const posts = await db.posts.get_posts_by_person_id(person_id);
      return res.status(200).send(posts);
    } catch (err) {
      console.log(err);
    }
  },
};
