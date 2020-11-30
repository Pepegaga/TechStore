import React, { useState } from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    Button,
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
import { baseUrl } from '../global'

const screen = Dimensions.get('window')

export default (props) => {
    const { request } = useHttp()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    const signUpHandler = async () => {
        try {
            if (login == '' || password == '' || name == '' || address == '') {
                alert('You need to fill in all fields')
            } else {
                const data = await request(
                    `${baseUrl}/api/auth/signup`,
                    'POST',
                    { login, password, name, address }
                )
                props.navigation.pop()
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
                            style={styles.input}
                            placeholder="Login"
                            value={login}
                            onChangeText={(text) => setLogin(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                        />
                        <TouchableOpacity
                            style={styles.signInButton}
                            onPress={() => {
                                signUpHandler()
                            }}
                        >
                            <Text style={styles.signInText}>Register</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1, marginTop: 20 }}>
                            <Button
                                onPress={() => {
                                    props.navigation.pop()
                                }}
                                title="Cancel"
                            />
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
