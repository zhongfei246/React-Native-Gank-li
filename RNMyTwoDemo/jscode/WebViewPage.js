import React, { Component } from 'react'
import {
    View,
    WebView
} from 'react-native'
import NavigationBar from 'react-native-navigationbar'

export default class WebViewPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={this.props.title}
                    barTintColor='white'
                    backHidden={false}
                    backFunc={() => {
                     this.props.navigator.pop()
                    }}
                />
                <WebView
                    source={{uri:this.props.url}}
                />
            </View>
        )
    }
}
