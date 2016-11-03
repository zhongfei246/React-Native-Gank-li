import React, { Component } from 'react'
import {
    View,
    Animated,
    Image,
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native'
import RequestUtils from './Utils/RequestUtils'
import WebViewPage from './WebViewPage'
import SnackBar from './customViews/SnackBar'
import HistoryList from './HistoryList'

export default class ClassName extends Component {
  constructor(props) {
    super(props)
    this.state = ({
        isError: false,
        isLoading: true,
        isPlaying: true,
        fadeAnimLogo: new Animated.Value(0),
        fadeAnimText0: new Animated.Value(0),
        fadeAnimText1: new Animated.Value(0),
        fadeAnimLayout: new Animated.Value(1)
      })
    }

    async componentDidMount() {
          let timing = Animated.timing
          Animated.sequence([
              timing(this.state.fadeAnimLogo, {
                  toValue: 1,
                  duration:800
                }),
              timing(this.state.fadeAnimText0, {
                  toValue:1,
                  duration:800
              }),
              timing(this.state.fadeAnimText1, {
                  toValue: 1,
                  duration: 800
              })
          ]).start(async() => {
              this.setState({
                  isPlaying:false
              })
              setTimeout(() => this._hideWelcome(), 0)
          })//上面的这一坨是开启动画代码(欢迎页或者第一页,这个时候_hideWelcome并不起作用,因为两个Boolean变量只有一个为false,最后一句起作用了)

        try {
            this.dataArray = (await RequestUtils.getDataArray()).results //await 表示拿到下一个then里resolve的参数值

            this.contentDataGroup = await RequestUtils.getContents(this.dataArray.slice(0,10))// 内容只加载一页（10条）slice()方法
            //可从已有的数组中返回选定的元素
            if (typeof this.contentDataGroup === 'undefined') { return }

            this.setState({
                isLoading:false
            })
        } catch (error) {
            console.log('request content from HomePage faile:', error)
            this.setState({
                isError:true
            })
        }
        setTimeout(() => this._hideWelcome(),0)
    }

    /**
     * 隐藏欢迎界面
     * @returns {XML}
     */
    _hideWelcome() {
        if (this.state.isLoading || this.state.isPlaying) { //只有isLoading和isPlaying都为false时才能执行下面的隐藏欢迎页的动画代码
            return
        }

        Animated.timing(
            this.state.fadeAnimLayout,
            {
                toValue: 0,
                duration: 1000
            }).start(() => {
                this.setState({
                    welcomeEnd: true
                })
            }
        )
    }

    /**
     * 欢迎动画元素
     */
    _welcome() {
        if (this.state.welcomeEnd) {
            return null
        }
        let snackBar = this.state.isError ? (<SnackBar />) : null

        return (
            <Animated.View style={[styles.indicatorWrapper, {opacity: this.state.fadeAnimLayout}]}>
                {/*图片*/}
                <Animated.View style={{
                    opacity:this.state.fadeAnimLogo,
                    marginTop: 220,
                    alignItems:'center',
                    transform: [{
                        translateX: this.state.fadeAnimLogo.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-40, 0]
                        })
                    }]
                }}>
                    <Image source={require('./images/gank_launcher.png')} style={{width: 100,height:100}}/>
                </Animated.View>

                {/*文字*/}
                <Animated.View style={{
                    opacity: this.state.fadeAnimText0,
                    position: 'absolute',
                    bottom: 50,
                    transform: [{
                        translateX: this.state.fadeAnimText0.interpolate({
                            inputRange:[0,1],
                            outputRange:[0,25]
                        }),
                    }]
                }}>
                    <Text style={styles.footerText}>Supported by: Gank.io</Text>
                </Animated.View>

                <Animated.View style={{
                    opacity: this.state.fadeAnimText1,
                    position: 'absolute',
                    bottom: 30,
                    transform: [{
                        translateX: this.state.fadeAnimText1.interpolate({
                            inputRange: [0,1],
                            outputRange: [0,25]
                        })
                    }]
                }}>
                    <Text style={styles.footerText}>Powered by: 李中飞</Text>
                </Animated.View>
                {/*出错的话就显示错误信息*/}
                {snackBar}
            </Animated.View>
        )
    }

    /**
     * 查看往期跳转函数
     */
    _skipIntoHistory(contentDataGroup, dataArray) {
        this.props.navigator.push({
            component: HistoryList,
            passProps: {contentDataGroup, dataArray}
        })
    }

    render() {

        console.log('测试')
        let content
        if (this.state.isLoading) {
            content = (<View style={{backgroundColor: 'black', flex:1}}/>)
        } else {
            let homePageContent = this.contentDataGroup[0].results
            console.log(homePageContent)
            console.log(homePageContent.休息视频[0].desc)
            console.log(homePageContent.休息视频[0].url)
            content = (<View style={styles.container}>
                {/*上部的图片和下部右下角的作者*/}
                <View style={styles.headerWraper}>
                    <Image source={{uri: homePageContent.福利[0].url}} style={{flex:1}}/>
                    <View style={styles.editorWrapper}>
                        <Text style={styles.imageEditors}>{'via' + homePageContent.福利[0].who}</Text>
                    </View>
                </View>

                {/*头部下面的View部分(整体分为上下两部分)*/}
                <View style={styles.contentWrapper}>

                    {/*中间的部分*/}
                    <TouchableHighlight style={{flex:2,marginTop:17}}
                        underlayColor={'#333333'}
                        onPress={() => {
                        this.props.navigator.push({
                            component: WebViewPage,
                            title: homePageContent.休息视频[0].desc,
                            url: homePageContent.休息视频[0].url
                        })
                    }}>
                        <View style={styles.content}>
                            <Text style={styles.videoTitle} numberOfLines={4}>{homePageContent.休息视频[0].desc}</Text>
                            <Text style={styles.dateAuthor}>{this.contentDataGroup[0].date + 'via.' +homePageContent.休息视频[0].who}</Text>
                            <Text style={styles.toVideo}>--> 去看视频~</Text>
                        </View>
                    </TouchableHighlight>

                    {/*查看往期部分*/}
                    <TouchableHighlight style={styles.buttonStyle}
                                        underlayColor={'#333333'}
                                        onPress={() => this._skipIntoHistory(this.contentDataGroup, this.dataArray)}>
                        <Text style={styles.toHistory}>查看往期</Text>
                    </TouchableHighlight>
                </View>
            </View>)
        }

      return (
          //接口出问题了,现在进不去了,即使去掉欢迎页也进不去没有数据
        <View style={styles.content} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
            {content}
            {this._welcome()}
        </View>
      )
    }
}
var styles = StyleSheet.create({
    indicatorWrapper: {
        flex: 1,
        position:'absolute',
        left:0,
        right: 0,
        bottom:0,
        top:0,
        backgroundColor: 'black'
    },
    footerText: {
        color:'#aaaaaa',
        fontSize:15
    },
    container: {
        flex:1
    },
    headerWraper: {
        flex:4
    },
    editorWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 17,
        backgroundColor:'black',
        opacity: 0.5
    },
    imageEditors: {
        fontSize: 12,
        color: 'white',
        position:'absolute',
        right:15,
        bottom:1.5
    },
    contentWrapper: {
        flex:3,
        backgroundColor:'#252528'
    },
    content: {
        flex:1,
        backgroundColor:'#434243'
    },
    videoTitle: {
        fontSize:18,
        color:'white',
        marginRight:25,
        lineHeight:21,
        position:'absolute',
        left:15
    },
    dateAuthor: {
        fontSize:14,
        color:'white',
        position:'absolute',
        left:15,
        bottom:15
    },
    toVideo: {
        color: 'white',
        fontSize: 16,
        position: 'absolute',
        right:15,
        bottom: 8
    },
    buttonStyle: {
        flex:1,
        marginTop:17,
        backgroundColor:'#434243',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:17
    },
    toHistory: {
        color:'white',
        fontSize:16
    }
})