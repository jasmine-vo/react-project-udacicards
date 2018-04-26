import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gray, white, blue } from '../utils/colors'

export default function FlashCard ({ title, numOfCards }) {
  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{title}</Text>
        {numOfCards == '1' ?
          <Text style={styles.cardNumber}>{numOfCards} card</Text>
        : <Text style={styles.cardNumber}>{numOfCards} cards</Text>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    borderStyle: 'solid',
    borderColor: gray,
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 10,
  },
  cardTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardNumber: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
  },
})