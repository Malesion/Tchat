import React,{Component} from 'react'
import { connect } from 'react-redux'

import { getUserList } from '../../redux/chatuser.redux'
import UserCard from './../usercard/usercard'

@connect(
    state=>state.chatuser,
    {getUserList}
)

class Genius extends Component {
    
    componentDidMount(){
        this.props.getUserList('boss')
    }

    render(){
        console.log(this.props)
        return <UserCard userlist={this.props.uesrlist}></UserCard>
    }

}

export default Genius