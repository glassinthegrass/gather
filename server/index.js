require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
// const path = require("path");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require("./controllers/authCtrl");
const pplCtrl = require("./controllers/pplCtrl");
const postCtrl = require("./controllers/postCtrl");
const groupCtrl = require("./controllers/groupCtrl");
const announceCtrl = require("./controllers/announceCtrl");

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

// app.use(express.static(__dirname+ "/../build"));
// app.get("*", (req,res)=>{
//     res.sendFile(path.join(__dirname, "../build/index.html"));
// });

//endpoints

//auth
app.post(`/auth/register`, authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.put("/auth/updateEmail", authCtrl.updateEmail);
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
app.post("/api/posts/:person_id/:user_id", postCtrl.addPost);
app.put("/api/posts/:post_id", postCtrl.editPost);
app.delete("/api/posts/:post_id", postCtrl.deletePost);

//groups
app.get("/api/groups", groupCtrl.searchGroups);
app.get("/api/groups/:user_id", groupCtrl.getGroupsByUser);
app.post("/api/groups", groupCtrl.addGroup);
app.post("/api/groups/:group_id", groupCtrl.addPersonToGroup);
app.put(
  "/api/groups/:group_id/person/:person_id",
  groupCtrl.deletePersonFromGroup
);
app.delete("/api/groups/:group_id", groupCtrl.deleteGroup);

//announcements
app.get("/api/announcements/:user_id", announceCtrl.getGroupAnnoucementsByUser);
app.get("/api/announcement/:announcement_id", announceCtrl.getAnnouncement);
app.post("/api/announcements", announceCtrl.createAnnouncement);
app.post(
  "/api/announcements/:announcement_id",
  announceCtrl.createAnnouncementParagraph
);
app.delete("/api/announcements", announceCtrl.deleteAnnouncement);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set("db", dbInstance);
  app.listen(SERVER_PORT, () => console.log(`GATHER on port ${SERVER_PORT}`));
});
