import React, { Component } from 'react'
import { View, Text } from 'react-native'
import * as API from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'

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
          <View key={key}>
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