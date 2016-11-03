import React, { Component } from 'react'
import {
    ListView,
    View,
    StyleSheet,
    RefreshControl,
    Text,
    Image,
    TouchableHighlight
} from 'react-native'
import SnackBar from './customViews/SnackBar'
import NavigationBar from 'react-native-navigationbar'
import RequestUtils from './Utils/RequestUtils'
import DateUtils from './Utils/DateUtils'
import AboutPage from './AboutPage'
import Animation from './customViews/Animation'
import ContentDetail from './ContentDetail'

export default class HistoryList extends Component {

    constructor(props) {
        super(props)
        this.pageIndex=0
        this.dataArray = this.props.dataArray
        this.state={
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.contentDataGroup),
            dataArray: this.props.contentDataGroup,
            loadMore: false,
            isRefreshing:false,
            isError: false
        }
    }

    /**
     * 刷新
     * @private
     */
    async _refresh() {
        if (this.state.isRefreshing) {
            return
        }

        this.setState({
            isRefreshing:true
        })

        try {
            this.dataArray=(await RequestUtils.getDataArray()).results
            this.pageIndex = 0
            let contentDataGroup = await RequestUtils.getContents(this.dataArray.slice(0,10))
            if (typeof contentDataGroup === 'undefined') {
                return
            }
            console.log(contentDataGroup)
            this.setState({
                dataArray: contentDataGroup,
                dataSource:this.state.dataSource.cloneWithRows(contentDataGroup),
                isRefreshing:false
            })
        } catch(error) {
            console.log(error)
            this.setState({
                isError:true,
                isRefreshing:false
            })
        }
    }

    /**
     * 加载更多
     * @private
     */
    async _loadmore() {
        console.log('更多')
        if (this.state.loadMore) {
            return
        }

        this.setState({
            loadMore:true
        })

        try {
            this.pageIndex += 10
            let pageDate = this.dataArray.slice(this.pageIndex, this.pageIndex + 10)

            let loadedContentGroup = await RequestUtils.getContents(pageDate)
            let newContent = [...this.state.dataArray, ...loadedContentGroup]

            this.setState({
                dataArray: newContent,
                dataSource: this.state.dataSource.cloneWithRows(newContent),
                loadMore:false
            })
        } catch (error) {
            this.setState({
                loadMore: false,
                isError: true
            })
        }
    }

    /**
     * footer
     * @private
     */
    _renderFooter() {
        console.log('footer')
        return (
            this.state.loadMore ? (<View>
                <Animation timingLength = {50} duration = {500} bodyColor={'#aaaaaa'}/>
            </View>) : null
        )
    }

    /**
     * listView的每个子项的构造函数
     * @private
     */
    _renderItem(contentData) {
        const title = contentData.results.休息视频 ? contentData.results.休息视频[0].desc : 'lizhongfei'
        return (
            <TouchableHighlight onPress={() => this._skipIntoContent(contentData)}>
                <View style={styles.item_container}>
                    <Text style={styles.date_style}>{contentData.date}</Text>
                    <Text style={styles.title_style}>{title}</Text>
                    <Image source={{uri: contentData.results.福利[0].url}} style={styles.image_style}/>
                </View>
            </TouchableHighlight>
        )
    }

    /**
     * 点击跳转(cell点击跳转)
     * @private
     */
    _skipIntoContent(contentData) {
        console.log('点击跳转')
        this.props.navigator.push({
            component:ContentDetail,
            passProps: {contentData}
        })
    }

    render() {
        let snackBar = this.state.isError ? (<SnackBar/>) : null
        this.state.isError = false
        return (
            <View style={styles.container}>
                <NavigationBar
                backHidden={false}
                barTintColor = 'white'
                backFunc={() => {
                    this.props.navigator.pop()
                }}
                actionFunc={() => {
                    this.props.navigator.push({
                        component: AboutPage
                    })
                }}
                actionName='关于Author'
                title='History'
                barStyle={styles.navBar}
                />

               <ListView
                    dataSource={this.state.dataSource}
                    renderRow = {this._renderItem.bind(this)}
                    onEndReached={this._loadmore.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                    onEndReachedThreshold = {29}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._refresh.bind(this)}
                            tintColor='#aaaaaa'
                            title='Loading...'
                            progressBackgroundColor='#aaaaaa'
                        />
                    }
               />
                {snackBar}
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex:1
    },
    navBar: {
        backgroundColor:'white'
    },
    item_container: {
        flex:1,
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center'
    },
    date_style: {
        fontSize:14,
        color:'white',
        marginTop:20
    },
    title_style: {
        color:'white',
        marginLeft:40,
        marginRight:40,
        fontSize:14,
        lineHeight:22,
        textAlign:'center' // 字的对其方式：center每行都居中；left，right；auto ＝＝＝ justify ＝＝＝ left
    },
    image_style: {
        width:null,
        height:260,
        alignSelf:'stretch',
        marginTop:15
    }
})