const cloudinary = require("cloudinary").v2;

module.exports = {
  createGroup: async (req, res) => {
    const db = req.app.get("db");
    const { group_name, user_id } = req.body;
    try {
      const [newGroup] = await db.groups.create_group(group_name);
      await db.groups.create_group_users(newGroup.group_id, user_id, true);
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
    const {
      first_name,
      last_name,
      birthday,
      picture,
      zipcode,
      message,
      creator,
    } = req.body;
    try {
      const [newPerson] = await db.people.create_person(
        first_name,
        last_name,
        birthday,
        picture,
        zipcode,
        message,
        creator
      );
      if (!newPerson?.person_id) {
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
  deletePersonFromGroup: async (req, res) => {
    const db = req.app.get("db");
    const { person_id, group_id } = req.params;
    try {
      const [person] = await db.people.get_person(person_id);
      if (!person) {
        return res.status(409).send({ message: "person does not exist." });
      } else {
        await db.groups.delete_person_from_group(person_id, group_id);
        return res.status(200).send(person);
      }
    } catch (err) {
      return res.sendStatus(404);
    }
  },
  deleteGroup: async (req, res) => {
    const db = req.app.get("db");
    const { group_id } = req.params;
    try {
      await db.groups.delete_group(group_id);
      return res.status(200).send({ message: "group was deleted!" });
    } catch (err) {
      return res.sendStatus(404);
    }
  },
  createGroupPost: async (req, res) => {
    const db = req.app.get("db");
    const { group_id, user_id } = req.params;
    const { post_content } = req.query;
    if (req.files?.image) {
      try {
        const { path } = req.files.image;
        const [post] = await db.posts.create_post(post_content, null);

        if (post) {
          await db.posts.create_group_post_user(
            group_id,
            post.post_id,
            user_id
          );
        }
        const [newPost] = await db.posts.get_post_by_post_id(post.post_id);
        cloudinary.uploader.upload(
          path,
          {
            eager: {
              fetch_format: "auto",
              width: 300,
              height: 300,
              crop: "fill_pad",
              gravity: "auto",
              quality: "auto",
            },
            use_filename: true,
          },

          function (error, result) {
            if (result) {
              const { eager } = result;
              let { url } = eager[0];
              const picture_public_id = result.public_id;
              const picture_version = "v" + result.version;
              db.posts.update_post_url(
                post.post_id,
                url,
                picture_version,
                picture_public_id
              );
              newPost.post_picture_version = picture_version;
              newPost.post_picture_public_id = picture_public_id;
              return res.send(newPost);
            }
            if (error) {
              console.log(error);
              return res.status(404);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let [post] = await db.posts.create_post(post_content, null);
        await db.posts.create_group_post_user(group_id, post.post_id, user_id);
        const [newPost] = await db.posts.get_post_by_post_id(post.post_id);
        return res.status(200).send(newPost);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
