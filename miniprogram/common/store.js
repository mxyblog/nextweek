const store ={

    get(key){
        return wx.getStorageSync(key)
    },
    set(key,value){
        return wx.setStorageSync(key, value);

    }
}

export default store