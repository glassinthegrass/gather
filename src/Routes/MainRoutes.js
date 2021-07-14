import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Login from '../Components/Login/Login'

export default(
        <Switch >
            <Route exact path="/" component={Login}/>
            <Route path='/home' component={Home}/>
        </Switch>
)