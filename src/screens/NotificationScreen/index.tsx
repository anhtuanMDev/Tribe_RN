import React from 'react'
import { View, StyleSheet } from 'react-native'
import { pallet } from '../../config/pallet'

function NotificationScreen() {
    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: pallet.background,
        flex: 1,
    },
})

export default NotificationScreen
