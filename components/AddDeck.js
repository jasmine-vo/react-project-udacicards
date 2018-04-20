import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
        <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}
class AddDeck extends Component {
  state = {
    title: ''
  }
  handleTitle = (input) => {
    this.setState({ title: input })
  }
  submit = () => {
    this.state.title === '' ?
      alert('Please enter a title.')
    : alert('New deck created!')
  }
  render() {
    return (
      <View>
        <Text>NEW DECK</Text>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          placeholder='Title'
          onChangeText={this.handleTitle} />
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

export default AddDeck