import Logic from "../Logic"
import Law from "./Law"
var triangle = {
    a: undefined,//BC边
    b: undefined,//AC边
    c: undefined,//AB边
    degA: undefined,//∠BAC
    degB: undefined,//∠ABC
    degC: undefined,//∠BCA
};

var line = {
    p0: undefined,//第一点
    p1: undefined,//第二点
    c: undefined,//周长(线长)
    ang: undefined,//线与X轴夹角(弧度数)
    k: undefined,//斜率
    b0: undefined,//直线解析式x=0时，y的值

    _x: undefined,//属性变量x
    _y: undefined//属性变量y
};

/**
 * 图形解析类
 */
class Parse {
    /**
     * rot为以p0为旋转点顺时针旋转到p1的弧度数
     * @param line
     * @returns {*}
     */
    static line(line) {
        Parse.getLine(line);

        var p0 = line.p0;
        var p1 = line.p1;
        var c = line.c;
        var ang = line.ang;

        if (Logic.isExist(p0, p1)) {
            c = Logic.disPos2d(p0, p1);
            ang = Logic.angleOf2Pos(p0, p1);
            line.c = c;
            line.ang = ang;
            Parse.getLine(line);
            return line;
        }

        if (Logic.isExist(p0, c, ang)) {
            var ptemp = {};
            ptemp.x = Math.round(p0.x + Math.sin(ang) * c);
            ptemp.y = Math.round(p0.y + Math.cos(ang) * c);
            line.p1 = ptemp;
            Parse.getLine(line);
            return line;
        }


    }


    static getLine(line) {
        var p0 = line.p0;
        var p1 = line.p1;
        var x = line._x;
        var y = line._y;
        var ang = line.ang;
        var k = line.k;
        var b0 = line.b0;


        if (Logic.isExist(p0, p1)) {
            if (p1.x === p0.x) {
                line.ang = Math.PI / 2;
                return line;
            }
            var k = (p1.y - p0.y) / (p1.x - p0.x);
            var ang = Math.atan(k);
            line.ang = ang;
            line.k = k;
            line.b0 = p0.y - k * p0.x;
            //两点式
            if (x !== undefined) {
                line._y = k * (x - p0.x) + p0.y;
                return line;
            }
            if (y !== undefined) {
                line._x = (y - p0.y) / k + p0.x;
                return line;
            }
            return line;
        }

        //点斜式
        if (Logic.isExist(p0, k)) {
            line.p1 = {x: p0.x + 1, y: p0.y + k};
            return this.getLine(line);
        }
        if (Logic.isExist(p1, k)) {
            line.p0 = {x: p1.x + 1, y: p1.y + k};
            return this.getLine(line);
        }
        if (Logic.isExist(k, b0)) {
            line.p0 = {x: 0, y: b0};
            console.log(line);
            return this.getLine(line);
        }
    }

    /**
     * 根据三角形边角三参，推算其他信息：自辨函数
     * @param triangle 注：度数返回弧度制的
     * @returns {*} 2018-6-17 00:38:33
     */
    static triangle(triangle) {
        var a = triangle.a;
        var b = triangle.b;
        var c = triangle.c;
        var degA = triangle.degA;
        var degB = triangle.degB;
        var degC = triangle.degC;

        if (a + b <= c || b + c <= a || a + c <= b || a <= 0 || b <= 0 || c <= 0) {
            console.log("无法组成三角形!");
            return false;
        }
        // abB     abA     acA     acC     bcC     bcB     ABC
        //两边+非夹角及三个角无法确定唯一三角形，故不可解
        if (Logic.isExist(a, b, degB) || Logic.isExist(a, b, degA) || Logic.isExist(a, c, degA) ||
            Logic.isExist(a, c, degC) || Logic.isExist(c, b, degB) || Logic.isExist(c, b, degC) || Logic.isExist(degA, degB, degC)) {
            console.log("三角形不可解!");
            return false;
        }
/////////////////////3///////两边一角--解三角形///////////////////////////////////
        if (Logic.isExist(a, b, degC)) {

            c = Law.cosGetL(degC, a, b);
            degA = Law.cosGetDeg(a, b, c);
            degB = Law.cosGetDeg(b, a, c);
            triangle.c = c;
            triangle.degA = degA;
            triangle.degB = degB;
            return triangle;
        }

        if (Logic.isExist(c, a, degB)) {
            b = Law.cosGetL(degB, a, c);
            degC = Law.cosGetDeg(c, b, a);
        }

        if (Logic.isExist(b, c, degA)) {
            a = Law.cosGetL(degA, b, c);
            degC = Law.cosGetDeg(c, b, a);
        }
/////////////////1///////////三边--解三角形///////////////////////////////////
        if (Logic.isExist(a, b, c)) {
            degC = Law.cosGetDeg(c, b, a);
        }
/////////////////9///////////两脚一边--解三角形///////////////////////////////////
        if (Logic.isExist(degA, degB, a)) {
            degC = Math.PI - degA - degB;
            c = Law.sinGetL(degC, degA, a);
            b = Law.cosGetL(degB, a, c);
        }

        if (Logic.isExist(degA, degB, b)) {
            degC = Math.PI - degA - degB;
            a = Law.sinGetL(degA, degB, b);

        }

        if (Logic.isExist(degA, degB, c)) {
            degC = Math.PI - degA - degB;
            a = Law.sinGetL(degA, degC, c);
            b = Law.cosGetL(degB, a, c);
        }
        ////////////////
        if (Logic.isExist(degA, degC, a)) {
            degB = Math.PI - degA - degC;
            c = Law.sinGetL(degC, degA, a);
            b = Law.cosGetL(degB, a, c);
        }
        if (Logic.isExist(degA, degC, b)) {
            degB = Math.PI - degA - degC;
            a = Law.sinGetL(degA, degB, b);
            c = Law.cosGetL(degC, a, b);
        }
        if (Logic.isExist(degA, degC, c)) {
            degB = Math.PI - degA - degC;
            a = Law.sinGetL(degA, degC, c);
            b = Law.cosGetL(degB, a, c);

        }

        ///////////
        if (Logic.isExist(degB, degC, a)) {
            degA = Math.PI - degB - degC;
            c = Law.sinGetL(degC, degA, a);
            b = Law.cosGetL(degB, a, c);

        }
        if (Logic.isExist(degB, degC, b)) {
            degA = Math.PI - degB - degC;
            a = Law.sinGetL(degA, degB, b);
            c = Law.sinGetL(degC, degA, a);

        }
        if (Logic.isExist(degB, degC, c)) {
            degA = Math.PI - degB - degC;
            a = Law.sinGetL(degA, degC, c);
            b = Law.cosGetL(degB, a, c);

        }

        return Parse.triangle({a: a, b: b, degC: degC});
    }


    static getPosBy2Line(line1, line2) {
        var x = (line2.b0 - line1.b0) / (line1.k - line2.k);
        line1._x = x;
        this.getLine(line1);
        return {x: line1._x, y: line1._y}
    }


}

export default Parse;