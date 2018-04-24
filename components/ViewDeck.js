import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getDeck, addCardToDeck } from '../utils/api'
import FlashCard from './FlashCard'
import TextButton from './TextButton'
import { StackNavigator } from 'react-navigation'

class ViewDeck extends Component {
  state = {
    title: '',
    length: '',
  }
  componentDidMount() {
    const { deckId } = this.props.navigation.state.params
    
    getDeck(deckId)
      .then((deck) => this.setState({
        title: deck.title,
        length: deck.questions.length
      }))
  }
  addCard = () => {this.props.navigation.navigate(
    'AddCard',
    { title: this.state.title }
  )}
  startQuiz = () => {
    console.log('start quiz pressed')
  }
  render() {
    const { title, length } = this.state

    return (
      <View>
        <Text>View Deck</Text>
        <FlashCard
          title={title}
          numOfCards={length}
        />
        <TextButton onPress={this.addCard}>
          Add Card
        </TextButton>
        <TextButton onPress={this.startQuiz}>
          Start Quiz
        </TextButton>
      </View>
    )
  }
}

export default ViewDeck