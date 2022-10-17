export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 10000,
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
export const getUserProfile=(result)=>{
  return new Promise((resolve,reject)=>{
    wx.getUserProfile({
      desc: '获取用户信息',
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
