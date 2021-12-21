const cloudinary = require("cloudinary").v2;
const { format } = require("date-fns");
let date = format(new Date(), "MM/dd/yyyy");

module.exports = {
  createGroup: async (req, res) => {
    const db = req.app.get("db");
    const { group_name, user_id, subject } = req.query;

    if (req.files?.image) {
      const { path } = req.files.image;

      try {
        const [newGroup] = await db.groups.create_group(
          group_name,
          subject,
          date
        );
        await db.groups.create_group_users(newGroup.group_id, user_id, true);

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
              db.groups.update_group_url(
                newGroup.group_id,
                url,
                picture_version,
                picture_public_id
              );
              newGroup.picture_url = url;
              newGroup.picture_version = picture_version;
              newGroup.picture_public_id = picture_public_id;
              return res.status(200).send(newGroup);
            }
            if (error) {
              console.log(error);
              return res.status(404);
            }
          }
        );
      } catch (err) {
        console.log(err);
        return res.status(404).send(err);
      }
    }
  },
  getAllGroups: async (req, res) => {
    const db = req.app.get("db");
    const { filter, user_id } = req.query;

    try {
      if (filter === "all") {
        const allGroups = await db.groups.get_all_groups();
        console.log(allGroups, "all");
        return res.status(200).send(allGroups);
      } else {
        const userGroups = await db.groups.get_groups_by_user(user_id);
        console.log(userGroups, "user");
        return res.status(200).send(userGroups);
      }
    } catch (err) {
      console.log(err);
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
    if (searchQuery !== "" || searchQuery !== " ") {
      try {
        const searchResults = await db.groups.check_new_group_name(searchQuery);

        return res.status(200).send(searchResults);
      } catch (err) {
        console.log(err);
      }
    }
  },
  addPersonToGroup: async (req, res) => {
    const db = req.app.get("db");
    const { group_id, person_id } = req.query;
    try {
      const [member] = await db.groups.check_person_membership(
        group_id,
        person_id
      );
      if (member) {
        return res.sendStatus(409);
      } else {
        await db.groups.create_groups_people(group_id, person_id);
        const people = await db.groups.get_people_grouped(group_id);

        return res.status(200).send(people);
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
        const people = await db.groups.get_people_grouped(group_id);

        return res.status(200).send(people);
      }
    } catch (err) {
      return res.sendStatus(404);
    }
  },
  deleteGroupFromPerson: async (req, res) => {
    const db = req.app.get("db");
    const { group_id, person_id } = req.query;
    try {
      await db.groups.delete_person_from_group(person_id, group_id);
      const groups = await db.people.get_groups_by_person_id(person_id);
      return res.status(200).send(groups);
    } catch (err) {
      console.log(err);
      return res.sendStatus(404);
    }
  },
  deleteUserFromGroup: async (req, res) => {
    const db = req.app.get("db");
    const { loggedInUser, user, group_id, filter } = req.query;

    try {
      await db.groups.delete_user_from_group(loggedInUser, group_id);
      if (filter === "all") {
        const groups = await db.groups.get_all_groups();
        return res.status(200).send(groups);
      }
      if (filter === "singleGroup") {
        return res.status(200).send(false);
      } else {
        const groups = await db.groups.get_groups_by_user(user);
        return res.status(200).send(groups);
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteGroup: async (req, res) => {
    const db = req.app.get("db");
    const { group_id, filter, user } = req.query;

    try {
      await db.groups.delete_group(group_id);
      if (filter === "all") {
        const groups = await db.groups.get_all_groups();
        return res.status(200).send(groups);
      } else {
        const groups = await db.groups.get_groups_by_user(user);
        return res.status(200).send(groups);
      }
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
        const [post] = await db.posts.create_post(post_content, null, date);

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
              return res.status(200).send(newPost);
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
        let [post] = await db.posts.create_post(post_content, null, date);
        await db.posts.create_group_post_user(group_id, post.post_id, user_id);
        const [newPost] = await db.posts.get_post_by_post_id(post.post_id);
        return res.status(200).send(newPost);
      } catch (err) {
        console.log(err);
      }
    }
  },
  addMemberToGroup: async (req, res) => {
    const db = req.app.get("db");
    const { loggedInUser, user, group_id, filter } = req.query;

    try {
      const [member] = await db.groups.check_group_membership(
        group_id,
        loggedInUser
      );
      if (!member) {
        const member = await db.groups.create_group_users(
          group_id,
          loggedInUser,
          false
        );
        if (filter === "all") {
          const groups = await db.groups.get_all_groups();
          return res.status(200).send(groups);
        }
        if (filter === "singleGroup") {
          return res.status(200).send(member);
        } else {
          const groups = await db.groups.get_groups_by_user(user);
          return res.status(200).send(groups);
        }
      } else {
        return res.sendStatus(409);
      }
    } catch (err) {
      console.log(err);
    }
  },
  checkGroupMembership: async (req, res) => {
    const db = req.app.get("db");
    const { group_id, user_id } = req.query;

    try {
      const [member] = await db.groups.check_group_membership(
        group_id,
        user_id
      );
      if (!member) {
        return res.status(200).send(false);
      } else {
        return res.status(200).send(member);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
