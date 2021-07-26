const cloudinary = require("cloudinary").v2;

module.exports = {
  uploadProfileImages: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    const { path } = req.files.image;
console.log(req.files)
    const [user] = await db.auth.get_user_by_user_id(user_id);

    if (user?.picture_public_id) {
      cloudinary.uploader.destroy(user.picture_public_id, { invalidate: true });
    }

    cloudinary.uploader.upload(
      path,
      {
        eager: {
          fetch_format: "auto",
          width:600,
          height: 600,
          crop: "fill_pad",
          gravity: "auto",
          quality: "auto",
          format:'png'
        },
        use_filename: true,
      },
      function (error, result) {
        if (result) {
            const { eager } = result;
            const profile_picture_url = eager[0].url;
            const picture_public_id = result.public_id;
            const version = 'v'+result.version

          db.cloudinary.update_user_picture(
            user_id,
            profile_picture_url,
            picture_public_id,
            version
          );
          return res.status(200).send(profile_picture_url);
        }
        if (error) {
          return res.status(404);

        }
      }
    );
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
