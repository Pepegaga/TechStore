import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Entypo, MaterialCommunityIcons, Feather, FontAwesome5} from '@expo/vector-icons';
import {RowItem} from '../components/RowItem';
import {Header, Icon} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useSelector} from 'react-redux'

const screen = Dimensions.get('window');



export default ({navigation})=>{

    const name = useSelector(state=>state.login.name)
    
    return(
        <View style={styles.container}>
            <StatusBar barStyle='light-content'/>
            <Header containerStyle={{backgroundColor: colors.blue, height: 70}}
                centerComponent={<Text style={styles.headerText}>Profile</Text>}
                rightComponent={<Icon name='settings' size={36} color="white" onPress={()=>navigation.push('Options')}/>}
            />
            <ScrollView>
                <View style={styles.accountHeader}>
                    <MaterialCommunityIcons name='account-circle-outline' size={48} color={colors.blue} />
                        <Text style={styles.text}>{name}</Text>
                    <TouchableOpacity style={styles.logout} onPress={()=>{
                        AsyncStorage.removeItem('token')
                        navigation.navigate('SignIn')
                        }}>
                        <Entypo name="log-out" size={24} color={colors.blue}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <RowItem text="Favourite" onPress={()=>navigation.push('Favourite')} leftIcon={<Feather name='star' size={24} color={colors.blue}/>} rightIcon={<Entypo name="chevron-right" size={20} color={colors.blue}/>} />
                    <RowItem text="Order history" onPress={()=>navigation.push('OrderHistory')} leftIcon={<FontAwesome5 name='clipboard' size={24} color={colors.blue}/>} rightIcon={<Entypo name="chevron-right" size={20} color={colors.blue}/>} />

                </View>
            </ScrollView>
        </View>
    );
}
;


const styles = StyleSheet.create({
    header: {
        width: screen.width,
        height: 70,
        backgroundColor: colors.blue,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    container:{
        backgroundColor: colors.background,
        flex: 1,
    },
    forgotButton: {
        color: '#007AFF',
        marginLeft: 20,
        marginTop: 15,
        fontSize: 15,
    },
    text: {
        fontSize:30,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
    },
    input: {
        width: screen.width * 0.92,
        height: 45,
        marginHorizontal: 15,
        marginTop: 12,
        paddingLeft: 10,
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    button: {
        width: screen.width * 0.92,
        height: 50,
        backgroundColor: colors.blue,
        marginTop: 30,
        borderRadius: 10,
        marginHorizontal: 15,
    },
    signUpText: {
        color: 'gray',
        fontSize: 12,
        marginHorizontal: 20,
        marginTop: 15,
    },
    settings: {
        marginTop: -32,
        marginRight: 10,
    },

    accountHeader: {
        marginTop: 10,
        marginLeft: 20,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between'
    },

    logout: {
        justifyContent: 'center',
        marginLeft: 70,
        marginTop: 13,
        marginRight: 10
    }
    
});