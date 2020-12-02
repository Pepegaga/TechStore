import React, { useState, useEffect } from 'react'
import {
    Text,
    SafeAreaView,
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
import { useSelector, useDispatch } from 'react-redux'
import CartCards from '../components/CartCards'
import { addToCart, rerenderCart } from '../redux/actions'

export default function CartScreen(props) {
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [dataLength, setDataLength] = useState(-1)
    const [cost, setCost] = useState(0)
    let summ = 0
    const rerender = useSelector((state) => state.cart.rerenderTemp)

    let date = new Date()
    date = JSON.stringify(date)
    date = date.slice(1, -15)
    date = JSON.stringify(date)

    const id = useSelector((state) => state.login.id)
    const name = useSelector((state) => state.login.name)
    const address = useSelector((state) => state.login.address)
    const dispatch = useDispatch()

    const { request } = useHttp()

    const renderCart = async () => {
        try {
            const data = await request(`${baseUrl}/api/cart/cart`, 'POST', {
                id,
            })
            setDataLength(data.length)
            data.map(async (product) => {
                const id = product.product_id
                const prodData = await request(
                    `${baseUrl}/api/products/cartList`,
                    'POST',
                    { id }
                )
                setList((list) => [...list, prodData])
                dispatch(addToCart(prodData.item))
                summ += prodData.item.product_cost
                setCost(summ)
                //dispatch(addToCart(prodData.item))
            })
        } catch (error) {}
    }

    const makeOrder = async () => {
        try {
            list.map(async (item) => {
                const prodId = item.item.product_id
                const prodTitle = item.item.product_title
                const img = item.item.product_thumb
                await request(`${baseUrl}/api/orders/addOrder`, 'POST', {
                    id,
                    prodId,
                    date,
                    prodTitle,
                    img,
                    name,
                    address,
                })
            })
            setList([])
            await request(`${baseUrl}/api/cart/deleteCart`, 'DELETE', { id })
            alert('Your order has been sent for processing')
        } catch (error) {}
    }

    useEffect(() => {
        renderCart()
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

    const cartArr = useSelector((state) => state.cart.cart)

    const deleteItem = (index, key) => {
        setList(cartArr)
        const arr = [...list]
        arr.splice(index, 1)
        console.log(arr)
        setList(arr)
        deleteFromDB(key)
        dispatch(rerenderCart(Math.random()))
    }

    const deleteFromDB = async (prodId) => {
        try {
            await request(`${baseUrl}/api/cart/deleteFromDB`, 'DELETE', {
                prodId,
                id,
            })
        } catch (error) {}
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.header}>
                <Text style={styles.headerText}>Cart</Text>
            </SafeAreaView>
            <FlatList
                style={{ flex: 1 }}
                data={cartArr}
                extraData={rerender}
                key={(item) => item.product_id}
                keyExtractor={(item) =>
                    item.product_id.toString() + Math.random()
                }
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={item.product_id}
                        onPress={() => onClickHandler(item)}
                    >
                        <CartCards
                            product={item}
                            handleDelete={() =>
                                deleteItem(index, item.product_id)
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
                        <View style={styles.empty}>
                            <MaterialCommunityIcons
                                name="cart-off"
                                size={150}
                                color="gray"
                            />
                            <Text style={styles.text}>Your cart is empty.</Text>
                            <Text style={{ fontSize: 15, color: 'gray' }}>
                                Add something to cart to make an order.
                            </Text>
                        </View>
                    )
                }
            />
            {list.length > 0 ? (
                <View style={styles.makeOrderButton}>
                    {isLoading ? (
                        <>
                            <ActivityIndicator
                                style={{ marginTop: 22, marginLeft: -200 }}
                                size="large"
                                color="white"
                            />
                        </>
                    ) : (
                        <>
                            <Text
                                style={{
                                    marginTop: 8,
                                    marginLeft: 20,
                                    color: 'white',
                                }}
                            >
                                {list.length} product(s) in cart
                            </Text>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    marginLeft: 25,
                                }}
                            >
                                {cost} p.
                            </Text>
                        </>
                    )}
                    <TouchableOpacity
                        style={styles.buyButton}
                        onPress={() => makeOrder()}
                    >
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginTop: 10,
                                color: 'white',
                            }}
                        >
                            Buy
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View />
            )}
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
        marginTop: 13,
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
    makeOrderButton: {
        height: 70,
        backgroundColor: colors.blue,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    empty: {
        alignItems: 'center',
        marginTop: 150,
    },
    buyButton: {
        width: 100,
        height: 50,
        backgroundColor: colors.orange,
        borderRadius: 15,
        marginLeft: 250,
        marginTop: -50,
    },
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 80,
    },
})
