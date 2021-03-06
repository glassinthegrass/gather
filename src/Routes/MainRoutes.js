import { Switch, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import Profile from "../Components/Profile/Profile";
import UploadsProfile from "../Components/Uploads/UploadsProfile";
import Login from "../Components/Login/Login";
import Groups from "../Components/Groups/Groups";
import SingleGroup from "../Components/Groups/SingleGroup";
import AddGroup from "../Components/Groups/AddGroup";
import People from "../Components/People/People";
import Birthday from "../Components/People/Birthday";
import PostPage from "../Components/Posts/PostPage";

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/groups/:group_name" component={SingleGroup} />
    <Route exact path="/groups" render={() => <Groups />} />
    <Route path="/add-new-group" component={AddGroup} />
    <Route path="/profile/uploads" component={UploadsProfile} />
    <Route path="/profile/:user_id" component={Profile} />
    <Route path="/people" render={() => <People />} />
    <Route path="/birthdays" component={Birthday} />
    <Route path="/posts/:group_name/:username/:post_id" component={PostPage} />
  </Switch>
);
