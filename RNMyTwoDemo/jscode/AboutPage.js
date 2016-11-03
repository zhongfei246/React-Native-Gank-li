import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native'
import NavigationBar from 'react-native-navigationbar'
import WebViewPage from './WebViewPage'

export default class AboutPage extends Component {

    render() {

        //这个view中需要有内容才能撑起来,要不然会看到一个非常小的view块在界面上
        let content = (
            <View style={styles.bottom_view_style}>
                <Text style={{lineHeight:18}}>每天一张精选妹纸图、一个精选小视频（视频源地址播放，因为视频来源于包含各大平台。。。着实不好统一播放器。。。
                    ），一篇程序猿精选干货。</Text>
                <Text style={styles.buttom_view_contentText}>My Github:
                    <Text style={{textDecorationLine:'underline'}}
                        onPress={() => {
                            this.props.navigator.push({
                                component: WebViewPage,
                                title:'PoberLi',
                                url:'https://github.com/zhongfei246/'
                            })
                        }}
                    >https://github.com/zhongfei246/</Text>
                </Text>
            </View>
        )

        return (
            <View style={styles.container}>

                <NavigationBar
                    backHidden={false}
                    barTintColor = 'white'
                    barOpacity={0.8}
                    backFunc={() => {
                       this.props.navigator.pop()
                    }}
                    title='关于Author'
                    barStyle={styles.navBar}
                />

                <View style={styles.views}>
                    <Image source={require('./images/gank_launcher.png')} style={styles.image_style}/>
                    <Text style={styles.name_style}>李小草</Text>
                    <Text style={styles.version_style}>v1.0.0</Text>
                    <Text style={styles.about_mark_style}>关于开发者</Text>
                    {content}
                </View>

            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navBar: {
        backgroundColor:'gray'
    },
    views:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black'
    },
    image_style: {
        width:100,
        height:100,
        marginTop:60,
        borderRadius:5
    },
    name_style: {
        fontSize:14,
        color:'white',
        marginTop:20
    },
    version_style: {
        fontSize:16,
        color:'white',
        marginTop:10
    },
    about_mark_style: {
        fontSize:15,
        color:'gray',
        alignSelf:'flex-start',
        marginLeft:10
    },
    bottom_view_style: {
        backgroundColor: 'white',
        margin: 8,
        padding: 15,
        borderRadius: 4
    },
    buttom_view_contentText: {

    }
})