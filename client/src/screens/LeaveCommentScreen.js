import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native'
import { Header, Icon } from 'react-native-elements'
import colors from '../constants/colors'
import { FontAwesome } from '@expo/vector-icons'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'

export default ({ route, navigation }) => {
    const { id } = route.params
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const [pluses, setPluses] = useState('')
    const [minuses, setMinuses] = useState('')

    const { request } = useHttp()

    let date = new Date()
    date = JSON.stringify(date)
    date = date.slice(1, -15)
    date = JSON.stringify(date)

    const addComment = async () => {
        if (
            name == '' ||
            title == '' ||
            comment == '' ||
            pluses == '' ||
            minuses == ''
        ) {
            alert('All fields should be filled')
        } else {
            try {
                await request(`${baseUrl}/api/comments/addComment`, 'POST', {
                    name,
                    title,
                    comment,
                    rating,
                    pluses,
                    minuses,
                    date,
                    id,
                })
                navigation.navigate('ItemDescription')
            } catch (error) {}
        }
    }

    const rateHandler = (rating) => {
        switch (rating) {
            case 0:
                return (
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ marginLeft: 35 }}
                            onPress={() => {
                                setRating(1), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(2), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(3), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(4), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(5), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                    </View>
                )
            case 1:
                return (
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ marginLeft: 35 }}
                            onPress={() => {
                                setRating(1), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(2), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(3), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(4), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(5), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                    </View>
                )
            case 2:
                return (
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ marginLeft: 35 }}
                            onPress={() => {
                                setRating(1), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(2), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(3), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(4), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(5), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                    </View>
                )
            case 3:
                return (
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ marginLeft: 35 }}
                            onPress={() => {
                                setRating(1), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(2), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(3), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(4), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(5), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                    </View>
                )
            case 4:
                return (
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ marginLeft: 35 }}
                            onPress={() => {
                                setRating(1), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(2), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(3), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(4), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(5), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star-o"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                    </View>
                )
            case 5:
                return (
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ marginLeft: 35 }}
                            onPress={() => {
                                setRating(1), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(2), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(3), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(4), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                setRating(5), rateHandler(rating)
                            }}
                        >
                            <FontAwesome
                                name="star"
                                size={48}
                                color={colors.orange}
                            />
                        </TouchableOpacity>
                    </View>
                )
        }

        setRated(true)
    }

    const initialRate = () => {}

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ backgroundColor: colors.blue, height: 70 }}
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
                    <Text style={styles.headerText}>Leave comment</Text>
                }
            />
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView>
                    <Text style={styles.text}>Introduce yourself</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(val) => setName(val)}
                        placeholder="Your name"
                    />
                    <Text style={styles.text}>Title</Text>
                    <TextInput
                        style={styles.input}
                        string={title}
                        onChangeText={(val) => setTitle(val)}
                        placeholder="Title"
                    />
                    <Text style={styles.text}>Your comment</Text>
                    <TextInput
                        multiline={true}
                        style={styles.commentInput}
                        string={comment}
                        onChangeText={(val) => setComment(val)}
                        placeholder="Your comment"
                    />
                    <Text style={styles.text}>Advantages</Text>
                    <TextInput
                        style={styles.input}
                        string={pluses}
                        onChangeText={(val) => setPluses(val)}
                        placeholder="Advantages"
                    />
                    <Text style={styles.text}>Disadvantages</Text>
                    <TextInput
                        style={styles.input}
                        string={minuses}
                        onChangeText={(val) => setMinuses(val)}
                        placeholder="Disadvantages"
                    />
                    <Text style={styles.text}>Rate</Text>
                    {rateHandler(rating)}
                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                        <Text>You need to fill in all fields.</Text>
                        <Text>
                            Before publication, all comments are checked by the
                            administrator.
                        </Text>
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
            </KeyboardAvoidingView>
            <TouchableOpacity
                style={styles.commentBtn}
                onPress={() => addComment()}
            >
                <Text style={styles.commentText}>Leave comment</Text>
            </TouchableOpacity>
        </View>
    )
}

const screen = Dimensions.get('window')

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
    input: {
        marginTop: 15,
        marginHorizontal: 18,
        width: screen.width * 0.9,
        height: 50,
        backgroundColor: 'white',
        fontSize: 18,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: colors.blue,
        paddingHorizontal: 20,
    },
    text: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    commentInput: {
        marginTop: 15,
        marginHorizontal: 18,
        width: screen.width * 0.9,
        height: 150,
        backgroundColor: 'white',
        fontSize: 18,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: colors.blue,
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    commentBtn: {
        width: screen.width * 0.8,
        height: 50,
        backgroundColor: colors.blue,
        position: 'absolute',
        marginTop: screen.height * 0.9,
        marginLeft: 35,
        borderRadius: 20,
    },
    commentText: {
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
})
