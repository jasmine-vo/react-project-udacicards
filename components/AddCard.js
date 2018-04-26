import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { white, blue } from '../utils/colors'

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
    const { title } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add a new card for {title}</Text>
        <TextInput
          style={styles.form}
          placeholder='Question'
          value={this.state.question}
          onChangeText={this.handleQuestion} />
        <TextInput
          style={styles.form}
          placeholder='Answer'
          value={this.state.answer}
          onChangeText={this.handleAnswer} />
        <TouchableOpacity style={styles.submitBtn} onPress={this.submit}>
          <Text style={styles.submitBtnText}>Submit!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 40,
    paddingBottom: 40,
  },
  form: {
    textAlignVertical: 'center',
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: blue,
    backgroundColor: white,
    marginBottom: 40,
  },
  submitBtn: {
    backgroundColor: blue,
    padding: 10,
    height: 45,
    marginLeft: 100,
    marginRight: 100,
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
})

function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(AddCard)