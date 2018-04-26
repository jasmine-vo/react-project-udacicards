import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getDeck } from '../utils/api'
import { StackNavigator } from 'react-navigation'
import TextButton from './TextButton'
import {
  round,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'

class Quiz extends Component {
  state = {
    deck: '',
    index: 0,
    question: '',
    answer: '',
    showAnswer: false,
    score: 0,
    showScore: false,
  }
  componentDidMount() {
    const { title } = this.props.navigation.state.params
    const { index } = this.state
    
    getDeck(title)
      .then((deck) => this.setState({
        deck: deck.questions,
        question: deck.questions[index].question,
        answer: deck.questions[index].answer,
      }))
  }
  toggleAnswerQuestion = () => {
    const { showAnswer } = this.state
    
    showAnswer ?
      this.setState({ showAnswer: false })
    : this.setState({ showAnswer: true })
  }
  handleCorrect = () => {
    const { deck, index, score } = this.state
    const nextIndex = index + 1
    const newScore = score + 1

    if (nextIndex === deck.length) {
      this.setState({
        showScore: true,
        score: newScore, })
      clearLocalNotification()
        .then(setLocalNotification)
    } else {
      this.setState({
        index: nextIndex,
        question: deck[nextIndex].question,
        answer: deck[nextIndex].answer,
        score: newScore,
      })
    }
    console.log(score)
  }
  handleIncorrect = () => {
    const { deck, index } = this.state
    const nextIndex = index + 1

    if (nextIndex === deck.length) {
      this.setState({ showScore: true })
      clearLocalNotification()
        .then(setLocalNotification)
    } else {
      this.setState({
        index: nextIndex,
        question: deck[nextIndex].question,
        answer: deck[nextIndex].answer
      })
    }
  }
  render() {
    const {
      question,
      answer,
      showAnswer,
      index,
      deck,
      showScore,
      score
    } = this.state
    return (
      <View>
        <Text>Quiz</Text>
        {!showScore ?
          <View>
            <Text>{ showAnswer ? answer : question }</Text>
            <TextButton onPress={this.toggleAnswerQuestion}>
              { showAnswer ? 'Question' : 'Answer' }
            </TextButton>
            <TextButton onPress={this.handleCorrect}>
              Correct
            </TextButton>
            <TextButton onPress={this.handleIncorrect}>
              Incorrect
            </TextButton>
            <Text>Card {index + 1} of {deck.length}</Text>
          </View>
        : <View>
            <Text>Score</Text>
            <Text>{round((score / deck.length)*100, 2)}%</Text>
            <Text>You got {score} out of {deck.length} right!</Text>
          </View>
        }
      </View>
    )
  }
}

export default Quiz