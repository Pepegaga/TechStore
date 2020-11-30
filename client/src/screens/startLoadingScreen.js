import React, { useEffect } from 'react'
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator,
    Image,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../constants/colors'
import { useDispatch } from 'react-redux'
import { saveLocalData } from '../redux/actions'

const screen = Dimensions.get('window')

export default (props) => {
    const dispatch = useDispatch()

    const detectLogin = async () => {
        const token = JSON.parse(await AsyncStorage.getItem('token'))
        if (token) {
            dispatch(saveLocalData(token))
            props.navigation.navigate('Tabs')
        } else {
            props.navigation.navigate('SignIn')
        }
    }

    useEffect(() => {
        detectLogin()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.logoText}>TechStore</Text>
            <ActivityIndicator
                style={styles.loadingComponent}
                size="large"
                color="#000fff"
            />
            {/* <Image style={styles.image} source={require('../assets/image0.png')} /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loadingComponent: {
        flex: 1,
        textAlign: 'center',
    },
    logoText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.blue,
        textAlign: 'center',
        marginTop: screen.height * 0.1,
    },
    image: {
        flex: 1,
        width: screen.width,
        height: screen.height,
        marginTop: 0,
    },
})
