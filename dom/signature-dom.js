import {
  CanvasCotentStyle,
  CanvasContainerStyle,
  CloseStyle,
  SaveStyle,
  CanvasModelStyle,
  CanvasMainStyle,
  BtnStyle,
  ClearStyle,
} from "../style/index.js";
import closeSvg from "../svg/close.svg";
export default class SignatureDom {
  constructor() {
    // canvas
    this.canvas = null;
    // 转换图片的canvas
    this.drawCanvas = null;
    // 蒙层提示信息
    this.model = null;
    // canvas最外层容器
    this.canvasContainer = null;
    // canvas与操作按钮的外层容器
    this.canvasMain = null;
    // canvas父级容器
    this.canvasContent = null;
    // svae btn
    this.save = null;
    // clear btn
    this.clear = null;
    // close btn
    this.close = null;
  }
  /**
   * 创建canvas父级容器
   */
  createCanvasContainer(options) {
    // 容器
    this.canvasContainer = this.createElement("div");
    // 操作和canvas容器
    this.canvasMain = this.createElement("div");
    // canvas 容器
    this.canvasContent = this.createElement("div");
    // add class
    this.canvasContainer.className = "canvas-container";
    this.canvasMain.className = "canvas-main";
    this.canvasContent.className = "canvas-content";
    // set style
    Object.assign(this.canvasContainer.style, CanvasContainerStyle);
    Object.assign(this.canvasMain.style, CanvasMainStyle);
    Object.assign(this.canvasContent.style, CanvasCotentStyle);
    // append child
    this.canvasMain.appendChild(this.canvasContent);
    this.canvasContainer.appendChild(this.canvasMain);
    this.container.appendChild(this.canvasContainer);
    // 初始化触摸事件
    this.initCanvasEvent();
    // 创建操作按钮
    this.createOperate(options);
    // 是否创建model容器
    options.model && this.createModel(options.modelText);
  }
  /**
   * 创建蒙层提示容器
   */
  createModel(text) {
    this.model = this.createElement("div");
    this.model.className = "canvas-model";
    this.model.innerHTML = text;
    Object.assign(this.model.style, CanvasModelStyle);
    this.canvasContent.appendChild(this.model);
  }

  /**
   * 创建canvas关闭容器
   */
  createOperate({ saveText, clearText, clearStyle, saveStyle, closeStyle }) {
    // close svg
    this.close = this.createElement("object");
    // save btn
    this.save = this.createElement("div");
    // clear btn
    this.clear = this.createElement("div");
    // 类名
    this.close.className = "close";
    this.save.className = "save";
    this.clear.className = "clear";
    // set svg
    this.close.data = closeSvg;
    // btn content
    this.save.innerHTML = saveText;
    this.clear.innerHTML = clearText;
    // set style
    Object.assign(this.close.style, CloseStyle, closeStyle);
    Object.assign(this.save.style, BtnStyle, SaveStyle, saveStyle);
    Object.assign(this.clear.style, BtnStyle, ClearStyle, clearStyle);
    // append child
    this.canvasMain.appendChild(this.close);
    this.canvasMain.appendChild(this.save);
    this.canvasMain.appendChild(this.clear);
    
    
  }
  /**
   * 创建canvas容器，并添加样式
   */
  createCanvas({ width, height }) {
    this.canvas = this.createElement("canvas");
    this.drawCanvas = this.createElement("canvas");
    this.canvas.id = "canvas";
    this.canvas.width = width || this.canvasContainer.clientWidth;
    this.canvas.height = height || this.canvasContainer.clientHeight;
    this.initCanvasAttr();
    this.canvasContent.appendChild(this.canvas);
  }
  /**
   * 删除节点
   */
  removeChild(container, target) {
    container.removeChild(target);
  }
  /**
   * 创建容器
   */
  createElement(dom) {
    return document.createElement(dom);
  }
}
