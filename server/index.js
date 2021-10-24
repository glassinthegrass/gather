require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const formData = require("express-form-data");
const authCtrl = require("./controllers/authCtrl");
const pplCtrl = require("./controllers/pplCtrl");
const postCtrl = require("./controllers/postCtrl");
const groupCtrl = require("./controllers/groupCtrl");
const cloudinaryCtrl = require("./controllers/cloudinaryCtrl");
const viewsCtrl = require("./controllers/viewsCtrl");
const emailCtrl = require("./controllers/emailCtrl");
const { getBirthday } = require("./controllers/birthdayCtrl");
const friendCtrl = require("./controllers/friendCtrl");
const authUser = require("./middleware/authenticateUser");
const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
} = process.env;

app.use(formData.parse());
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 31556952000,
    },
  })
);

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

//endpoints
//views
app.get("/api/home/:user_id", viewsCtrl.getHomeView);
app.get("/api/group/:group_name", viewsCtrl.getGroupView);
app.get("/api/group-posts", viewsCtrl.getGroupPosts);
//cloudinary;
app.post("/api/images/:user_id", cloudinaryCtrl.uploadProfileImages);

//auth
app.get("/api/profile/:user_id", authUser.isLoggedIn, authCtrl.getUser);
app.post("/auth/session", authCtrl.createSession);
app.post(`/auth/register`, authCtrl.register);
app.post(`/auth/admin`, authCtrl.registerAdmin);
app.post("/auth/login", authCtrl.login);
app.put("/auth/user", authUser.isLoggedIn, authCtrl.updateUser);
app.put("/auth/email", authUser.isLoggedIn, authCtrl.updateEmail);
app.put("/auth/authentication", authUser.isLoggedIn, authCtrl.updatePassword);
app.delete("/auth/logout", authUser.isLoggedIn, authCtrl.logout);

//ppl
app.get("/api/people", authUser.isLoggedIn, pplCtrl.getPeople);
app.get("/api/people/:person_id", authUser.isLoggedIn, pplCtrl.getPerson);
app.get("/api/searchpeople", authUser.isLoggedIn, pplCtrl.personSearch);
app.get("/api/person/groups", authUser.isLoggedIn, pplCtrl.getGroups);
app.get("/api/groupedpeople", authUser.isLoggedIn, pplCtrl.getPeopleGrouped);
app.post("/api/people", authUser.isLoggedIn, pplCtrl.createPerson);
app.put("/api/people/:person_id", authUser.isLoggedIn, pplCtrl.updatePerson);
app.delete("/api/people", authUser.isLoggedIn, pplCtrl.deletePerson);

//post
app.get("/api/posts", authUser.isLoggedIn, postCtrl.getPosts);
app.get(
  "/api/home-posts",
  authUser.isLoggedIn,
  postCtrl.getPostsByJoinedGroups
);
app.get(`/api/birthday-post`, authUser.isLoggedIn, postCtrl.getPostsByPersonId);
app.get(`/api/post/:post_id`, authUser.isLoggedIn, postCtrl.getPostByPostId);
app.post(
  "/api/birthday-post",
  authUser.isLoggedIn,
  cloudinaryCtrl.addBirthdayPost
);
app.post(
  "/api/groupPosts/:group_id/user/:user_id",
  authUser.isLoggedIn,
  groupCtrl.createGroupPost
);
app.put("/api/posts/:post_id", authUser.isLoggedIn, postCtrl.editPost);
app.delete("/api/posts/:post_id", authUser.isLoggedIn, postCtrl.deletePost);

//comments
app.get(
  `/api/comments/:post_id`,
  authUser.isLoggedIn,
  postCtrl.getCommentsByPost
);
app.post(`/api/post-comment`, authUser.isLoggedIn, postCtrl.createPostComment);

//groups
app.get("/api/groups/all", authUser.isLoggedIn, groupCtrl.getAllGroups);
app.get("/api/groups", authUser.isLoggedIn, groupCtrl.searchGroups);
app.get("/api/groups/:user_id", authUser.isLoggedIn, groupCtrl.getGroupsByUser);
app.get(
  "/api/member/groups",
  authUser.isLoggedIn,
  groupCtrl.checkGroupMembership
);
app.post("/api/groups/member", authUser.isLoggedIn, groupCtrl.addMemberToGroup);
app.post("/api/groups", authUser.isLoggedIn, groupCtrl.createGroup);
app.post(
  "/api/groups/add-person",
  authUser.isLoggedIn,
  groupCtrl.addPersonToGroup
);
app.put(
  "/api/groups/:group_id/person/:person_id",
  authUser.isLoggedIn,
  groupCtrl.deletePersonFromGroup
);
app.put(
  "/api/person-groups",
  authUser.isLoggedIn,
  groupCtrl.deleteGroupFromPerson
);
app.delete("/api/groups", authUser.isLoggedIn, groupCtrl.deleteUserFromGroup);
app.delete("/api/delete-group", authUser.isLoggedIn, groupCtrl.deleteGroup);


//email
app.post("/api/email", authUser.isLoggedIn, emailCtrl.sendEmail);

//birthday
app.get("/api/birthday", authUser.isLoggedIn, getBirthday);

//friends
app.get(
  "/api/friendships/:user_id",
  authUser.isLoggedIn,
  friendCtrl.getFrienships
);
app.post(
  "/api/friend_request/:requesting_user_id/responding/:responding_user_id",
  authUser.isLoggedIn,
  friendCtrl.createFriendRequest
);
app.post(
  "/api/friendship/:responding_user_id/requested/:requesting_user_id",
  authUser.isLoggedIn,
  friendCtrl.acceptFriendRequest
);

app.use(express.static(__dirname + "/../build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
massive(
  {
    connectionString: CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  { scripts: path.join(__dirname, "../db") }
).then((dbInstance) => {
  app.set('db', dbInstance);
  app.listen(SERVER_PORT, () => console.log(`GATHER on port ${SERVER_PORT}`));
});
