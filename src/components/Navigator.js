import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import Home from '../screens/Home'
import AddContacts from '../screens/AddContacts'

const MainRoutes = createSwitchNavigator({
    Home: {
        name: 'Home',
        screen: Home
    },
    AddContacts: {
        name: 'AddContacts',
        screen: AddContacts
    },
})

const MainNavigator = createAppContainer(
    MainRoutes, {initialRouteName: 'AddContacts'}
)

export default MainNavigator