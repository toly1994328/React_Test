class BaseCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");//绘制context对象
        this.winW = this.canvas.width;
        this.winH = this.canvas.height;

    }

    /**
     * 设置清屏
     * @param color
     */
    clearWin(color = "#FAF6FC") {
        let ctx = this.ctx;
        this.setCtx({"fs": color});
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    /**
     * 为ctx设置状态
     * @param  设置的参数json串
     */
    setCtx(drawInfo) {

        let {b, ss, fs, lj, lc, font, ta, tb, sc, sox, soy, sb, ga, gco, p, a} = drawInfo;

        let ctx = this.ctx;
        ctx.lineWidth = b || 1;//设置线宽：代号：lw 如{lw:1},代表线宽为1
        ctx.strokeStyle = ss || "#000"; //设置线条样式
        ctx.fillStyle = fs || "#0019FF";//设置填充样式
        ctx.lineJoin = lj || "round"; //设置线的连接模式
        ctx.lineCap = lc || "round";//设置线的顶头模式
        ctx.font = font || "14px Arial";//设置文字样式信息 m-toly：2018-6-15 10:07:58
        ctx.textAlign = ta || "left";//设置水平对齐方式 m-toly：2018-6-15 10:07:58
        ctx.textBaseline = tb || "top";//设置垂直对齐方式 m-toly：2018-6-15 10:07:58
        ctx.shadowColor = sc || "gray";//设置阴影颜色
        ctx.shadowOffsetX = sox || "0";//设置阴影X偏移
        ctx.shadowOffsetY = soy || "0";//设置阴影Y偏移
        ctx.shadowBlur = sb || "0"; //设置阴影模糊值
        ctx.globalAlpha = ga || "1";//设置全局透明度
        ctx.globalCompositeOperation = gco || "source-over";//设置全局遮盖模式
    }


    /**
     *
     * @param isclose 是否闭合
     * @param callback 回调
     * @param drawInfo 绘制配置项 x：距左顶X y:距左顶Y rot：旋转角度(弧度制) b:边线宽 sx:x缩放 sy:y缩放
     * @private
     */
    _s2rb2c(isclose, callback, drawInfo = {}) {
        let self = this;
        let ctx = this.ctx;
        ctx.save();
        let p = drawInfo["p"] || {x: 0, y: 0};
        let a = drawInfo["a"] || {x: 0, y: 0};
        let rot = drawInfo["rot"] || 0;

        let x = p.x;
        let y = p.y;


        let border = drawInfo["b"] || 1;
        //---增加缩放字段---m-toly:2018-6-15 08:43:53
        let sx = drawInfo["sx"] || 1;
        let sy = drawInfo["sy"] || 1;


        let coo = drawInfo["coo"];
        if (coo !== undefined) {
            x = coo.x + x;
            y = coo.y - p.y;
            p.x = x;
            p.y = y;
        }

        // drawInfo["b"] = border / sx;//放大时保持边线宽：//m-end
        //将图形的移动和旋转从绘制图形时分离
        //减少图形绘制复杂度和代码可读性
        ctx.translate(x + border, y + border);

        ctx.translate(a.x, a.y);
        ctx.rotate(rot);
        ctx.translate(-a.x, -a.y);

        ctx.scale(sx, sy);//---m-toly:2018-6-15 08:43:53

        ctx.beginPath();
        if (callback && typeof(callback) === "function") {
            self.setCtx(drawInfo);
            callback(ctx);//通过回调传递ctx对象：m-toly:2018-6-15 09:18:08
        }
        if (isclose) {
            ctx.closePath();//会封闭图形
        }
        if (drawInfo["fs"] || (drawInfo["fs"] === undefined)) {
            ctx.fill();//当fs不为false时填充
        }
        if (drawInfo["ss"] || ((drawInfo["ss"] === undefined))) {
            ctx.stroke();//绘制
        }
        ctx.restore();
    }


    s2rb2c(callback, drawInfo) {
        this._s2rb2c(true, callback, drawInfo)
    }

    s2rb2(callback, drawInfo) {
        this._s2rb2c(false, callback, drawInfo)
    }

    ////////////////////////////////////////////////////////////
    ////////////事件处理
    ////////////////////////////////////////////////////////////
    onEvent($, style, callback) {
        let self = this;
        $(this.canvas).on(style, function (e) {
            e.preventDefault();
            let x = e.pageX - $(self.canvas()).offset().left;//相对于canvas左上X
            let y = e.pageY - $(self.canvas()).offset().top;//相对于canvas左上X
            if (callback && typeof(callback) === "function") {
                callback(x, y);
            }
        });
    }

    runGo(callback, fps) {
        let timer = null;
        timer = setInterval(function () {
            if (callback && typeof(callback) === "function") {
                callback(timer);
            }
        }, fps);
    }

    getRandomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let a = Math.random() * 0.5 + 0.5;
        let color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        return color;
    }
}

export default BaseCanvas;
