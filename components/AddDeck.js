import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import { white, blue, lightGray, gray } from '../utils/colors'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn} 
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}
class AddDeck extends Component {
  state = {
    title: ''
  }
  handleTitle = (input) => {
    this.setState({ title: input })
  }
  submit = () => {
    if (this.state.title !== '') {
      this.props.dispatch(addDeck({
        [this.state.title]: {
          title: this.state.title,
          questions: []
        }
      }))
      saveDeckTitle(this.state.title)
      
      this.setState(() => ({ title: '' }))
      
      this.goBack()
    } else {
      alert('Please enter a title.')
    }
  }
  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }
  render() {
    return (
      <View>
        <View style={styles.block}></View>
          <Text style={styles.header}>New Deck</Text>
        <View style={styles.block}></View>
        <View style={styles.container}>
          <Text style={styles.question}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.title}
            placeholder='Title'
            value={this.state.title}
            onChangeText={this.handleTitle} />
          <SubmitBtn onPress={this.submit} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
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
  question: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 40,
  },
  title: {
    textAlignVertical: 'center',
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: blue,
    backgroundColor: white,
    marginTop: 40,
    marginBottom: 40,
  },
  submitBtn: {
    backgroundColor: blue,
    padding: 10,
    height: 45,
    marginLeft: 100,
    marginRight: 100,
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
})

export default connect()(AddDeck)