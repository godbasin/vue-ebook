// globalData 用来存全局数据
let globalData = {};

// 获取全局数据
// 传 key 获取对应的值
// 不传 key 获取全部值
export function getGlobalData(key){
    return key ? globalData[key] : globalData;
}

// 设置全局数据
export function setGlobalData(key, value){
    // 需要传键值对
    if(key === undefined || value === undefined){
        return;
    }
    globalData = {...globalData, [key]: value}
    return globalData;
}

// 清除全局数据
// 传 key 清除对应的值
// 不传 key 清除全部值
export function clearGlobalData(key){
    // 需要传键值对
    if(key === undefined){
        globalData = {};
    }else{
        delete globalData[key];
    }
    return globalData;
}