import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getDeck } from '../utils/api'
import FlashCard from './FlashCard'
import TextButton from './TextButton'

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
  addCard = () => {
    console.log('add card pressed')
  }
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