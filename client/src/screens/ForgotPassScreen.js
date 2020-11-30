import React, {useState, useEffect} from 'react'
import {Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, View, SafeAreaView,
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StatusBar, Button
} from 'react-native'
import colors from '../constants/colors'
import { ScrollView } from 'react-native-gesture-handler'
import {useHttp} from '../hooks/http.hook'
import {baseUrl} from '../global'



const screen = Dimensions.get('window');

export default (props) => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPass, setRepeatPass] = useState('')
    const [access, setAccess] = useState(false)
    const [id, setId] = useState(0)


    const {request} = useHttp()

    const reset = () =>{
        setRepeatPass(''),
        setPassword('')
    }


    const requestHandler = async ()=>{
        try {
            const data = await request(`${baseUrl}/api/auth/`,'POST', {login})
            if(data.login==login){
                setAccess(true)
                setId(data.id)
            }
            
            
        } catch (error) {
            
        }
    }

    const passwordEditHadler = async ()=>{
        try {
            if(password==repeatPass){
                await request(`${baseUrl}/api/auth/forgot`,'PUT', {id,password})
            }else{
                alert("Passwords don't match")
                reset()
            }
            

        } catch (error) {
            
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView  contentContainerStyle={{flex: 1}}>
                        <Text style={styles.logoText}>TechStore</Text>
                        <View style={{marginTop: 100}}/>
                        {!access ? (<>
                            <TextInput value={login} onChangeText={(val)=>(setLogin(val))} style={styles.input} placeholder='Login'/>
                            <TouchableOpacity style={styles.signInButton} onPress={()=>requestHandler()}>
                                <Text style={styles.signInText}>Request</Text>
                            </TouchableOpacity>
                            <View style={{marginTop: 40}}>
                                <Button title="Cancel" onPress={()=>props.navigation.pop()}/>
                            </View>
                        </>) : (<>
                            <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={(val)=>setPassword(val)} placeholder="New password" />
                            <TextInput style={styles.input} secureTextEntry={true} value={repeatPass} onChangeText={(val)=>setRepeatPass(val)} placeholder="Repeat password"/>
                            <TouchableOpacity style={styles.signInButton} onPress={()=>passwordEditHadler()}>
                                <Text style={styles.signInText}>Change pasword</Text>
                            </TouchableOpacity>
                            <View style={{marginTop: 40}}>
                                <Button title="Cancel" onPress={()=>props.navigation.pop()}/>
                            </View>
                        </>)}
                        <View style={{flex:1}} />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    logoText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.blue,
        textAlign: 'center',
        marginTop: screen.height * 0.1
    },
    loginInput: {
        width: 230 ,
        marginHorizontal: screen.width * 0.2,
        borderBottomColor: "#979797",
        borderBottomWidth: 2
    },
    passwordInput: {
        width: 230 ,
        marginTop: 30,
        marginHorizontal: screen.width * 0.2,
        borderBottomColor: "#979797",
        borderBottomWidth: 2
    },
    signInButton: {
        height: 50,
        width: 230,
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
        marginHorizontal: screen.width * 0.2
    },
    signUpButton: {
        color: 'black',
    },
    signInText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
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
        backgroundColor: "white",
        fontSize: 18,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: colors.blue,
        paddingHorizontal: 20
    },
})