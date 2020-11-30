import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView, Text } from 'react-native'
import colors from '../constants/colors'

export default ({ rating, comments }) => {
    const starsNumber = (rating) => {
        if (rating <= 1) {
            return (
                <>
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                </>
            )
        } else if (rating >= 1 && rating < 1.5) {
            return (
                <>
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                </>
            )
        } else if (rating >= 1.5 && rating < 2) {
            return (
                <>
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome
                        name="star-half-full"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                </>
            )
        } else if (rating >= 2 && rating < 2.5) {
            return (
                <>
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                </>
            )
        } else if (rating >= 2.5 && rating < 3) {
            return (
                <>
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome
                        name="star-half-full"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                </>
            )
        } else if (rating >= 3 && rating < 3.5) {
            return (
                <>
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                </>
            )
        } else if (rating >= 3.5 && rating < 4) {
            return (
                <>
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome
                        name="star-half-full"
                        size={24}
                        color={colors.orange}
                    />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                </>
            )
        } else if (rating >= 4 && rating < 4.5) {
            return (
                <>
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome
                        name="star-o"
                        size={24}
                        color={colors.orange}
                    />
                </>
            )
        } else if (rating >= 4.5 && rating < 5) {
            return (
                <>
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome
                        name="star-half-full"
                        size={24}
                        color={colors.orange}
                    />
                </>
            )
        } else if ((rating = 5)) {
            return (
                <>
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                    <FontAwesome name="star" size={24} color={colors.orange} />
                </>
            )
        }
    }

    if (comments) {
        return (
            <SafeAreaView style={{ flexDirection: 'row' }}>
                {starsNumber(rating)}
                <Text style={{ color: 'gray', marginLeft: 5, marginTop: 5 }}>
                    ({comments})
                </Text>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={{ flexDirection: 'row' }}>
                {starsNumber(rating)}
            </SafeAreaView>
        )
    }
}
