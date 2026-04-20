import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { pallet } from '../../config/pallet'

function HomeScreen() {
  return (
    <SafeAreaView style={[styles.container]}>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: pallet.background,
    flex: 1,
  },
})

export default HomeScreen
