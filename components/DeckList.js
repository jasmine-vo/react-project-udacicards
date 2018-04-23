import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as API from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { StackNavigator } from 'react-navigation'
import FlashCard from './FlashCard'

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
  }
  render() {
    const { decks } = this.props

    return (
      <View>
        <Text>DECKS</Text>
        {Object.keys(decks).map((key) => 
          <TouchableOpacity
            key={key}
            onPress={() => this.props.navigation.navigate('ViewDeck')}
          >
            <FlashCard
              title={decks[key].title}
              numOfCards={decks[key].questions.length}
            />
          </TouchableOpacity>
        )}
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
)(DeckList)