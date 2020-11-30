import React, { useState, useEffect } from 'react'
import {
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    View,
    StatusBar,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import colors from '../constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'
import { useSelector } from 'react-redux'
import CartCards from '../components/CartCards'
import { Header, Icon } from 'react-native-elements'

export default (props) => {
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [dataLength, setDataLength] = useState(-1)

    const id = useSelector((state) => state.login.id)

    const { request } = useHttp()

    const renderFavourite = async () => {
        try {
            const data = await request(
                `${baseUrl}/api/favourite/favourite`,
                'POST',
                { id }
            )
            setDataLength(data.length)
            data.map(async (product) => {
                const id = product.product_id
                const prodData = await request(
                    `${baseUrl}/api/products/cartList`,
                    'POST',
                    { id }
                )
                setList((list) => [...list, prodData])
            })
        } catch (error) {}
    }

    useEffect(() => {
        renderFavourite()
    }, [])

    useEffect(() => {
        if (dataLength != -1 && dataLength == list.length) {
            setIsLoading(false)
        }
    }, [isLoading, list, dataLength])

    const onClickHandler = (item) => {
        props.navigation.navigate('ItemDescription', {
            item: item,
        })
    }

    const deleteItem = (index, key) => {
        const arr = [...list]
        arr.splice(index, 1)
        setList(arr)
        console.log(key)
        deleteFromDB(key)
    }

    const deleteFromDB = async (prodId) => {
        try {
            await request(`${baseUrl}/api/favourite/deleteFromDB`, 'DELETE', {
                prodId,
                id,
            })
        } catch (error) {}
    }

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ backgroundColor: colors.blue, height: 70 }}
                leftComponent={
                    <Icon
                        style={{ marginLeft: -10 }}
                        name="chevron-left"
                        color="white"
                        size={48}
                        onPress={() => props.navigation.pop()}
                    />
                }
                centerComponent={
                    <Text style={styles.headerText}>Favourite</Text>
                }
            />
            <FlatList
                data={list}
                keyExtractor={(item) =>
                    item.item.product_id.toString() + Math.random()
                }
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={item.item.product_id}
                        onPress={() => onClickHandler(item.item)}
                    >
                        <CartCards
                            product={item.item}
                            handleDelete={() =>
                                deleteItem(index, item.item.product_id)
                            }
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    isLoading ? (
                        <>
                            <ActivityIndicator
                                style={{ marginTop: screen.height * 0.4 }}
                                size="large"
                                color="#000fff"
                            />
                        </>
                    ) : (
                        <>
                            <View style={styles.empty}>
                                <MaterialCommunityIcons
                                    name="star"
                                    size={150}
                                    color="gray"
                                />
                                <Text style={styles.text}>Empty</Text>
                                <Text style={{ fontSize: 15, color: 'gray' }}>
                                    Add something to cart to make an order.
                                </Text>
                            </View>
                        </>
                    )
                }
            />
        </View>
    )
}

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
    header: {
        width: screen.width,
        height: 70,
        backgroundColor: colors.blue,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    logo: {
        alignItems: 'center',
        marginTop: 150,
    },
    text: {
        fontSize: 25,
        color: 'black',
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: colors.blue,
        marginTop: 50,
        borderRadius: 10,
    },
    empty: {
        alignItems: 'center',
        marginTop: 150,
    },
})
