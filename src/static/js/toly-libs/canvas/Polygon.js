import Parse from "./Parse";
import Logic from "../Logic";

/**
 * 图形路径创建类
 */
class Polygon {
    static pointPath(ctx, configJson) {

        let R = configJson["R"] || 1;
        configJson["ss"] = false;
        ctx.arc(0, 0, R, 0, 2 * Math.PI);
    }

    static pointPathPolar(ctx, configJson) {
        let ang = configJson["ang"] || 0;
        let c = configJson["c"] || 0;
        let p = {x: c * Math.cos(ang), y: c * Math.sin(ang)};


        let R = configJson["R"] || 1;
        configJson["ss"] = false;
        ctx.arc(p.x, p.y, R, 0, 2 * Math.PI);
    }

    static linePath(ctx, configJson) {

        let line = Parse.line(configJson);
        ctx.moveTo(line.p0.x, line.p0.y);
        ctx.lineTo(line.p1.x, line.p1.y);
        return line;
    }

    static trgPath(ctx, configJson) {
        let p0 = configJson["p0"];
        let p1 = configJson["p1"];
        let p2 = configJson["p2"];

        let a = Logic.disPos2d(p1, p2);
        let b = Logic.disPos2d(p0, p2);
        let c = Logic.disPos2d(p0, p1);
        let triangle = Parse.triangle({a: a, b: b, c: c});
        if (triangle != false) {
            ctx.moveTo(p0.x, -p0.y);
            ctx.lineTo(p1.x, -p1.y);
            ctx.lineTo(p2.x, -p2.y);
            return triangle;
        } else {
            console.log("无法组成三角形！");
        }

    }

    /**
     * 画矩形的路径
     * @param ctx
     * @param configJson w:宽 h:高 rad:圆角
     */
    static rectPath(ctx, configJson) {
        let width = configJson["w"] || 100;
        let height = configJson["h"] || 100;
        let radius = configJson["ra"] || 0;

        if (2 * radius > width || 2 * radius > height) {
            return;
        }
        ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
        ctx.lineTo(radius, height);
        ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
        ctx.lineTo(0, radius);
        ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
        ctx.lineTo(width - radius, 0);
        ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, 0);
    }

    //////////////////////////////////////////////////////
    //画星星的路径
    /////////////////////////////////
    static starPath(ctx, {num=5,R=100,r=50}={}) {
        for (let i = 0; i < num; i++) {
            let perDeg = 360 / num;
            let degA = perDeg / 2 / 2;
            let degB = 360 / (num - 1) / 2 - degA / 2 + degA;
            ctx.lineTo(Math.cos((degA + perDeg * i) / 180 * Math.PI) * R + R * Math.cos(degA / 180 * Math.PI),
                -Math.sin((degA + perDeg * i) / 180 * Math.PI) * R + R);
            ctx.lineTo(Math.cos((degB + perDeg * i) / 180 * Math.PI) * r + R * Math.cos(degA / 180 * Math.PI),
                -Math.sin((degB + perDeg * i) / 180 * Math.PI) * r + R);
        }
    }

    //////////////////////////////////////////////////////
    //画正n角星的路径
    /////////////////////////////////
    static regularStarPath(ctx, configJson) {

        let num = configJson["num"] || 5;
        let R = configJson["R"] || 100;
        let r = configJson["r"] || 50;
        let degA, degB;
        if (num % 2 === 1) {
            degA = 360 / num / 2 / 2;
            degB = 180 - degA - 360 / num / 2;
        } else {
            degA = 360 / num / 2;
            degB = 180 - degA - 360 / num / 2;
        }
        r = R * Math.sin(degA / 180 * Math.PI) / Math.sin(degB / 180 * Math.PI);
        configJson["r"] = r;
        Polygon.starPath(ctx, configJson);
    }

    //////////////////////////////////////////////////////
    //画正n边形的路径
    /////////////////////////////////
    static regularPolygonPath(ctx, configJson) {
        let num, R, r;
        num = configJson["num"];
        R = configJson["R"];
        r = R * (Math.cos(360 / num / 2 / 180 * Math.PI));
        configJson["r"] = r;
        Polygon.starPath(ctx, configJson);
    }

    //////////////////////////////////////////////////////
    //画圆的路径
    /////////////////////////////////
    static arcPath(ctx, configJson, dirc) {
        let R = configJson["R"] || 100;
        ctx.arc(0, 0, R, 0, 2 * Math.PI, dirc);
    }

    //////////////////////////////////////////////////////
    //绘制月亮
    /////////////////////////////////
    static moonPath(ctx, configJson) {

        let w = configJson["w"] || 1.1;
        ctx.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true);
        ctx.moveTo(0, -1);
        // this.ctx.arcTo(w,0,0,1,this._dis(0,-1,w,0)/w)
        ctx.quadraticCurveTo(w, 0, 0, 1);
    }


}

export default Polygon;