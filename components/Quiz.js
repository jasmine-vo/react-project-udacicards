import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getDeck } from '../utils/api'
import { StackNavigator } from 'react-navigation'
import TextButton from './TextButton'

class Quiz extends Component {
  state = {
    index: 0,
    question: '',
    answer: '',
    showAnswer: false,
    numOfCards: 0,
  }
  componentDidMount() {
    const { title } = this.props.navigation.state.params
    const { index } = this.state
    
    getDeck(title)
      .then((deck) => this.setState({
        question: deck.questions[index].question,
        answer: deck.questions[index].answer,
        numOfCards: deck.questions.length
      }))
  }
  toggleAnswerQuestion = () => {
    const { showAnswer } = this.state
    
    showAnswer ?
      this.setState({ showAnswer: false })
    : this.setState({ showAnswer: true }) 
  }
  render() {
    const {
      question,
      answer,
      showAnswer,
      index,
      numOfCards
    } = this.state
    console.log(numOfCards)
    return (
      <View>
        <Text>Quiz</Text>
        <Text>{ showAnswer ? answer : question }</Text>
        <TextButton onPress={this.toggleAnswerQuestion}>
          { showAnswer ? 'Question' : 'Answer' }
        </TextButton>
        <TextButton>
          Correct
        </TextButton>
        <TextButton>
          Incorrect
        </TextButton>
        <Text>Card {index + 1} of {numOfCards}</Text>
      </View>
    )
  }
}

export default Quiz