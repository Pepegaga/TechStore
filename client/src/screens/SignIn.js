import React, { useState, useEffect } from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
} from 'react-native'
import colors from '../constants/colors'
import { ScrollView } from 'react-native-gesture-handler'
import { useHttp } from '../hooks/http.hook'
import { useDispatch } from 'react-redux'
import { saveLocalData } from '../redux/actions'
import { baseUrl } from '../global'
import AsyncStorage from '@react-native-async-storage/async-storage'

const screen = Dimensions.get('window')

export default (props) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { request } = useHttp()
    const dispatch = useDispatch()

    const reset = () => {
        setLogin(''), setPassword('')
    }

    const signInHandler = async () => {
        try {
            const data = await request(`${baseUrl}/api/auth/signin`, 'POST', {
                login,
                password,
            })
            if (data.token) {
                dispatch(saveLocalData(data))
                await AsyncStorage.setItem(
                    'token',
                    JSON.stringify({
                        id: data.id,
                        token: data.token,
                        name: data.name,
                        address: data.address,
                    })
                )
                reset()
                setIsLoading(false)

                props.navigation.navigate('Tabs')
            }
        } catch (error) {}
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        <Text style={styles.logoText}>TechStore</Text>
                        <View style={{ flex: 2 }} />
                        <TextInput
                            value={login}
                            onChangeText={(val) => setLogin(val)}
                            style={styles.input}
                            placeholder="Login"
                        />
                        <TextInput
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(val) => setPassword(val)}
                            style={styles.input}
                            placeholder="Password"
                        />
                        <TouchableOpacity
                            style={styles.signInButton}
                            onPress={() => signInHandler()}
                        >
                            <Text style={styles.signInText}>Sign In</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.signUpText}>
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate('SignUp')
                                    }
                                >
                                    <Text
                                        style={{
                                            color: colors.blue,
                                            marginTop: 19,
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {' '}
                                        Sign up
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        color: 'black',
                                        marginTop: 20,
                                        fontSize: 15,
                                        fontSize: 13,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {' '}
                                    now.
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.navigate('ForgotPass')
                                }
                            >
                                <Text
                                    style={{
                                        color: colors.blue,
                                        marginTop: 10,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        marginLeft: 120,
                                    }}
                                >
                                    Forgot password?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    logoText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.blue,
        textAlign: 'center',
        marginTop: screen.height * 0.1,
    },
    loginInput: {
        width: 230,
        marginHorizontal: screen.width * 0.2,
        borderBottomColor: '#979797',
        borderBottomWidth: 2,
    },
    passwordInput: {
        width: 230,
        marginTop: 30,
        marginHorizontal: screen.width * 0.2,
        borderBottomColor: '#979797',
        borderBottomWidth: 2,
    },
    signInButton: {
        height: 50,
        width: 230,
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
        marginHorizontal: screen.width * 0.2,
    },
    signUpButton: {
        color: 'black',
    },
    signInText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
    signUpText: {
        marginLeft: 70,
        fontSize: 13,
        marginTop: 20,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 15,
        marginHorizontal: 35,
        width: screen.width * 0.8,
        height: 50,
        backgroundColor: 'white',
        fontSize: 18,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: colors.blue,
        paddingHorizontal: 20,
    },
})
