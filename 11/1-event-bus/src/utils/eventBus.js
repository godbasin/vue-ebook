
const events = []

function on(eventName, callback){
    let event = events.find(x => x.eventName === eventName)
    if(event){
        // 如果已有该事件，添加到监听者中
        event.addListrner(callback)
    }else{
        // 如果没有该事件，则添加新事件，并添加到监听者
        event = new MyEvent(eventName)
        event.addListrner(callback)
        events.push(event)
    }
}

function emit(eventName, ...params){
    let event = events.find(x => x.eventName === eventName)
    // 如果已有该事件，则触发
    if(event){
        event.trigger(...params)
    }
}

class MyEvent{
    constructor(eventName){
        // 创建一个事件，传入事件名
        this.eventName = eventName
        // 同时动态生成一个监听者管理
        this.listeners = []
    }

    // 触发事件，传入参数
    trigger(...params){
        // 遍历监听者，触发回调
        this.listeners.forEach(x => {
            x(...params)
        })
    }

    // 添加监听者
    addListrner(callback){
        this.listeners.push(callback)
    }
}


export default {
    on, emit
}