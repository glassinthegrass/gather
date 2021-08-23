require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const formData = require("express-form-data");
const massive = require("massive");
// const path = require("path");
const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
} = process.env;
const cloudinary = require("cloudinary").v2;
const authCtrl = require("./controllers/authCtrl");
const pplCtrl = require("./controllers/pplCtrl");
const postCtrl = require("./controllers/postCtrl");
const groupCtrl = require("./controllers/groupCtrl");
const announceCtrl = require("./controllers/announceCtrl");
const cloudinaryCtrl = require("./controllers/cloudinaryCtrl");
const viewsCtrl = require("./controllers/viewsCtrl");
const emailCtrl = require("./controllers/emailCtrl");
const { getBirthday } = require("./controllers/birthdayCtrl");
const friendCtrl = require("./controllers/friendCtrl");

app.use(formData.parse());
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 31556952000,
      sameSite: "strict",
    },
  })
);

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});
// console.log(cloudinary.url('sample'))
// app.use(express.static(__dirname+ "/../build"));
// app.get("*", (req,res)=>{
//     res.sendFile(path.join(__dirname, "../build/index.html"));
// });

//endpoints
//views
app.get("/api/home/:user_id", viewsCtrl.getHomeView);
app.get("/api/group/:group_name", viewsCtrl.getGroupView);
//cloudinary;
app.post("/api/images/:user_id", cloudinaryCtrl.uploadProfileImages);

//auth
app.get("/api/profile/:user_id", authCtrl.getUser);
app.post(`/auth/register`, authCtrl.register);
app.post(`/auth/admin`, authCtrl.registerAdmin);
app.post("/auth/login", authCtrl.login);
app.put("/auth/user", authCtrl.updateUser);
app.put("/auth/email", authCtrl.updateEmail);
app.put("/auth/authentication", authCtrl.updatePassword);
app.delete("/auth/logout", authCtrl.logout);

//ppl
app.get("/api/people", pplCtrl.getPeople);
app.get("/api/people/:person_id", pplCtrl.getPerson);
app.get("/api/searchpeople", pplCtrl.personSearch);
app.get("api/groupedpeople", pplCtrl.getPeopleGrouped);
app.post("/api/people", pplCtrl.createPerson);
app.put("/api/people/:person_id", pplCtrl.updatePerson);
app.delete("/api/people/:person_id", pplCtrl.deletePerson);

//post
app.get("/api/posts", postCtrl.getPosts);
app.get("/api/home-posts", postCtrl.getPostsByJoinedGroups);
app.get(`/api/birthday-post`, postCtrl.getPostsByPersonId);
app.post("/api/birthday-post", cloudinaryCtrl.addBirthdayPost);
app.post("/api/groupPosts/:group_id/user/:user_id", groupCtrl.createGroupPost);
app.put("/api/posts/:post_id", postCtrl.editPost);
app.delete("/api/posts/:post_id", postCtrl.deletePost);

//groups
app.get("/api/groups/all", groupCtrl.getAllGroups);
app.get("/api/groups", groupCtrl.searchGroups);
app.get("/api/groups/:user_id", groupCtrl.getGroupsByUser);
app.get("/api/member/groups", groupCtrl.checkGroupMembership);
app.post("/api/groups/member", groupCtrl.addMemberToGroup);
app.post("/api/groups", groupCtrl.createGroup);
app.post("/api/groups/add-person", groupCtrl.addPersonToGroup);
app.put(
  "/api/groups/:group_id/person/:person_id",
  groupCtrl.deletePersonFromGroup
);
app.delete("/api/groups", groupCtrl.deleteUserFromGroup);
app.delete("/api/delete-group", groupCtrl.deleteGroup);

//announcements

app.get("/api/announcements/:announcement_id", announceCtrl.getAnnouncement);
app.post("/api/announcements", announceCtrl.createAnnouncement);
app.post(
  "/api/announcements/:announcement_id",
  announceCtrl.createAnnouncementParagraph
);
app.delete("/api/announcements", announceCtrl.deleteAnnouncement);

//email
app.post("/api/email", emailCtrl.sendEmail);

//birthday
app.get("/api/birthday", getBirthday);

//friends
app.get("/api/friendships/:user_id", friendCtrl.getFrienships);
app.post(
  "/api/friend_request/:requesting_user_id/responding/:responding_user_id",
  friendCtrl.createFriendRequest
);
app.post(
  "/api/friendship/:responding_user_id/requested/:requesting_user_id",
  friendCtrl.acceptFriendRequest
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set("db", dbInstance);
  app.listen(SERVER_PORT, () => console.log(`GATHER on port ${SERVER_PORT}`));
});
