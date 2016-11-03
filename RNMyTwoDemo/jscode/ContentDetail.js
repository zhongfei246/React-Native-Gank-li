import React, { Component } from 'react'
import {
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    View
} from 'react-native'
import NavigationBar from 'react-native-navigationbar'
import WebViewPage from './WebViewPage'

const HEADER_HEIGHT=400

export default class ContentDetail extends Component {

    constructor(props) {
        super(props)
        this.state={
            opacity:0
        }
    }
    render() {

        let contentData = this.props.contentData
        let thumbnail = (typeof  contentData.results.福利[0].url !== 'undefined') ? contentData.results.福利[0].url : ''
        //流式布局,ScrollView在NavigationBar的上面这样保证图片直接从顶部开始
        return (
            <View needsOffscreenAlphaCompositing renderToHardwareTextureAndroid style={styles.container}>

                <ScrollView
                   onScroll={this.onScroll.bind(this)}
                   scrollEventThrottle={5}
                   bounces={false}>
                    <Image source={{uri:thumbnail}} style={styles.header_image}/>
                    <View style={{flex:1}}>
                        {this._getViews(contentData)}
                    </View>
                </ScrollView>
                {/*这个返回箭头的创建其实是个view,然后设置左.底边宽度和颜色再加个旋转45度即可外形像箭头*/}
                <View style={styles.backIcon}/>

                <NavigationBar title={contentData.date}
                               backHidden={false}
                               backIcon={true}
                               barTintColor='white'
                               barOpacity= {this.state.opacity}
                               barStyle= {styles.navbar}
                               backFunc={() => {
                                     this.props.navigator.pop()
                               }}
                />
            </View>
        )
    }

    onScroll(event) {
        const MAX = HEADER_HEIGHT -64
        let y = event.nativeEvent.contentOffset.y
        if (y > MAX) {
            y = MAX
        }
        const opacity = y / MAX
        this.setState({
            opacity:opacity
        })
    }

    /**
     * 下部的view
     * @private
     */
    _getViews(contentData) {
        return contentData.category.map((category, index) => (
            <View key={index} style={styles.item_container}>
                <Text style={styles.category}>{category}</Text>
                {this.getItems(contentData,category)}
            </View>
        ))
    }

    /**
     * 下面的标题下内容
     * @param contentData
     * @param category
     */
    getItems(contentData,category) {
        console.log(contentData.results[category])
        return contentData.results[category].map((item, index) => (

            <TouchableHighlight style={styles.titleWrapper}
                                    underlayColor='#aaaaaa'
                                    key={index}
                                    onPress={() => {
                                    this.props.navigator.push({
                                        component:WebViewPage,
                                        title:item.desc,
                                        url:item.url
                                    })
                                }}>
                    <Text style={styles.title}>
                        * {item.desc} ({item.who})
                    </Text>
            </TouchableHighlight>
        ))
    }
}

var styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#252528'
    },
    navbar: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    },
    header_image: {
        height: HEADER_HEIGHT
    },
    category: {
        fontSize: 18
    },
    item_container: {
        backgroundColor: 'white',
        margin: 8,
        padding: 15,
        borderRadius: 3
    },
    title: {
        fontSize: 14,
        marginLeft: 15
    },
    titleWrapper: {
        flex: 1,
        marginTop: 10
    },
    backIcon: {
        width: 14,
        height: 14,
        borderColor: '#777',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        transform: [{rotate: '45deg'}],
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 33.9,
        left: 14.5
    }
})



