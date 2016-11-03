/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Navigator,
    BackAndroid
} from 'react-native';
import HomePage from './jscode/HomePage'

export default class RNMyTwoDemo extends Component {

  constructor(props) {
    super(props)
    this.handleBack = this._handleBack.bind(this)
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress',this.handleBack)
  }

  _handleBack() {
    var navigator = this.navigator
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop()
      return true
    }
    return false
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='transparent'
          translucent
        />
        <Navigator
          ref={component => this.navigator = component}
          initialRoute={{
          component: HomePage
          }}
          renderScene={(route, navigator) => {
            return <route.component navigator={navigator} {...route} {...route.passProps}/>
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('RNMyTwoDemo', () => RNMyTwoDemo);
