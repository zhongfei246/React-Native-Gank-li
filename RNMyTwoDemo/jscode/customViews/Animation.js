/**
 * 这是个加载更多的时候底部小圆球转圈动画(寓意正在加载)js,加载更多之后消失.
 */

import React, { Component , PropTypes} from 'react'
import {
    Animated
} from 'react-native'
import ScreenUtils from '../Utils/ScreenUtils'

export default class Animation extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            animatedValue:new Animated.Value(1)
        })
    }
    
    static propTypes = {
        timingLength: PropTypes.number,
        duration: PropTypes.number,
        bodyColor: PropTypes.string,
        radius: PropTypes.number
    };
    
    static defaultProps = {
        timingLength:50,
        duration:500,
        bodyColor:'white',
        radius:5
    };
    
    componentDidMount() {
        this._createAnim(this)
    }
    
    render() {
        return (
            <Animated.View
                style = {{
                    opacity:this.state.animatedValue,//透明度改变(若隐若现)
                    width: this.props.radius * 2,
                    height: this.props.radius * 2,
                    borderRadius: this.props.radius,
                    backgroundColor: this.props.bodyColor,
                    transform: [{
                        translateX: this.state.animatedValue.interpolate({
                            inputRange:[0,1],
                            outputRange:[(ScreenUtils.SCREEN_WIDTH / 2) - (this.props.timingLength / 2), (ScreenUtils.SCREEN_WIDTH / 2) + (this.props.timingLength / 2)]
                            //改变数组中输出的值可改变小圆球动画的起始位置
                        })
                    }]
                }}
            />
        )
    }

    _createAnim(that) {
        Animated.timing(this.state.animatedValue,
            {
                toValue: 0,
                duration: 500
            }
        ).start(() => {
            Animated.timing(this.state.animatedValue,
                {
                    toValue: 1,
                    duration: 500
                }).start(() => {

                    that._createAnim(that)//循环递归调用,这样就能循环展示动画了
                })
            })
    }
}