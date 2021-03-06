import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// 聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 表示已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg:[],
    users:{},
    unread:0
}

export function chat(state=initState,action) {
    switch(action.type) {
        case MSG_LIST:
            return {...state, users:action.payload.users, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read).length}
        case MSG_RECV:
            return {...state, chatmsg:[...state.chatmsg, action.payload], unread:state.unread+1}
        case MSG_READ:
            const { from, num } = action.payload
            return {...state, chatmsg:state.chatmsg.map(v=>{
                // v.read = true
                from==v.from ? (v.read = true) : v.read
                return v
            }), unread:state.unread - num}
        default:
            return state
    }
}

function msgList(msgs, users) {
    return {
        type: MSG_LIST,
        payload: {msgs, users}
    }
}

function msgRecv(msg) {
    return {
        type: MSG_RECV,
        payload:msg
    }
}

function msgRead({from, userid, num}) {
    return {
        type: MSG_READ, 
        payload: {from, userid, num}
    }
}

export function readMsg(from) {
    return (dispatch, getState)=>{
        axios.post('/user/readmsg',{from})
            .then(res=>{
                const userid = getState().user._id
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(msgRead({userid, from, num:res.data.num}))
                }
            })
    }
}

export function recvMsg(){
    return dispatch => {
        socket.on('recvMsg', function(data){
            dispatch(msgRecv(data))
        })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendMsg', {from, to, msg})
    }
}

export function getMsgList(){
    return dispatch=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(msgList(res.data.msgs, res.data.users))
                }
            })
    }
}