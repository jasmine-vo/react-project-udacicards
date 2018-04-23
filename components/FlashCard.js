import React from 'react'
import { View, Text } from 'react-native'

export default function FlashCard ({ title, numOfCards }) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{numOfCards} cards</Text>
    </View>
  )
}