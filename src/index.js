import SginatureDom from "../dom/signature-dom.js";
import { initOptions } from "../common/index.js";
class Signature extends SginatureDom {
  constructor(options) {
    super();
    // 需要挂载的容器
    this.container = null;
    // canvas
    this.ctx = null;
    // 是否开始绘制
    this.isDrawing = false;
    // 绘画x位置
    this.lastX = 0;
    // 绘画y位置
    this.lastY = 0;
    // 初始化参数合并参数
    this.options = options ? Object.assign(initOptions, options) : initOptions;
    this.init(this.options);
  }
  /**
   * 初始化signature
   * @param {*} options 初始化参数
   */
  init(options) {
    this.container = options.id
      ? document.querySelector(options.id)
      : document.body;
    this.createCanvasContainer(options);
    this.createCanvas(options);
    // 初始化关闭保存事件
    this.initOperateEvent(this.options);
  }
  /**
   * 注册关闭保存是事件
   * @param success 成功之后的回调函数
   * @param fail 失败后的回调函数
   */
  initOperateEvent(options) {
    // 注册关闭事件
    this.close.addEventListener("load", this.handleClose.bind(this));
    // 注册保存事件
    this.save.addEventListener("click", this.handleSave.bind(this, options));
    // 注册清空事件
    this.clear.addEventListener("click", this.handleClear.bind(this));
  }
  /**
   * 保存事件
   * @param success 成功之后的回调函数
   * @param fail 失败后的回调函数
   */
  handleSave({success, fail}) {
    const isBlank = this.isBlank(this.canvas);
    if(!isBlank){
      this.saveCanvasToImage(success);
      this.removeChild(this.container, this.canvasContainer);
    } else {
      fail && fail({
          type: "warning",
          message: "Please draw the content!"
      })
    }
  }
  /**
   * 关闭事件
   */
  handleClose() {
    const svgDocument = this.close.contentDocument;
    // 检查svgDocument是否存在，以及它是否是一个有效的文档
    if (svgDocument && svgDocument.documentElement) {
      const circleElement = svgDocument.getElementById("close"); // 替换为实际的元素ID
      // 添加事件监听器
      circleElement.addEventListener("click", () => this.removeChild(this.container, this.canvasContainer));
    } else {
      console.error("Unable to access SVG document! Please refresh and try again");
    }
  }
  /**
   * 清空画布事件
  */
  handleClear(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.initCanvasAttr();
    this.isModel("block");
  }

  /**
   * 初始canvas属性
   */
  initCanvasAttr() {
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = this.options.fillStyle;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
  }
  /**
   * 初始canvas事件
   */
  initCanvasEvent() {
    this.canvasContent.addEventListener("touchstart",this.startDrawing.bind(this), false);
    this.canvasContent.addEventListener("touchmove",this.moveDrawing.bind(this), false);
    this.canvasContent.addEventListener("touchend", this.endDrawing.bind(this), false);
  }
  /**
   * 开始画线
   */
  startDrawing(e) {
    e.preventDefault();
    this.isModel("none");
    let touch = e.touches[0];
    let rect = this.canvasContent.getBoundingClientRect();
    this.lastX = touch.clientX - rect.left;
    this.lastY = touch.clientY - rect.top;
    this.isDrawing = true;
  }
  /**
   * 绘制中
   */
  moveDrawing(e) {
    if (!this.isDrawing) return;
    let touch = e.touches[0];
    let rect = this.canvasContent.getBoundingClientRect();
    let x = touch.clientX - rect.left;
    let y = touch.clientY - rect.top;
    this.drawLine(this.lastX, this.lastY, x, y);
    this.lastX = x;
    this.lastY = y;
  }
  /**
   * 绘制结束
   */
  endDrawing() {
    this.isDrawing = false;
  }
  /**
   * 
   * @param {*} x1 线开始的位置 x轴
   * @param {*} y1 线开始的位置 y轴
   * @param {*} x2 线绘制的位置 x轴
   * @param {*} y2 线绘制的位置 y轴
   */
  drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
    this.ctx.closePath();
  }
  /**
   * 图片旋转90度保存
   */
  saveCanvasToImage(callback) {
    const _that = this;
    // 以画布中心为旋转中心，旋转-90度
    const sourceUrl = this.canvas.toDataURL("image/png");
    const img = new Image();
    img.src = sourceUrl;
    img.onload = function () {
        const drawCtx = _that.drawCanvas.getContext("2d")
        let { width, height } = img;
        // canvas交换宽高
        _that.drawCanvas.width = height;
        _that.drawCanvas.height = width;
        // 图片逆时针旋转90度后
        drawCtx.rotate(-90 * Math.PI / 180);
        // 旋转后调整绘制的位置下移一个宽度的距离
        drawCtx.drawImage(img, -width, 0);
        const dataURL = _that.drawCanvas.toDataURL("image/png");
        callback({type: "success", url: dataURL});
    }
  }
  /**
   * 判断canvas是否是空白
   * @param {*} canvas 当前的canvas，
   */
  isBlank(canvas) {
    const blank = this.createElement('canvas');//系统获取一个空canvas对象
    const blankCtx = blank.getContext("2d");
    blank.width = canvas.width;
    blank.height = canvas.height;
    blankCtx.fillStyle = this.options.fillStyle;
    blankCtx.fillRect(0, 0, blank.width, blank.height);
    return canvas.toDataURL() == blank.toDataURL();//比较值相等则为空
  }
  /**
   * 判断canvas蒙层提示是否显示
   * @param {*} canvas 当前的canvas，
   */
  isModel(flag){
    const { model } = this.options;
    if(!model) return;
    const display = this.model.style.display;
    if(display !== flag){
      this.model.style.display = flag;
    }
  }
}
export default Signature;
