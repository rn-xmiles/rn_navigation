/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button } from 'react-native'
import { createAppContainer, createStackNavigator, createBottomTabNavigator /* NavigationEvents */ } from 'react-navigation'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
})

type HomeProps = {
    navigation: {
        navigate: (route: string, params: any) => void,
    },
}

// HomeScreen
class HomeScreen extends Component<HomeProps> {
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
        getParam: (param: string, def: string) => void,
    },
}
class DetailsScreen extends Component<DetailsProps> {
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
                <Text>Detail Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                <Button title="Go to Details Again" onPress={() => this.props.navigation.push('Details')} />
                <Button title="Go to Home" onPress={() => this.props.navigation.navigate('Home')} />
                <Button title="Go Back" onPress={() => this.props.navigation.goBack()} />
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
                <Text>Settings Screen</Text>
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

const HomeStack = createStackNavigator(
    {
        // Home: {
        //     screen: HomeScreen
        // }
        Home: HomeScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
    }
)

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Profile: ProfileScreen,
})

const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Settings: SettingsStack,
})

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
