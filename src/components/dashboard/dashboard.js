import React,{Component} from 'react'
import { NavBar } from 'antd-mobile'
import NavLinkBars from './../navlink/navlink'

import { connect } from 'react-redux'




function Boss(){
    return <h2>Boss首页</h2>
}
function Genius(){
    return <h2>牛仁首页</h2>
}

function Msg(){
    return <h2>消息列表</h2>
}
function User(){
    return <h2>个人中心</h2>
}

@connect(
    state => state
)
class Dashboard extends Component {
    
    render() {
        const user = this.props.user
        const {pathname} = this.props.location
        const navList = [
            {
                path:'/boss',
                text:'牛仁',
                icon:'boss',
                title:'牛仁列表',
                component:'Boss',
                hide:user.type == 'genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:'Genius',
                hide:user.type == 'boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:'Msg',
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:'User',
            }
        ]
        return (
            <div>
                <NavBar mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>
                <h2>content</h2>

                <NavLinkBars data={navList}></NavLinkBars>
            </div>
        )
    }
}



export default Dashboard