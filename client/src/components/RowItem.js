import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';
import DATA from '../constants/dataMock'


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

export const RowItem = ({text, rightIcon,leftIcon, onPress, props}) =>{
    

    return(
        <View>
            <View style={styles.separator} />
    <TouchableOpacity style={styles.row} onPress={onPress}>
        {leftIcon}
        <Text style={styles.text}>{text}</Text>
        {rightIcon}
    </TouchableOpacity>
    </View>
    );
};

export const RowSeparator = () => <View style={styles.separator} />;