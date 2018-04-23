import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getDeck } from '../utils/api'
import { receiveDeck } from '../actions'
import FlashCard from './FlashCard'

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
  render() {
    const { title, length } = this.state

    return (
      <View>
        <Text>View Deck</Text>
          <FlashCard
            title={title}
            numOfCards={length}
          />
      </View>
    )
  }
}

export default ViewDeck