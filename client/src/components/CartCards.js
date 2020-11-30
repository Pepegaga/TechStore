import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    View,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native'
import Stars from './Stars'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import colors from '../constants/colors'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'

export default ({ product, img, handleDelete }) => {
    const { request } = useHttp()
    const [rating, setRating] = useState(0)
    const [comments, setComments] = useState(0)
    const id = product.product_id

    const countRaiting = async () => {
        try {
            const data = await request(
                `${baseUrl}/api/products/rating`,
                'POST',
                { id }
            )
            setRating(data.avg)
            const comments = await request(
                `${baseUrl}/api/comments/counter`,
                'POST',
                { id }
            )
            setComments(comments)
            console.log(comments)
        } catch (error) {}
    }

    useEffect(() => {
        let mounted = true
        countRaiting()
        return () => (mounted = false)
    }, [])

    const leftSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        })
        return (
            <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
                <View style={styles.deleteBox}>
                    <Animated.View>
                        <FontAwesome5 name="trash-alt" size={30} color="red" />
                    </Animated.View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Swipeable renderLeftActions={leftSwipe}>
            <SafeAreaView style={styles.card}>
                <View style={styles.cardImg}>
                    <Image source={img} />
                </View>
                <SafeAreaView>
                    <Text style={styles.cardTitle}>
                        {product.product_title}
                    </Text>
                    <View style={{ marginLeft: 70, flexDirection: 'row' }}>
                        <Stars rating={rating} comments={comments} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.cardDescription}>
                            {product.product_description}
                        </Text>
                        <View style={{ marginLeft: 5 }}>
                            <Entypo
                                name="chevron-right"
                                size={20}
                                color={colors.blue}
                            />
                        </View>
                    </View>
                    <Text
                        style={{
                            marginLeft: 70,
                            marginTop: 10,
                            fontSize: 30,
                            fontWeight: 'bold',
                        }}
                    >
                        {product.product_cost} p.
                    </Text>
                </SafeAreaView>
            </SafeAreaView>
        </Swipeable>
    )
}

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
    card: {
        width: screen.width,
        height: 230,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 10,
    },
    cardImg: {
        width: 60,
        height: 30,
        marginVertical: 15,
        marginLeft: -10,
    },
    cardTitle: {
        width: screen.width * 0.7,
        marginTop: 15,
        marginLeft: 70,
        fontSize: 22,
        fontWeight: 'bold',
    },
    cardDescription: {
        width: screen.width * 0.6,
        marginLeft: 70,
        fontSize: 13,
        color: 'gray',
    },
    deleteBox: {
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 230,
    },
})
