import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { StackNavigator } from 'react-navigation'
import { white, blue, lightGray, gray } from '../utils/colors'

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
  }
  render() {
    const { decks } = this.props

    console.log(decks)

    return (
      <View style={styles.container}>
        <View style={styles.block}></View>
          <Text style={styles.header}>UdaciCards</Text>
        <View style={styles.block}></View>

        <ScrollView>
          {Object.keys(decks).map((key) => 
            <TouchableOpacity
              style={styles.row}
              key={key}
              onPress={() => this.props.navigation.navigate(
                'ViewDeck',
                { deckId: key }
              )}
            >
              <View style={styles.rowContainer}>
                <Text style={styles.cardTitle}>{decks[key].title}</Text>
                  {decks[key].questions.length == '1' ?
                    <Text style={styles.cardNumber}>
                      {decks[key].questions.length} card
                    </Text>
                  : <Text style={styles.cardNumber}>
                      {decks[key].questions.length} cards
                    </Text>
                  }
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
  },
  block: {
    height: 20,
    backgroundColor: blue,
  },
  header: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    height: 25,
    color: white,
    backgroundColor: blue,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    flex: 1,
    backgroundColor: white,
    borderStyle: 'solid',
    borderColor: gray,
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 10,
  },
  cardTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardNumber: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
  },
})
function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(DeckList)