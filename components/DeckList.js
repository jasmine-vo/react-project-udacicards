import React, { Component } from 'react'
import { View, Text } from 'react-native'
import * as API from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class DeckList extends Component {
  render() {
    const { decks } = this.props
    console.log(decks['React'].questions)
    return (
      <View>
        <Text>DECKS</Text>
        {Object.keys(decks).map((key) => 
          <View>
            <Text>{decks[key].title}</Text>
            <Text>{decks[key].questions.length} cards</Text>
          </View>
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