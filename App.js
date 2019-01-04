/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, Image } from 'react-native'
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator /* NavigationEvents */,
} from 'react-navigation'
// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons'
import TextInputComponent from './src/TextInputComponent'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
})

class LogoTitle extends Component<{}> {
    render() {
        return <Image source={require('./x-icon.png')} style={{ width: 30, height: 30 }} />
    }
}

type HomeProps = {
    navigation: {
        navigate: (route: string, params: any) => void,
    },
}

// HomeScreen
class HomeScreen extends Component<HomeProps> {
    static navigationOptions = {
        // title: '主页',
        headerTitle: <LogoTitle />,
        headerStyle: {
            backgroundColor: '#fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: <Button title="Info" color="#fff" onPress={() => alert('This is a Button')} />,
    }

    goDetails = () => {
        const { navigation } = this.props

        /* 1. Navigate to the Details route with params */
        navigation.navigate('Details', {
            itemId: 87,
            otherParam: 'anything you want here',
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <Button title="Go to Details" onPress={this.goDetails} />

                {/* <NavigationEvents
                    onWillFocus={(payload) => console.log('will focus', payload)}
                    onDidFocus={(payload) => console.log('did focus', payload)}
                    onWillBlur={(payload) => console.log('will blur', payload)}
                    onDidBlur={(payload) => console.log('did blur', payload)}
                /> */}
            </View>
        )
    }
}

// DetailsScreen
type DetailsProps = {
    navigation: {
        navigate: (name: string) => void,
        push: (name: string) => void,
        goBack: () => void,
        getParam: (param: string, defaultValue: string) => void,
        setParams: (params: any) => void,
    },
}

type DetailsState = {
    count: number,
}
class DetailsScreen extends Component<DetailsProps, DetailsState> {
    static navigationOptions: ({ navigation: any, screenProps: any, navigationOptions: any }) => any = ({
        navigation,
    }) => {
        const params = navigation.state.params || {}
        return {
            title: navigation.getParam('otherParam', 'A Nested Details Screen'),
            headerRight: <Button title="+1" color="#fff" onPress={navigation.getParam('increaseCount')} />,
            headerBackTitle: 'A',
            headerLeft: <Button title="Info" color="#fff" onPress={() => navigation.navigate('MyModal')} />,
        }
    }

    state = {
        count: 1,
    }

    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount })
    }

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        /* 2. Get the param, provide a fallback value if not available */
        const { navigation } = this.props
        const itemId = navigation.getParam('itemId', 'NO-ID')
        const otherParam = navigation.getParam('otherParam', 'some default value')
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Detail Screen {this.state.count}</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                <Button title="Go to Details Again" onPress={() => this.props.navigation.push('Details')} />
                <Button title="Go to Home" onPress={() => this.props.navigation.navigate('Home')} />
                <Button title="Go Back" onPress={() => this.props.navigation.goBack()} />
                <Button
                    title="update the title"
                    onPress={() => this.props.navigation.setParams({ otherParam: 'Updated!' })}
                />
            </View>
        )
    }
}

class ModalScreen extends Component<DetailsProps> {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is a Modal</Text>
                <Button title="dismiss" onPress={() => this.props.navigation.goBack()} />
            </View>
        )
    }
}

class SettingsScreen extends Component<{}> {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextInputComponent />
            </View>
        )
    }
}

class ProfileScreen extends Component<{}> {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Profile Screen</Text>
            </View>
        )
    }
}

const MainStack = createStackNavigator(
    {
        // Home: {
        //     screen: HomeScreen
        // }
        Home: HomeScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        // screen component 将继承这个设置
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },

        // stack navigator自己的 options
        // navigationOptions: {
        //     tabBarLabel: '主页',
        // },
    }
)

const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
        Profile: ProfileScreen,
    },
    {
        navigationOptions: {
            tabBarLabel: '设置',
        },
    }
)

const MainModalStack = createStackNavigator(
    {
        Main: {
            screen: MainStack,
        },
        MyModal: {
            screen: ModalScreen,
        },
    },
    {
        // stack navigator自己的 options
        navigationOptions: {
            tabBarLabel: '主页',
        },
        mode: 'modal',
        headerMode: 'none', // 很关键，表示这个Stack 没有header
    }
)

// 定义一个Tab Icon组件
type TabBarIconProps = {
    focused: boolean,
    horizontal: boolean,
    tintColor: string,
}

function IconWrapper(navigation: any) {
    return function TabBarIcon(props: TabBarIconProps) {
        const { focused, horizontal, tintColor } = props
        const { routeName } = navigation.state
        let iconName
        // @see https://ionicons.com/usage ionic图标不同平台加不同前缀
        if (routeName === 'MainModal') {
            // iconName = `ios-${focused ? 'aperture' : 'analytics'}`
            iconName = `md-${focused ? 'aperture' : 'analytics'}`
        } else if (routeName === 'Settings') {
            // iconName = `ios-${focused ? 'flower' : 'finger-print'}`
            iconName = `md-${focused ? 'flower' : 'finger-print'}`
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
    }
}

const TabNavigator = createBottomTabNavigator(
    {
        MainModal: MainModalStack,
        Settings: SettingsStack,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: IconWrapper(navigation),
            // tabBarIcon: ({ focused, horizontal, tintColor }) => {
            //     const { routeName } = navigation.state
            //     let iconName
            //     if (routeName === 'MainModal') {
            //         iconName = `ios-${focused ? 'aperture' : 'analytics'}`
            //     } else if (routeName === 'Settings') {
            //         iconName = `ios-${focused ? 'flower' : 'finger-print'}`
            //     }
            //     // You can return any component that you like here! We usually use an
            //     // icon component from react-native-vector-icons
            //     return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
            // },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
)

const AppContainer = createAppContainer(TabNavigator)

// n React Native, the component exported from App.js is the entry point (or root component) for your app
export default class App extends Component<{}> {
    render() {
        return <AppContainer />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})
