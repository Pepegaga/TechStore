import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';
import {Feather,Entypo,FontAwesome} from '@expo/vector-icons'


const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
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

export const CategoryRowItem = ({value}) =>{
    
    let leftIcon = ''

    if(value === 'Smartphones'){
        leftIcon = <Feather name='smartphone' size={24} color={colors.blue}/>
    } else if (value === 'Tablets') {
        leftIcon = <Feather name='tablet' size={24} color={colors.blue}/>
    } else if (value === 'Laptops') {
        leftIcon = <FontAwesome name='laptop' size={24} color={colors.blue}/>
    } else if (value === 'TV'){
        leftIcon = <FontAwesome name='tv' size={24} color={colors.blue}/>
    }

    return(
        <View>
            <View style={styles.separator} />
            <View style={styles.row}>
            {leftIcon}
                <Text style={styles.text}>{value}</Text>
                <Entypo name="chevron-right" size={20} color={colors.blue}/>
            </View>   
        </View>
    );
};

export const RowSeparator = () => <View style={styles.separator} />;