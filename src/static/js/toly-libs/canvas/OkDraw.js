import BaseCanvas from "./BaseCanvas";
import Norm from "./Norm";
import Polygon from "./Polygon";

class OkDraw extends BaseCanvas {

    constructor(canvas) {
        super(canvas)
    }

    ////////////////////////////////////////////////////////////
    ////////////图形绘制
    ////////////////////////////////////////////////////////////
    /**
     * 绘制矩形
     * @param drawInfo 配置信息
     */
    drawRect(drawInfo) {
        let self = this;
        self.s2rb2c(function (ctx) {
            Polygon.rectPath(ctx, drawInfo)
        }, drawInfo);
    }

    /**
     * 绘制n角星
     * @param drawInfo 配置信息
     */
    drawNStar(drawInfo) {
        this.s2rb2c(function (ctx) {
            Polygon.starPath(ctx, drawInfo);
        }, drawInfo);
    }

    /**
     * 绘制正n多边形
     * @param drawInfo 配置信息
     */
    drawRegularPolygon(drawInfo) {
        this.s2rb2c(function (ctx) {
            Polygon.regularPolygonPath(ctx, drawInfo);
        }, drawInfo);
    }

    /**
     * 绘制正n角星
     * @param drawInfo 配置信息
     */
    drawRegularStar(drawInfo) {
        this.s2rb2c(function (ctx) {
            Polygon.regularStarPath(ctx, drawInfo);
        }, drawInfo);
    }

    /**
     * 绘制月亮
     * @param drawInfo 配置信息
     */
    drawMoon(drawInfo) {
        let self = this;
        this.s2rb2c(function (ctx) {
            Polygon.moonPath(ctx, drawInfo);
        }, drawInfo);
    }

    /**
     * 绘制圆
     * @param drawInfo 配置信息
     * @param dirc
     */
    drawArc(drawInfo, dirc) {
        let self = this;
        this.s2rb2c(function (ctx) {
            Polygon.arcPath(ctx, drawInfo, dirc);
        }, drawInfo);
    }

    /**
     * 绘制点
     * @param drawInfo
     */
    drawPoint(drawInfo) {
        this.s2rb2c(function (ctx) {
            Polygon.pointPath(ctx, drawInfo);
        }, drawInfo);
    }

    drawPointPolar(drawInfo) {
        this.s2rb2c(function (ctx) {
            Polygon.pointPathPolar(ctx, drawInfo);
        }, drawInfo);
    }

    /**
     * 绘直线
     * @param drawInfo 配置信息
     */
    drawLine(drawInfo) {
        this.s2rb2(function (ctx) {
            Polygon.linePath(ctx, drawInfo);
        }, drawInfo);
    }

    /**
     * 通过点集绘制直线
     * @param linePos
     * @param cfg
     */
    drawLines(linePos, cfg) {
        for (let i = 0; i < linePos.length - 1; i++) {

            let newCfg = Object.assign({}, cfg, {
                p0: {x: linePos[i].x, y: linePos[i].y},
                p1: {x: linePos[i + 1].x, y: linePos[i + 1].y}
            });
            this.drawLine(newCfg);
        }
    }

    /**
     * 绘制三角形
     * @param drawInfo
     */
    drawTrg(drawInfo) {
        let self;
        this.s2rb2c(function (ctx) {
            self = Polygon.trgPath(ctx, drawInfo);
        }, drawInfo);
        return self;
    }

    /**
     * 绘制直角坐标系
     * @param coo 坐标原点
     * @param line_h 小线高
     * @param step 小线间隔（像素）
     */
    drawCoord(coo, line_h = 2, step = 10) {
        let COO = coo;//坐标原点
        let LINE_H = line_h;//小线高
        let STEP = step;//小线间隔（像素）
        this.drawLine({
            p0: {x: -COO.x, y: 0},
            p1: {x: this.winW - COO.x, y: 0},
            coo: COO,
            b: 1
        });

        for (let i = 1; i < this.winW / STEP; i++) {
            this.drawLine({
                p0: {x: -COO.x + STEP * i, y: 0},
                p1: {x: -COO.x + STEP * i, y: -LINE_H},
                coo: COO,
            });
        }

        this.drawLine({
            p0: {x: 0, y: -COO.y},
            p1: {x: 0, y: -COO.y + this.winH},
            coo: COO,
        });

        for (let i = 1; i < this.winH / STEP; i++) {
            this.drawLine({
                p0: {x: 0, y: -(COO.y - this.winH + STEP * i)},
                p1: {x: LINE_H, y: -(COO.y - this.winH + STEP * i)},
                coo: COO,
            })
        }

        this.drawTrg(
            {
                p0: ({x: -5, y: COO.y - 12}),
                p1: ({x: 5, y: COO.y - 12}),
                p2: ({x: 0, y: COO.y}),
                coo: COO,
                ss: false,
                fs: "#000"
            });

        this.drawTrg(
            {
                p0: ({x: this.winW - COO.x - 12, y: 5}),
                p1: ({x: this.winW - COO.x - 12, y: -5}),
                p2: ({x: this.winW - COO.x, y: 0}),
                coo: COO,
                ss: false,
                fs: "#000"
            });
    }

    /**
     * 绘制网格
     *
     * @param step
     * @param color
     */
    drawGrid(step,color='#eee') {
        if (step === 0) {
            return;
        }
        for (let i = 0; i < this.winH / step; i++) {
            this.drawLine({p0: {x: 0, y: step * i}, p1: {x: this.winW, y: step * i}, ss: color});
        }
        for (let i = 0; i < this.winW / step; i++) {
            this.drawLine({p0: {x: step * i, y: 0}, p1: {x: step * i, y: this.winH}, ss: color});
        }
    }

    /**
     * 绘制填充文字
     * @param drawInfo
     * @param isFill 是否填充文字
     * @returns {number}
     */
    drawText(drawInfo, isFill=false) {
        let ctx = this.ctx;
        this.setCtx(drawInfo);
        let txt = drawInfo["txt"] || "";
        let p = drawInfo["p"] || {x: 0, y: 0};
        let x = p.x;
        let y = p.y;

        if (isFill === undefined) {
            ctx.fillText(txt, x, y);
            ctx.strokeText(txt, x, y);
        }
        if (isFill) {
            ctx.fillText(txt, x, y);
        } else {
            ctx.strokeText(txt, x, y);
        }
        return ctx.measureText(txt).width;
    }

    clip(callback) {
        let self = this;
        this.s2rb2(function () {
            if (callback && typeof(callback) === "function") {
                callback(self.ctx);
            }
        })
    }

}

export default OkDraw;