import React from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Stars from '../components/Stars'
import colors from '../constants/colors';

export default ({comment}) => {

    return (
        <View style={styles.container}>
            <View style={styles.commentHeader}>
                <MaterialCommunityIcons style={styles.profileIcon} name='account-circle' size={54} color="gray" />
                <Text style={styles.profileName}>{comment.user_name}</Text>
                <Text style={{marginTop: 23, marginLeft: 10}}>{comment.date}</Text>
                <View style={{marginLeft: 0, marginTop: 20}}>
                    <Stars rating={comment.rating}/>
                </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.commentCard}>
                <Text style={styles.title}>{comment.comment_title}</Text>
                <Text style={styles.text}>{comment.comment}</Text>
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons style={{marginTop: 0, marginLeft: 20}} name='thumb-up-outline' size={24} color='green'/>
                    <Text style={{marginTop: 5, marginLeft: 10}}>{comment.pluses}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons style={{marginTop: 15, marginLeft: 20}} name='thumb-down-outline' size={24} color='red'/>
                    <Text style={{marginTop: 17, marginLeft: 10}}>{comment.minuses}</Text>
                </View>
            </View>
        </View>
    )
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    commentCard:{
        flex: 1,
        width: screen.width,
        height: 300,
        backgroundColor: 'white',
        marginBottom: 10
    },
    commentHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screen.width,
        height: 60,
        backgroundColor: 'white',
    },
    separator:{
        width: screen.width,
        height: 1,
        borderColor: 'gray'
    },
    profileIcon: {
        marginLeft: 10,
        marginTop: 4
    },
    profileName:{
        marginTop: 20,
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 18
    },
    text: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 18,
        fontWeight:'400',
        height: 160
    },
    title:{
        marginLeft: 20,
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold'
    }
})