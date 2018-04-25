import React, { Component } from 'react'
import { View, Text } from 'react-native'
import FlashCard from './FlashCard'
import TextButton from './TextButton'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

class ViewDeck extends Component {
  addCard = () => {
    const { deck } = this.props

    this.props.navigation.navigate(
      'AddCard',
      { title: deck.title }
    )
  }
  startQuiz = () => {
    const { deck } = this.props

    this.props.navigation.navigate(
      'Quiz',
      { title: deck.title }
    )
  }
  render() {
    const { deck } = this.props

    return (
      <View>
        <Text>View Deck</Text>
        <FlashCard
          title={deck.title}
          numOfCards={deck.questions.length}
        />
        <TextButton onPress={this.addCard}>
          Add Card
        </TextButton>
        {deck.questions.length ?
          <TextButton onPress={this.startQuiz}>
            Start Quiz
          </TextButton>
        : <Text>
            Add cards to this deck to begin quizzing yourself!
          </Text>
        }
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: state[deckId]
  }
}
export default connect(
  mapStateToProps,
)(ViewDeck)