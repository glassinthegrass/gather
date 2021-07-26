import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Profile from '../Components/Profile/Profile'
import UploadsProfile from '../Components/Uploads/UploadsProfile'
import Login from '../Components/Login/Login'
import Announcement from '../Components/Announcements/Announcement'
import GroupsView from '../Components/Groups/GroupsView'

export default(
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path='/home' render={()=><Home/>}/>
            <Route path='/groups' render={()=><GroupsView/>}/>
            <Route path='/announcements/:announcement_id' component={Announcement}/>
            <Route path='/profile/uploads' component={UploadsProfile}/>
            <Route path='/profile' render={()=><Profile/>}/>
        </Switch>
)