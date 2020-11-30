import React, {useState} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, View, TextInput, KeyboardAvoidingView} from 'react-native';
import colors from '../constants/colors';
import {Header, Icon} from 'react-native-elements'
import {useSelector, useDispatch} from 'react-redux'
import {useHttp} from '../hooks/http.hook'
import {baseUrl} from '../global'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {updateAddress, updateName} from '../redux/actions'
const screen = Dimensions.get('window');

export default (props)=>{

    const {request} = useHttp()

    const addr = useSelector(state=>state.login.address)
    const nme = useSelector(state=>state.login.name)
    const id = useSelector(state=>state.login.id)
    const dispatch = useDispatch()
    //console.log(nme)

    const [address, setAddress] = useState(addr)
    const [name, setName] = useState(nme)
    const [currentPass, setCurrentPass] = useState('')
    const [newPass, setNewPass] = useState('')

    const passwordEditHadler = async ()=>{
        try {

            await request(`${baseUrl}/api/options/editPass`,'PUT', {id,currentPass,newPass})

        } catch (error) {
            
        }
    }

    const nameEditHadler = async ()=>{
        try {

            const newName = await request(`${baseUrl}/api/options/editName`,'PUT', {id,name})
            AsyncStorage.setItem('token', JSON.stringify({
                name: newName.name
            }))
            dispatch(updateName(newName.name))

        } catch (error) {
            
        }
    }

    const addressEditHadler = async ()=>{
        try {

            const newAddress = await request(`${baseUrl}/api/options/editAddress`,'PUT', {id,address})
            AsyncStorage.setItem('token', JSON.stringify({
                address: newAddress.address
            }))
            dispatch(updateAddress(newAddress.address))
            console.log(newAddress.address)

        } catch (error) {
            
        }
    }

    return(
    <View style={styles.container}>
            <Header containerStyle={{backgroundColor: colors.blue, height: 70}}
                leftComponent={<Icon style={styles.backButton} name="chevron-left" color='white' size={48} onPress={()=>props.navigation.pop()}/>}
                centerComponent={<Text style={styles.headerText}>Options</Text>}
            />
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}>
                <ScrollView>
                    <Text style={styles.text}>Edit profile inforamtion</Text>
                    <Text style={{marginLeft: 20, marginTop: 20, fontSize: 16}}>Name: </Text>
                    <TextInput style={styles.input} value={name} onChangeText={(val)=>setName(val)} placeholder={nme}/>
                    <TouchableOpacity style={styles.saveButton} onPress={()=>nameEditHadler()}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <Text style={{marginLeft: 20, marginTop: 20, fontSize: 16}}>Address: </Text>
                    <TextInput style={styles.input} value={address} onChangeText={(val)=>setAddress(val)} placeholder={addr}/>
                    <TouchableOpacity style={styles.saveButton} onPress={()=>addressEditHadler()}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <View style={{marginVertical: 15}}/>
                    <Text style={styles.text}>Edit password</Text>
                    <Text style={{marginLeft: 20, marginTop: 20, fontSize: 16}}>Current password: </Text>
                    <TextInput style={styles.input} secureTextEntry={true} value={currentPass} onChangeText={(val)=>setCurrentPass(val)} />
        
                    <Text style={{marginLeft: 20, marginTop: 20, fontSize: 16}}>New password: </Text>
                    <TextInput style={styles.input} secureTextEntry={true} value={newPass} onChangeText={(val)=>setNewPass(val)} />
                    <TouchableOpacity style={styles.saveButton} onPress={()=>{
                        passwordEditHadler()
                        setCurrentPass('')
                        setNewPass('')
                        }}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <View style={{marginVertical: 15}}/>
                </ScrollView>
            </KeyboardAvoidingView>
            
    </View>
    )
}




const styles = StyleSheet.create({
    header: {
        width: screen.width,
        height: 50,
        backgroundColor: colors.blue,
    },
    headerText: {
        textAlign: 'right',
        marginTop: 0,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'flex-end'
    },
    backButton: {
        marginLeft: -15
    },
    container:{
        flex: 1,
        backgroundColor: colors.background,
    },
    text: {
        fontSize:20,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
    },
    input: {
        marginTop: 5,
        marginHorizontal: 18,
        width: screen.width * 0.9,
        height: 50,
        backgroundColor: "white",
        fontSize: 18,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: colors.blue,
        paddingHorizontal: 20
    },
    saveButton: {
        marginTop: 10,
        height: 50,
        width: 120,
        backgroundColor: colors.blue,
        borderRadius: 15,
        marginLeft: 20
    },
    buttonText: {
        textAlign: 'center',
        marginTop: 12,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})
