import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'

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
    if (this.state.title !== '') {
      this.props.dispatch(addDeck({
        [this.state.title]: {
          title: this.state.title,
          questions: []
        }
      }))
      saveDeckTitle(this.state.title)
      
      this.setState(() => ({ title: '' }))
      
      this.goBack()
    } else {
      alert('Please enter a title.')
    }
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
          value={this.state.title}
          onChangeText={this.handleTitle} />
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

export default connect()(AddDeck)