const cloudinary = require("cloudinary").v2;
const today = new Date();
const mmddyyyy = String(
  `${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}-${String(today.getYear() + 1900)}`
);

module.exports = {
  uploadProfileImages: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    const { path } = req.files.image;
    const [user] = await db.auth.get_user_by_user_id(user_id);

    if (user?.picture_public_id) {
      cloudinary.uploader.destroy(user.picture_public_id, { invalidate: true });
    }

    cloudinary.uploader.upload(
      path,
      {
        eager: {
          fetch_format: "auto",
          width: 600,
          height: 600,
          crop: "fill_pad",
          gravity: "auto",
          quality: "auto",
        },
        use_filename: true,
      },
      function (error, result) {
        if (result) {

          const { eager } = result;
          const profile_picture_url = eager[0].url;
          const picture_public_id = result.public_id;
          const version = "v" + result.version;

          db.cloudinary.update_user_picture(
            user_id,
            profile_picture_url,
            picture_public_id,
            version
          );
          user.profile_picture_url=profile_picture_url
          user.picture_public_id=picture_public_id
          user.picture_version= version
          user.isLoggedIn=true
          return res.status(200).send(user);
        }
        if (error) {
          console.log(error);
          return res.status(404);
        }
      }
    );
  },
  addBirthdayPost: async (req, res) => {
    const db = req.app.get("db");
    const { post_content, person_id, user_id } = req.query;

    if (req.files?.image) {
      try {
        const { path } = req.files.image;
        const [post] = await db.posts.create_post(post_content, null, mmddyyyy);

        if (post) {
          await db.posts.create_person_user_post_entry(
            person_id,
            user_id,
            post.post_id
          );
        }
        const [newPost] = await db.posts.get_birthday_post(post.post_id);

        cloudinary.uploader.upload(
          path,
          {
            eager: {
              fetch_format: "auto",
              width: 200,
              height: 200,
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
              newPost.post_picture_url = url;
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
        let [post] = await db.posts.create_post(post_content, null,mmddyyyy);
        await db.posts.create_person_user_post_entry(
          person_id,
          user_id,
          post.post_id
        );
        const [newPost] = await db.posts.get_birthday_post(post.post_id);
        return res.status(200).send(newPost);
      } catch (err) {
        console.log(err);
      }
    }
    // try {
    //   const [post] = await db.posts.create_post(post_content, post_url);
    //   if (!post) {
    //     return res.sendStatus(404);
    //   } else {
    //     const [trackingTable] = await db.posts.create_person_user_post_entry(
    //       post.post_id,
    //       person_id,
    //       user_id
    //     );
    //     if (!trackingTable) {
    //       return res.sendStatus(404);
    //     } else {
    //       post.person_id = person_id;
    //       post.user_id = user_id;
    //       return res.status(200).send(post);
    //     }
    //   }
    // } catch (err) {
    //   console.log(err);
    //   res.sendStatus(404);
    // }
  },
};

// const values = Object.values(req.files);
// console.log(path)
// const promises = values.map((image) =>
//   cloudinary.uploader.upload(image.path)
// );

// Promise.all(promises)
//   .then((results) => {
//     let url = results[0].url;
//     db.auth.update_user_picture(user_id, url)
//     return res.status(200).send(results);
//   })
//   .catch((err) => console.log(err));
