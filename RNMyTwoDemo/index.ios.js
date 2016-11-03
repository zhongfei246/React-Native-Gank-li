/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native'
import HomePage from './jscode/HomePage'

class RNMyTwoDemo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navigator style = {styles.container}
          initialRoute={{
              component: HomePage
          }}
          renderScene={(route,navigator) => {

              return <route.component navigator={navigator} {...route} {...route.passProps} />
            }
          }
      />
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('RNMyTwoDemo', () => RNMyTwoDemo);
