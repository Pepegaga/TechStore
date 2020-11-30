import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TextInput,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
} from 'react-native'

import colors from '../constants/colors'
import { CategoryRowItem, RowSeparator } from '../components/CategoryRowItem'

const screen = Dimensions.get('window')

export default function Home({ navigation }) {
    // const [categories, setCategories] = useState([])

    // const {request} = useHttp()

    // const renderCategofies = async()=>{
    //     try {
    //         const data = await request(`${baseUrl}/api/categories/list`,'POST')
    //         setCategories(data)
    //     } catch (error) {

    //     }
    // }

    // useEffect(()=>{
    //     renderCategofies()
    // },[])

    const onPress = (screenName) => {
        navigation.navigate('ItemList', {
            category: screenName,
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.header}>
                <Text style={styles.logoText}>TechStore</Text>
                <TextInput
                    style={styles.input}
                    clearButtonMode="always"
                    placeholder="Search for anything"
                />
            </SafeAreaView>
            <View>
                <TouchableOpacity onPress={() => onPress('Smartphones')}>
                    <CategoryRowItem value="Smartphones" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPress('Tablets')}>
                    <CategoryRowItem value="Tablets" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPress('Laptops')}>
                    <CategoryRowItem value="Laptops" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPress('TV')}>
                    <CategoryRowItem value="TV" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: screen.height * 0.05,
    },
    header: {
        width: screen.width,
        height: 150,
        backgroundColor: colors.blue,
    },
    logoText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    input: {
        width: screen.width * 0.92,
        height: 35,
        marginHorizontal: 15,
        marginTop: 12,
        paddingLeft: 10,
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    row: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fcfcfc',
    },
    text: {
        fontSize: 16,
        color: 'black',
        marginLeft: 25,
    },
    separator: {
        backgroundColor: colors.border,
        height: StyleSheet.hairlineWidth,
        marginLeft: 20,
    },
    item: {},
})
