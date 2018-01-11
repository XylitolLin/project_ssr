import Home from './pages/Home'
import Users from './pages/Users'
import Autos from './pages/Autos'
import homeModel from '../common/models/home'
import autosModel from '../common/models/autos'

export default [{
    path: '/',
    component: Home,
    model: homeModel,
    exact: true
}, {
    path: '/autos',
    component: Autos,
    model: autosModel,
    exact: true
}, {
    path: '/users',
    component: Users
}]