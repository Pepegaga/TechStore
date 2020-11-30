import React, { useState, useEffect } from 'react'
import {
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    View,
    Alert,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import colors from '../constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'
import { useSelector } from 'react-redux'
import { Header, Icon } from 'react-native-elements'
import Card from '../components/Card'
import { FontAwesome5 } from '@expo/vector-icons'

export default ({ navigation }) => {
    const [list, setList] = useState([])
    const [cancelledList, setCancelledList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [dataLength, setDataLength] = useState(-1)
    const [confirmed, setConfirmed] = useState(true)
    const [header, setHeader] = useState('Confirmed orders')
    const [isEmpty, setIsEmpty] = useState(true)

    const id = useSelector((state) => state.login.id)

    const { request } = useHttp()

    const renderOrders = async () => {
        try {
            const data = await request(
                `${baseUrl}/api/orders/acceptedOrdersList`,
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
            const cancelledData = await request(
                `${baseUrl}/api/orders/cancelledOrdersList`,
                'POST',
                { id }
            )
            cancelledData.map(async (product) => {
                const id = product.product_id
                const prodData = await request(
                    `${baseUrl}/api/products/cartList`,
                    'POST',
                    { id }
                )
                setCancelledList((cancelledList) => [
                    ...cancelledList,
                    prodData,
                ])
            })
        } catch (error) {}
    }

    useEffect(() => {
        renderOrders()
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

    const deleteFromDB = async () => {
        try {
            await request(
                `${baseUrl}/api/orders/deleteOrderHistory`,
                'DELETE',
                { id }
            )
        } catch (error) {}
    }

    const alert = () => {
        Alert.alert(
            'Order history delete',
            'Do you want to delete all your order history?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        deleteFromDB(), navigation.pop()
                    },
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={styles.container}>
            {!list.length > 0 ? (
                <Header
                    containerStyle={{
                        backgroundColor: colors.blue,
                        height: 70,
                    }}
                    leftComponent={
                        <Icon
                            style={{ marginLeft: -10 }}
                            name="chevron-left"
                            color="white"
                            size={48}
                            onPress={() => navigation.pop()}
                        />
                    }
                    centerComponent={
                        <Text style={styles.headerText}>{header}</Text>
                    }
                    //rightComponent={<FontAwesome5 style={styles.deleteBtn} name="trash-alt" size={24} color='white' onPress={()=>alert()}/>}
                />
            ) : (
                <Header
                    containerStyle={{
                        backgroundColor: colors.blue,
                        height: 70,
                    }}
                    leftComponent={
                        <Icon
                            style={{ marginLeft: -10 }}
                            name="chevron-left"
                            color="white"
                            size={48}
                            onPress={() => navigation.pop()}
                        />
                    }
                    centerComponent={
                        <Text style={styles.headerText}>{header}</Text>
                    }
                    rightComponent={
                        <FontAwesome5
                            style={styles.deleteBtn}
                            name="trash-alt"
                            size={24}
                            color="white"
                            onPress={() => alert()}
                        />
                    }
                />
            )}

            {confirmed ? (
                <FlatList
                    style={{ flex: 1 }}
                    data={list}
                    keyExtractor={(item) =>
                        item.item.product_id.toString() + Math.random()
                    }
                    renderItem={({ item, index }) => (
                        <>
                            <TouchableOpacity
                                key={item.item.product_id}
                                onPress={() => onClickHandler(item.item)}
                            >
                                <Card product={item.item} />
                            </TouchableOpacity>
                        </>
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
                                    <Text
                                        style={{ fontSize: 15, color: 'gray' }}
                                    >
                                        Add something to cart to make an order.
                                    </Text>
                                </View>
                            </>
                        )
                    }
                />
            ) : (
                <FlatList
                    style={{ flex: 1 }}
                    data={cancelledList}
                    keyExtractor={(item) =>
                        item.item.product_id.toString() + Math.random()
                    }
                    renderItem={({ item, index }) => (
                        <>
                            <TouchableOpacity
                                key={item.item.product_id}
                                onPress={() => onClickHandler(item.item)}
                            >
                                <Card product={item.item} />
                            </TouchableOpacity>
                        </>
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
                                    <Text
                                        style={{ fontSize: 15, color: 'gray' }}
                                    >
                                        Add something to cart to make an order.
                                    </Text>
                                </View>
                            </>
                        )
                    }
                />
            )}
            {confirmed ? (
                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => {
                        setConfirmed(!confirmed), setHeader('Cancelled orders')
                    }}
                >
                    <Text style={styles.commentText}>Show Cancelled</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => {
                        setConfirmed(!confirmed), setHeader('Confirmed orders')
                    }}
                >
                    <Text style={styles.commentText}>Show Confirmed</Text>
                </TouchableOpacity>
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
    commentText: {
        textAlign: 'center',
        color: 'white',
        marginTop: 13,
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelBtn: {
        width: screen.width * 0.4,
        height: 50,
        backgroundColor: 'red',
        marginTop: screen.height * 0.84,
        marginLeft: screen.width * 0.55,
        borderRadius: 20,
        position: 'absolute',
    },
    confirmBtn: {
        width: screen.width * 0.4,
        height: 50,
        backgroundColor: 'green',
        marginTop: screen.height * 0.84,
        marginLeft: screen.width * 0.55,
        borderRadius: 20,
        position: 'absolute',
    },
    deleteBtn: {},
})
