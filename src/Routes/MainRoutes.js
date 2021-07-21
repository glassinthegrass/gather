import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Practice from '../Components/Home/Practice'
import Login from '../Components/Login/Login'

export default(
        <Switch >
            <Route exact path="/" component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/practice' component={Practice}/>
            <Route path='/registerPT2' component={Practice}/>

        </Switch>
)