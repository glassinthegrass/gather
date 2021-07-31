import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Profile from '../Components/Profile/Profile'
import UploadsProfile from '../Components/Uploads/UploadsProfile'
import Login from '../Components/Login/Login'
import Announcement from '../Components/Announcements/Announcement'
import GroupsView from '../Components/Groups/GroupsView'
import SingleGroup from '../Components/Groups/SingleGroup'

export default(
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/groups/:group_name' component={SingleGroup}/>
            <Route path='/groups' component={GroupsView}/>
            <Route path='/announcements/:announcement_id' component={Announcement}/>
            <Route path='/profile/uploads' component={UploadsProfile}/>
            <Route path='/profile/:user_id' component={Profile}/>
        </Switch>
)