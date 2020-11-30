import React from 'react'
import {
    SafeAreaView,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    View,
} from 'react-native'

const Swiper = ({ assets }) => {
    return (
        <SafeAreaView style={styles.imagesContainer}>
            <ScrollView
                snapToInterval={screen.width}
                decelerationRate="fast"
                horizontal
            >
                {assets.map((source) => (
                    <View key={source}>
                        <Image style={styles.images} {...{ source }} />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Swiper

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
    imagesContainer: {
        height: 260,
        width: screen.width,
        backgroundColor: 'white',
    },
    images: {
        marginHorizontal: 100,
        marginTop: 15,
        height: 230,
        width: 170,
    },
})
