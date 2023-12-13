## 移动端签名组件
此签名组件，使用原生实现，未使用前端任何框架。

## 下载
npm install zy-signature-mobile

## 使用方法
import Signature from "zy-signature-mobile";

const options = {
    id: "", // 挂载的container，不传默认会插入到body中
    width: "", // canvas宽度，内部自适应，非必须
    height: "", // canvas高度，内部自适应，非必须
    model: true, // 是否显示提示蒙层
    modelText: "", // 蒙层提示信息
    fillStyle: "", // canvas背景颜色
    saveText: "", // 保存按钮的content
    saveStyle: "", // 保存按钮的样式
    clearText: "", // 清除按钮的content
    clearStyle: "", // 清除按钮的样式
    closeStyle: "", // 退出按钮的样式
    success: () => {}, // 必须，签名成功此回调函数可以获取到返回的base64图片。
    fail: () => {}, //  必须，签名失败此回调函数，如果canvas没有内容会调用此回调。
}
const signatuer = new Signature(options)

## 注意
本插件使用的是ES module