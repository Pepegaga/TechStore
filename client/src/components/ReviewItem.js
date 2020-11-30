import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';
import { Entypo} from '@expo/vector-icons';
import Stars from './Stars'

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: '#fcfcfc',
    },
    text:{
        fontSize: 16,
        color: 'black',
        marginLeft: 25,
    },
    separator: {
        backgroundColor: colors.border,
        height: StyleSheet.hairlineWidth,
        marginLeft: 20
    }
});

export const ReviewItem = ({onPress,rating,comments}) =>{
    return(
        <View>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.row} onPress={onPress}>
                <Stars rating={rating} comments={comments} />
                <Text style={{marginLeft: 3, color: 'gray', marginTop: 3}}>reviews</Text>
                <View style={{marginLeft: 130}}>
                    <Entypo name="chevron-right" size={20} color={colors.blue}/>
                </View>
            </TouchableOpacity>
        </View>
    );
};
