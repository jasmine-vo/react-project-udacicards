import React from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { TabNavigator, StackNavigator } from 'react-navigation'
import ViewDeck from './components/ViewDeck'
import AddCard from './components/AddCard'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
  }
})
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: {
      header: null
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      header: null
    }
  }
})
export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}