import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import {
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    StatusBar,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import Comment from '../components/Comment'
import { Header, Icon } from 'react-native-elements'
import colors from '../constants/colors'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default ({ route, navigation }) => {
    const { prodId } = route.params
    const { request } = useHttp()
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    const renderList = async () => {
        try {
            const data = await request(
                `${baseUrl}/api/comments/commentsList`,
                'POST',
                { prodId }
            )
            if (data.length > 0) {
                setList(data)
                setIsLoading(false)
            } else {
                setIsEmpty(true)
            }
        } catch (error) {}
    }

    useEffect(() => {
        renderList()
    }, [])

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
                        <Text style={styles.headerText}>Comments</Text>
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
                        <Text style={styles.headerText}>Comments</Text>
                    }
                />
                {!isEmpty ? (
                    <ScrollView>
                        {list.map((item) => {
                            return (
                                <TouchableOpacity key={Math.random()}>
                                    <Comment comment={item} />
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                ) : (
                    <ScrollView>
                        <View style={{ alignItems: 'center', marginTop: 130 }}>
                            <MaterialCommunityIcons
                                name="comment-remove"
                                size={170}
                                color="gray"
                            />
                            <Text style={{ fontSize: 20, color: 'gray' }}>
                                There is no comments yet
                            </Text>
                            <Text style={{ color: 'gray' }}>
                                Leave your comment first!
                            </Text>
                        </View>
                    </ScrollView>
                )}
                <TouchableOpacity
                    style={styles.commentBtn}
                    onPress={() =>
                        navigation.navigate('LeaveCommentScreen', {
                            id: prodId,
                        })
                    }
                >
                    <Text style={styles.commentText}>Leave comment</Text>
                </TouchableOpacity>
            </View>
        )
    }
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
    loadingComponent: {
        textAlign: 'center',
        flex: 1,
        marginTop: screen.height * 0.4,
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
