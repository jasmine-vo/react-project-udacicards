import React from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import { TabNavigator } from 'react-navigation'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <Tabs />
        </View>
      </Provider>
    )
  }
}