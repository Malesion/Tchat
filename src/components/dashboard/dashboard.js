import React,{Component} from 'react'
import { NavBar } from 'antd-mobile'
import NavLinkBars from './../navlink/navlink'

import { connect } from 'react-redux'
import { Switch,Route } from 'react-router-dom';

import Boss from '../../components/boss/boss'
import Msg from '../../components/msg/msg'
import Genius from '../../components/genius/genius'
import User from '../../components/user/user'
import { getMsgList, recvMsg } from './../../redux/chat.redux';


@connect(
    state=>state,
    { getMsgList,recvMsg }
)
class Dashboard extends Component {
    
    // shouldComponentUpdate(nextProps,nextState) {
    //     // console.log(nextProps,222)
    //     // console.log(this.props,1111)
    //     // console.log(this.props.chatuser.userlist.length !== nextProps.chatuser.userlist.length)
    //     return this.props.chatuser.userlist.length !== nextProps.chatuser.userlist.length
    // }
    componentDidMount() {
        this.props.getMsgList()
        this.props.recvMsg()
    }

    render() {
        // console.log(this.props)
        const user = this.props.user
        const {pathname} = this.props.location
        const navList = [
            {
                path:'/boss',
                text:'牛仁',
                icon:'boss',
                title:'牛仁列表',
                component:Boss,
                hide:user.type == 'genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type == 'boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User,
            }
        ]
        // console.log(navList.find(v=>v.path===pathname))
        return (
            <div>
                <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(<Route key={v.path} path={v.path} component={v.component}></Route>))}
                    </Switch>
                </div>

                <NavLinkBars data={navList}></NavLinkBars>
            </div>
        )
    }
}



export default Dashboard