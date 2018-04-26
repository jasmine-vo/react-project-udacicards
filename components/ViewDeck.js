import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FlashCard from './FlashCard'
import TextButton from './TextButton'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { white, blue, lightGray, gray } from '../utils/colors'

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
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.cardTitle}>{deck.title}</Text>
          {deck.questions.length == '1' ?
            <Text style={styles.cardNumber}>
              {deck.questions.length} card
            </Text>
          : <Text style={styles.cardNumber}>
              {deck.questions.length} cards
            </Text>
          }
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.addCardBtn} onPress={this.addCard}>
            <Text style={styles.addCardBtnText}>Add Card</Text>
          </TouchableOpacity>
          {deck.questions.length ?
          <TouchableOpacity style={styles.startQuizBtn} onPress={this.startQuiz}>
            <Text style={styles.startQuizBtnText}>Start Quiz</Text>
          </TouchableOpacity>
          : <Text>
              Add cards to this deck to begin quizzing yourself!
            </Text>
          }
        </View>
        <View style={styles.rowContainer}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: white,
  },
  cardTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    padding: 20,
  },
  cardNumber: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
  },
  rowContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: white,
    alignItems: 'center',
  },
  addCardBtn: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: blue,
    padding: 10,
    height: 45,
    margin: 20,
  },
  addCardBtnText: {
    fontSize: 18,
    textAlign: 'center',
  },
  startQuizBtn: {
    backgroundColor: blue,
    padding: 10,
    height: 45,
    margin: 20,
  },
  startQuizBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: state[deckId]
  }
}
export default connect(
  mapStateToProps,
)(ViewDeck)