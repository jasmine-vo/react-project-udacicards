import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, blue } from '../utils/colors'

export default function TextButton ({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
      <Text style={styles.submitBtnText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: blue,
    padding: 10,
    height: 45,
    width: 100,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
})