import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
} from 'react-native'
import { Header, Icon } from 'react-native-elements'
import colors from '../constants/colors'
import Card from '../components/Card'
import { ScrollView } from 'react-native-gesture-handler'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'

const screen = Dimensions.get('window')

export default function ItemList({ navigation, route }) {
    // const [rating, setRating] = useState(0)
    const { request } = useHttp()
    const { category } = route.params
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const renderList = async () => {
        try {
            const data = await request(
                `${baseUrl}/api/products/productsList`,
                'POST',
                { category }
            )
            setList(data)
            setIsLoading(false)
        } catch (error) {}
    }

    useEffect(() => {
        renderList()
    }, [])

    // useEffect(()=>{
    //     ratingCounter()
    // },[ratingCounter])

    const onClickHandler = (item) => {
        navigation.push('ItemDescription', {
            item: item,
            category: category,
        })
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    containerStyle={{
                        backgroundColor: colors.blue,
                        height: 70,
                    }}
                    leftComponent={
                        <Icon
                            style={styles.backButton}
                            name="chevron-left"
                            color="white"
                            size={48}
                            onPress={() => navigation.pop()}
                        />
                    }
                    centerComponent={
                        <Text style={styles.headerText}>{category}</Text>
                    }
                />
                <ScrollView>
                    <ActivityIndicator
                        style={styles.loadingComponent}
                        size="large"
                        color={colors.blue}
                    />
                </ScrollView>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header
                    containerStyle={{
                        backgroundColor: colors.blue,
                        height: 70,
                    }}
                    leftComponent={
                        <Icon
                            style={styles.backButton}
                            name="chevron-left"
                            color="white"
                            size={48}
                            onPress={() => navigation.pop()}
                        />
                    }
                    centerComponent={
                        <Text style={styles.headerText}>{category}</Text>
                    }
                />
                <ScrollView>
                    {list.map((item) => {
                        return (
                            <TouchableOpacity
                                key={item.product_id}
                                onPress={() => onClickHandler(item)}
                            >
                                <Card product={item} />
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: screen.width,
        height: 70,
        backgroundColor: colors.blue,
        flexDirection: 'row',
    },
    headerText: {
        textAlign: 'right',
        marginTop: 0,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'flex-end',
    },
    backButton: {
        marginLeft: -15,
    },
    loadingComponent: {
        textAlign: 'center',
        flex: 1,
        marginTop: screen.height * 0.4,
    },
})
