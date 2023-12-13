/**
 * 初始options
 * @param {string} id 签名组件挂载的container 
 * @param {number} width canvas的宽度，内部会自适应
 * @param {number} height canvas的高度，内部会自适应
 * @param {boolean} model 蒙层提示容器
 * @param {string} modelText 蒙层提示内容
 * @param {string} fillStyle canvas的背景颜色
 * @param {string} saveText 保存按钮的Text
 * @param {object} saveStyle 保存按钮的样式，可以覆盖
 * @param {string} clearText 清空按钮的Text
 * @param {object} clearStyle 清空按钮的样式，可以覆盖
 * @param {object} closeStyle 关闭按钮的样式，可以覆盖
 * @param {function} success 保存成功的回调，必须。
 * @param {function} fail 失败的回调，必须。
*/
export const initOptions = {
    id: null,
    width: null, 
    height: null,
    model: true,
    modelText: "在此签名",
    fillStyle: "#efefef",
    saveText: "save",
    saveStyle: {},
    clearText: "clear",
    clearStyle: {},
    closeStyle: {},
    success: () => {},
    fail: () => {},
}

