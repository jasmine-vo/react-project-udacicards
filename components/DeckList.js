import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getDecks } from '../utils/api'

class DeckList extends Component {
  componentDidMount () {
    getDecks().then((data) => console.log(data))
  }
  render() {
    return (
      <View>
        <Text>DECKS</Text>
      </View>
    )
  }
}
export default DeckList