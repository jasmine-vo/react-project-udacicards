import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getDeck } from '../utils/api'
import { StackNavigator } from 'react-navigation'

class Quiz extends Component {
  state = {
    deck: ''
  }
  componentDidMount() {
    const { deckId } = this.props.navigation.state.params
    
    getDeck(deckId)
      .then((deck) => this.setState({
        deck: deck
      }))
    console.log(this.state.deck)
  }
  render() {
    return (
      <View>
        <Text>Quiz</Text>
      </View>
    )
  }
}

export default Quiz