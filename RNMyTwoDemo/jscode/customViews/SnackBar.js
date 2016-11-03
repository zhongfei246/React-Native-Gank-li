import React, { Component , PropTypes} from 'react'
import {
    Animated,
    StyleSheet,
    Text
} from 'react-native'

export default class SnackBar extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            showValue: new Animated.Value(0)
        })
    }

    static propsTypes = {
        stayTime: PropTypes.number,
        bodyColor: PropTypes.string,
        height: PropTypes.number,
        message: PropTypes.string
    };

    static defaultsProps = {
        stayTime:1500,
        bodyColor:'red',
        height:40,
        message:'Something is error'
    };

    componentDidMount () {
        this._showBar()
    }

    render() {
        return (
            <Animated.View style={[styles.container, {opacity: this.state.showValue,height: this.props.height,backgroundColor: this.props.bodyColor}]} >
                <Text>{this.props.message}</Text>
            </Animated.View>
        )
    }

    /**
     * 自定义方法区 (显示Bar)
     */
    _showBar() {
        Animated.timing(this.state.showValue, {
            toValue: 1,
            duration: 550
        }).start(() => {
            setTimeout(() => this._hideBar(), this.props.stayTime)
        })
    }

    //隐藏Bar
    _hideBar() {
        Animated.timing(this.state.showValue, {
            toValue: 0,
            duration: 550
        }).start()
    }
}

let styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        bottom:0,
        left:0,
        right:0
    }
})