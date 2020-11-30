import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, StatusBar} from 'react-native'
import {Header, Icon} from 'react-native-elements'
import colors from "../constants/colors";
import Swiper from '../components/Swiper'
import {ReviewItem} from '../components/ReviewItem'
import {RowSeparator} from '../components/RowItem'
import {FontAwesome} from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux'
import {useHttp} from '../hooks/http.hook'
import {baseUrl} from '../global'
import {addToCart, rerenderCart} from '../redux/actions'


const screen = Dimensions.get('window');

export default function ItemDescription({route, navigation}) {

    const {item} = route.params
    const {category} = route.params
    const prodId = item.product_id
    const id = item.product_id
    const userId = useSelector(state=>state.login.id)
    const {request} = useHttp()
    const dispatch = useDispatch()
    const rerender = Math.random()

    const [favourite, setFavourite] = useState(false);
    const [rating, setRating] = useState(0)
    const [comments, setComments] = useState(0)

    const addToCartHandler = async()=>{
        try {
            const flag = await request(`${baseUrl}/api/cart/addToCart`,'POST', {userId,prodId})
            console.log(flag.flag)
            if(flag.flag){
                console.log(rerender)
                dispatch(rerenderCart(rerender))
                const rerender2 = useSelector(state=>state.cart.rerenderTemp)
                alert(rerender2)
            }
        } catch (error) {
            
        }
    }

    const addToFavouriteHandler = async()=>{
        try {
            
           const flag =  await request(`${baseUrl}/api/favourite/addToFavourite`,'POST', {userId,prodId})
           if(flag.flag>0){
               setFavourite(false)
           }else{
               setFavourite(true)
           }

        } catch (error) {
            
        }
    }

    const isFavouriteHandler = async()=>{
        try {
            
            const fav = await request(`${baseUrl}/api/favourite/isFavourite`,'POST', {userId,prodId})
            if(fav.flag>0){
                setFavourite(true)
            }else{
                setFavourite(false)
            }
        } catch (error) {
            
        }
    }
    const countRaiting=async()=>{
        try {
            
            const data = await request(`${baseUrl}/api/products/rating`,'POST',{id})
            setRating(data.avg)
            const comments = await request(`${baseUrl}/api/comments/counter`,'POST',{id})
            setComments(comments)

        } catch (error) {
            
        }
    }
    
    useEffect(()=>{
        countRaiting()
    },[])

    useEffect(()=>{
        isFavouriteHandler()
    },[])


    return (
        <View>
            <StatusBar barStyle='light-content'/>
            <Header containerStyle={{backgroundColor: colors.blue, height: 70}}
                leftComponent={<Icon style={styles.backButton} name="chevron-left" color='white' size={48} onPress={()=>navigation.goBack()} />}
                centerComponent={<Text style={styles.headerText}>{item.product_name}</Text>}
            />
            
        <ScrollView>
            {/* <Swiper assets={data.Images}/> */}
                <ReviewItem rating={rating} comments={comments} onPress={()=>navigation.navigate('CommentsScreen',{
                    prodId: item.product_id
                })}/>
            <RowSeparator/>
            <View style={styles.content}>
                <Text style={styles.title}>{item.product_title}</Text>
                <Text style={styles.description}>{item.product_description}</Text>
            </View>
            <RowSeparator/>
            <View style={styles.buttonsArea}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.cost}>{`${item.product_cost} p.`}</Text>
                            <TouchableOpacity onPress={()=>addToFavouriteHandler()}>
                            <View style={styles.star}>
                                {favourite ? (
                                <View>
                                    <FontAwesome name="star" size={24} color={colors.orange}/>
                                </View>
                                ) :(
                                    <View>
                                    <FontAwesome name="star-o" size={24} color={colors.orange}/>
                                </View>
                                )
                                }
                            </View>
                            </TouchableOpacity>
                        </View>
                    <View>
                        <TouchableOpacity style={styles.cartButton} onPress={()=>addToCartHandler()}>
                            <Text style={styles.buttonText}>Add in cart</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            <RowSeparator/>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginVertical: 15}}>
                        Description
                    </Text>
                </View>
                    <View style={styles.descriptionItem}>
                        <Text style={{marginLeft: 20, color: 'gray', fontSize: 17, marginTop: 15}}>Type</Text>
                        <Text  style={{marginLeft: 20, fontSize: 17, marginTop: 15, marginRight: 20}}>{item.category}</Text>
                    </View>
                    <View style={styles.descriptionItem}>
                        <Text style={{marginLeft: 20, color: 'gray', fontSize: 17, marginTop: 15}}>Os</Text>
                        <Text  style={{marginLeft: 20, fontSize: 17, marginTop: 15, marginRight: 20}}>{item.product_os}</Text>
                    </View>
                    <View style={styles.descriptionItem}>
                        <Text style={{marginLeft: 20, color: 'gray', fontSize: 17, marginTop: 15}}>Display size</Text>
                        <Text  style={{marginLeft: 20, fontSize: 17, marginTop: 15, marginRight: 20}}>{item.product_size}</Text>
                    </View>
                    <View style={styles.descriptionItem}>
                        <Text style={{marginLeft: 20, color: 'gray', fontSize: 17, marginTop: 15}}>Display resolution</Text>
                        <Text  style={{marginLeft: 20, fontSize: 17, marginTop: 15, marginRight: 20}}>{item.product_resolution}</Text>
                    </View>
                    {!category==="TV" ? (<>
                    <View style={styles.descriptionItem}>
                        <Text style={{marginLeft: 20, color: 'gray', fontSize: 17, marginTop: 15}}>RAM</Text>
                        <Text  style={{marginLeft: 20, fontSize: 17, marginTop: 15, marginRight: 20}}>{item.product_ram}</Text>
                    </View>
                    <View style={styles.descriptionItem}>
                        <Text style={{marginLeft: 20, color: 'gray', fontSize: 17, marginTop: 15}}>Memory</Text>
                        <Text  style={{marginLeft: 20, fontSize: 17, marginTop: 15, marginRight: 20}}>{item.product_memory}</Text>
                    </View>
                    <View style={styles.descriptionItem}>
                        <Text style={{marginLeft: 20, color: 'gray', fontSize: 17, marginTop: 15}}>Camera</Text>
                        <Text  style={{marginLeft: 20, fontSize: 17, marginTop: 15, marginRight: 20}}>{item.product_camera}</Text>
                    </View>
                    <View style={styles.descriptionItem}>
                        <Text style={{marginLeft: 20, color: 'gray', fontSize: 17, marginTop: 15}}>SIM</Text>
                        <Text  style={{marginLeft: 20, fontSize: 17, marginTop: 15, marginRight: 20}}>{item.product_sim}</Text>
                    </View>
                    </>):(
                        <>
                        <View style={styles.descriptionItem}>
                            <Text style={{marginLeft: 20, color: 'gray', fontSize: 17, marginTop: 15}}>Processor</Text>
                            <Text  style={{marginLeft: 20, fontSize: 17, marginTop: 15, marginRight: 20}}>{item.product_ram}</Text>
                        </View>
                        <View style={styles.descriptionItem}>
                            <Text style={{marginLeft: 20, color: 'gray', fontSize: 17, marginTop: 15}}>Matrix frequency</Text>
                            <Text  style={{marginLeft: 20, fontSize: 17, marginTop: 15, marginRight: 20}}>{item.product_memory}</Text>
                        </View>
                        </>
                    )}
                    
            <View style={{height: 80, backgroundColor: 'white'}}></View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: screen.width,
        height: 70,
        backgroundColor: colors.blue,
    },
    headerText: {
        textAlign: 'center',
        marginTop: 0,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    backButton: {
        marginLeft: -15
    },
    
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 5,
    },
    description: {
        fontSize: 16,
        marginLeft: 15,
        marginTop: 5,
    },
    content: {
        height: 160,
        backgroundColor: 'white',
    },
    buttonsArea: {
        width: screen.width,
        height: 140,
        backgroundColor: 'white',
        
    },
    cartButton: {
        width: screen.width * 0.9,
        height: 60,
        backgroundColor: colors.orange,
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        marginLeft: 110,
        marginVertical: 13,
        fontWeight: 'bold',
    },
    cost: {
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
    },
    star: {
        marginHorizontal: 12,
        marginVertical: 15,
        marginLeft: 180,
    },
    descriptionItem: {
        width: screen.width,
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})