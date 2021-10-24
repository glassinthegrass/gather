const { format } = require("date-fns");
let date =format(new Date(), 'MM/dd/yyyy')

module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get("db");
    const { user_id,offset } = req.query;

    try {
      const posts = await db.posts.get_post_by_user_id(user_id,offset);
      res.status(200).send(posts);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  getPostsByJoinedGroups: async (req, res) => {
    const db = req.app.get("db");
    const { user_id,offset } = req.query;

    try {
      const posts = await db.posts.get_posts_by_joined_group(user_id,offset);
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

    try {
      const posts = await db.posts.get_posts_by_person_id(person_id);
      return res.status(200).send(posts);
    } catch (err) {
      console.log(err);
    }
  },
  getPostByPostId: async (req, res) => {
    const db = req.app.get("db");
    const { post_id } = req.params;
    try {
      const [post] = await db.posts.get_post_by_post_id(post_id);
      return res.status(200).send(post);
    } catch (err) {
      console.log(err);
    }
  },
  createPostComment: async (req, res) => {
    const db = req.app.get("db");
    const { post_id, user_id, content } = req.query;

    try {
      const [comment] = await db.posts.create_post_comment(
        content,
        "",
date
      );
      await db.posts.create_comment_post_user(
        comment.comment_id,
        post_id,
        user_id
        );
        const [newComment] = await db.posts.get_new_comment(comment.comment_id);

      return res.status(200).send(newComment);
    } catch (err) {
      console.log(err);
    }
  },
  getCommentsByPost: async (req, res) => {
    const db = req.app.get("db");
    const { post_id } = req.params;

    try {
      const comments = await db.posts.get_comments_by_post_id(post_id);
      return res.status(200).send(comments);
    } catch (err) {
      console.log(err);
    }
  },
};
