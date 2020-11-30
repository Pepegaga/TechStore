import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, StatusBar, Button, FlatList, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import {baseUrl} from '../global'
import {useHttp} from '../hooks/http.hook'
import Card from '../components/Card'
import {useSelector} from 'react-redux'


export default ({navigation})=>{
const [search, setSearch] = useState('')
const {request} = useHttp()
const [list,setList] = useState([])
const [historyList, setHistoryList] = useState([])

const id = useSelector(state=>state.login.id)

const onSubmitHandler = async()=>{
    try {
        if(search.length>0){
            setList([])
            const data = await request(`${baseUrl}/api/search/search`, 'POST', {search})
            setList(data)
            if(data.length>0){
                await request(`${baseUrl}/api/search/addToHistory`, 'POST', {search,id})
            }
        } else {
            alert('You need to type something to search')
        }
        

    } catch (error) {
        
    }
}

const renderHistory = async()=>{
    try {
        
        const data = await request(`${baseUrl}/api/search/historyList`, 'POST', {id})
        setHistoryList(data)
    } catch (error) {
        
    }
}

useEffect(()=>{
    renderHistory()
},[])

const onClickHandler=(item)=>{
    navigation.navigate('ItemDescription',{
        item: item
    })
}

    return(
        <View style={styles.container}>
            <StatusBar barStyle='light-content'/>
            <SafeAreaView style={styles.header}>
                <TextInput value={search} style={styles.input} onChangeText={(val)=>(setSearch(val))} clearButtonMode="always"  placeholder="Search for anything"/>
                <TouchableOpacity style={styles.searchBtn} onPress={()=>onSubmitHandler()}>
                    <Text style={styles.searchBtnText}>Search</Text>
                </TouchableOpacity>
            </SafeAreaView>
                {list.length==0 ? (<>
                    <Text style={styles.text}>Search history</Text>
                    <FlatList
                        data={historyList}
                        keyExtractor={()=>Math.random()+''}
                        initialNumToRender={5}
                        renderItem={({item})=>(
                            <TouchableOpacity style={styles.historyItem} onPress={()=>{
                                setSearch(item.search_text)
                            }}>
                                <Text style={styles.historyText}>{item.search_text}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    </>
                ): (
                    <FlatList
                    style={{flex:1}}
                    data={list}
                    keyExtractor={()=>Math.random()+''}
                    renderItem={({item})=>(
                        <TouchableOpacity key={item.product_id} onPress={()=>onClickHandler(item)}>
                            <Card  product={item}/>
                        </TouchableOpacity>
                )}
                />
                )}
        </View>
    );
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        width: screen.width,
        height: 80,
        backgroundColor: colors.blue,
        flexDirection: 'row'
    },
    input: {
        width: screen.width * 0.7,
        height: 35,
        marginHorizontal: 15,
        marginTop: 15,
        paddingLeft: 10,
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    container:{
        backgroundColor: colors.background,
        flex: 1,
        
    },
    text: {
        fontSize:20,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10
    },
    searchBtn:{
        backgroundColor: colors.orange,
        height: 35,
        width: 75,
        borderRadius: 15,
        marginTop: 15,
        marginLeft: -3
    },
    searchBtnText:{
        textAlign: 'center',
        color: 'white',
        marginTop: 8,
        fontWeight: 'bold'
    },
    historyItem:{
        height: 50,
        backgroundColor: 'white',
        borderBottomColor: colors.border,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    historyText:{
        marginLeft: 20,
        marginTop: 15,
        fontWeight: '500',
        fontSize: 16
    }
})
