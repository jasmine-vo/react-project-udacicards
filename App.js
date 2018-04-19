import React from 'react'
import { View } from 'react-native'
import DeckList from './components/DeckList'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <DeckList />
        </View>
      </Provider>
    )
  }
}