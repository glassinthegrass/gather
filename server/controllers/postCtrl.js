module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get("db");

    try {
      const posts = await db.posts.get_posts();
      res.status(200).send(posts);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  addPost: async (req, res) => {
    const db = req.app.get("db");
    const { post_content, post_url } = req.body;
    const { person_id, user_id } = req.params;
    try {
      const [post] = await db.posts.create_post(post_content, post_url);
      if (!post) {
        return res.sendStatus(404);
      } else {
        const [trackingTable] = await db.posts.create_person_user_post_entry(
          post.post_id,
          person_id,
          user_id
        );
        if (!trackingTable) {
          return res.sendStatus(404);
        } else {
          post.person_id = person_id;
          post.user_id = user_id;
          return res.status(200).send(post);
        }
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
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
      if (!toBeDeleted) {
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
};
