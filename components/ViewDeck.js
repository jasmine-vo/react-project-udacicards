import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getDeck, addCardToDeck } from '../utils/api'
import FlashCard from './FlashCard'
import TextButton from './TextButton'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

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
  startQuiz = () => {this.props.navigation.navigate(
    'Quiz',
    { title: this.state.title }
  )}
  render() {
    const { title, length } = this.state
    const deck = this.props.decks[title]
    console.log(deck)

    return (
      <View>
        <Text>View Deck</Text>
        <FlashCard
          title={deck ? deck.title : title}
          numOfCards={deck ? deck.questions.length : length}
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

function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(ViewDeck)