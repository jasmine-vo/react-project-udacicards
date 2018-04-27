import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'
import { StackNavigator } from 'react-navigation'
import TextButton from './TextButton'
import {
  round,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'
import { white, blue, lightGray } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

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
  startOver = () => {
    this.setState({
      index: 0,
      score:0,
      showScore: false,
      showAnswer: false
    })
  }
  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
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
    const { title } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title} Quiz</Text>
        {!showScore ?
          <View>
            <Text style={styles.question}>{ showAnswer ? answer : question }</Text>
            <TouchableOpacity
              style={styles.toggleBtn}
              onPress={this.toggleAnswerQuestion}
            >
              <Text style={styles.submitBtnText}>
                { showAnswer ? 'Show Question' : 'Show Answer' }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.blueBtn}
              onPress={this.handleCorrect}
            >
              <Text style={styles.submitBtnText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={this.handleIncorrect}
            >
              <Text style={styles.submitBtnText}>Incorrect</Text>
            </TouchableOpacity>
            <Text>Card {index + 1} of {deck.length}</Text>
          </View>
        : <View>
            <Text style={styles.subtitle}>Score</Text>
            <Text style={styles.subtitle}>{round((score / deck.length)*100, 2)}%</Text>
            <Text style={styles.subtitle}>You got {score} out of {deck.length} right!</Text>
            <TouchableOpacity
              style={styles.blueBtn}
              onPress={this.startOver}
            >
              <Text style={styles.submitBtnText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={this.goBack}
            >
              <Text style={styles.submitBtnText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: white,
  },
  title: {
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 20,
  },
  question: {
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
  toggleBtn: {
    padding: 10,
    height: 45,
    margin: 20,
  },
  blueBtn: {
    backgroundColor: blue,
    padding: 10,
    height: 45,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 10,
  },
  outlineBtn: {
    backgroundColor: lightGray,
    padding: 10,
    height: 45,
    marginLeft: 100,
    marginRight: 100,
  },
  submitBtnText: {
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
})

export default Quiz