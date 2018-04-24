import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  handleQuestion = (input) => {
    this.setState({ question: input })
  }
  handleAnswer = (input) => {
    this.setState({ answer: input })
  }
  submit = () => {
    const { title } = this.props.navigation.state.params
    const { question, answer } = this.state
    const { dispatch } = this.props
    const card = {
      question: question,
      answer: answer
    }

    if (question !== '' && answer !== '') {
      addCardToDeck(title, card)
        .then((updatedDecks) => dispatch(receiveDecks(updatedDecks)))
      
      this.setState(() => ({
        question: '',
        answer: ''
      }))
      
    } else {
      alert('Please complete all fields.')
    }
  }
  render() {
    return (
      <View>
        <Text>ADD CARD</Text>
        <TextInput
          placeholder='Question'
          value={this.state.question}
          onChangeText={this.handleQuestion} />
        <TextInput
          placeholder='Answer'
          value={this.state.answer}
          onChangeText={this.handleAnswer} />
        <TextButton onPress={this.submit}>
          SUBMIT
        </TextButton>
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(AddCard)