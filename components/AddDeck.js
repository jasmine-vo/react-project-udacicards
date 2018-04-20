import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

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
    this.state.title === ''
      ? alert('Please enter a title.')
      : this.props.dispatch(addDeck({
          [this.state.title]: {
            title: this.state.title,
            questions: []
          }
        }))
    this.setState(() => ({ title: '' }))
    this.goBack()
  }
  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
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

export default connect()(AddDeck)