import { rejects } from "assert"
import { resolve } from "path"

//es6
//网络请求封装
export default(params,str)=>{
    //弹框
    uni.showLoading({
        title: str,
    });
    return new Promise((resolve,rejects)=>{
         uni.request({
            ...params,
            //回调成功
            success: (result)=>{
                resolve(result.data);
            },
            //回调失败
            fail: (err)=>{
                rejects(err);
            },
            //回调完成
            complete: ()=>{
               uni.hideLoading();
            }
        });
    })
}