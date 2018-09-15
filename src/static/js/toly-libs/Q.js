import Logic from "./Logic";
import Datas from "./Datas";

class Q {
    constructor($) {

        /**
         * css3前缀适配
         * @param attr 属性名
         * @param value 属性值
         */
        $.fn.css3 = function (attr, value) {
            let css3 = {};
            ['Moz', 'ms', 'Webkit', ''].forEach(function (v, i) {
                if (i !== 3) {
                    css3[v + Logic.upAChar(attr)] = value;
                } else {
                    css3[attr] = value;
                }
            });
            this.css(css3);
        };

        /**
         * 元素懒加载(可视时才会进行操作)
         * @param callback 可视时回调
         */
        $.fn.lazyLoad = function (callback) {
            $(window).scroll(() => {
                let see_height = $(window).height();//可是区域高
                let detaY = $(window).scrollTop();
                let targetTop = this.offset().top;
                if (see_height + detaY >= targetTop) {
                    callback(this);
                }

            });
        };

        /**
         *
         * 元素内部滑动到最底部和最顶部监听,页面用$(window).topOrBottom()
         * @param top 滑到顶端回调
         * @param end 滑到底端回调
         */
        $.fn.topOrBottom = function (top, end) {
            this.scroll(() => {
                let elH = this.height();//可是区域高
                let detaH = this.scrollTop();
                let wholeH = this[0] === window ? $(document).height() : this[0].scrollHeight;

                if (detaH + elH >= wholeH) {
                    end(this)
                }
                if (detaH === 0) {
                    top(this)
                }
            });
        };

        /**
         * 方便循环遍历jquery对象
         * @param cb (元素, 索引, 原对象)
         */
        $.fn.forE = function (cb) {
            let $els = $(this);
            for (let i = 0; i < $els.length; i++) {
                let $el = $($els[i]);
                cb($el, i, $els)
            }
        };

        /*****************************************************************/
        /*****************************尺寸相关*****************************/
        /*****************************************************************/
        /**
         * 元素在窗口尺寸变化时回调函数
         * @param callback
         */
        $.onSizeChange = function (callback) {
            let timer = null;
            $(window).resize(function () {
                window.clearTimeout(timer);
                timer = window.setTimeout(function () {
                    //回调函数
                    if (callback && typeof(callback) === "function") {
                        callback();
                    }
                }, 50);
            });
        };


        /**
         * 元素自动于窗口宽高百分比处（窗口尺寸变化时亦可）
         * @param perX
         * @param perY
         */
        $.fn.autoInWin = function (perX, perY) {
            let self = this;
            $(this).inWindow(perX, perY);
            $.onSizeChange(function () {
                $(self).inWindow(perX, perY);
            });
            return this;
        };


        /**
         * 中心在屏幕宽高相应百分比处(包括边框)
         * @param perX
         * @param perY
         * @private
         */
        $.fn._inWindowPer = function (perX, perY) {
            $(this).offset({
                top: (window.innerHeight - $(this).height()) * perY,
                left: (window.innerWidth - $(this).width()) * perX
            });
        };

        /**
         * 把屏幕宽高分为100分，元素中心在屏幕宽高相应处(包括边框)
         * @param xin100
         * @param yin100
         */
        $.fn.inWindow = function (xin100, yin100) {
            $(this)._inWindowPer(xin100 / 100, yin100 / 100);
            return $(this);
        };


        /**
         * 设置元素相对文档的绝对位置
         */
        $.fn.setPos = function (x, y) {
            let $el = $(this);
            $el.offset({top: y, left: x});
        };

        /*****************************************************************/
        /*****************************辅助相关*****************************/
        /*****************************************************************/
        /**
         * 不选中元素（消除蓝色）
         */
        $.fn.canSelectEl = function (bool = true) {
            document.onselectstart = new Function('event.returnValue=' + bool);
        };


        /*****************************************************************/
        /*****************************创建相关*****************************/
        /*****************************************************************/
        /**
         * 创建选择型表单
         * @param opts 数组
         * @returns {jQuery|HTMLElement}
         */
        $.fn.createSelect = function (opts) {
            let id = Datas.rangeChar(12, true);//将创建时间当做id
            let html = '<select id="' + id + '">';
            for (let i = 0; i < opts.length; i++) {
                html += '<option value="' + opts[i] + '">' + opts[i] + '</option>';
            }
            html += '</select>';
            this.append(html);

            return $('#' + id);
        };
        /**
         * 快速添加p元素
         * @param str 内容
         */
        $.fn.p = function (str) {
            let $p = $('<p/>');
            $p.css({
                margin: 10
            });
            $p.text(str);
            this.append($p);
        };

        $.fn.hr = function () {
            this.append(($.Dom.hr({})));
        };

        /**
         * 代理方式动态创建元素
         * @type {{}}
         */
        $.Dom = new Proxy({}, {
            get(target, property) {
                return function (attr = {}, ...children) {
                    const el = document.createElement(property);
                    for (let key of Object.keys(attr)) {
                        el.setAttribute(key, attr[key]);
                    }
                    if (typeof children === "function") {
                        children = children();
                    }
                    for (let child of children) {
                        if (typeof child === 'string') {
                            child = document.createTextNode(child);
                        }
                        if (typeof child === 'function') {
                            child = child();
                            if (typeof child === 'string') {
                                child = document.createTextNode(child);
                            }
                            el.appendChild(child);//添加子元素
                        }
                        el.appendChild(child);//添加子元素
                    }
                    return $(el);
                }
            }
        });

        /*****************************************************************/
        /*****************************SVG相关*****************************/
        /*****************************************************************/
        /**
         * 创建SVG元素
         * @param tagName
         * @returns {jQuery|HTMLElement}
         */
        $.addSVGel = function (tagName) {
            return $(document.createElementNS('http://www.w3.org/2000/svg', tagName));
        };

        /**
         * svg属性设置
         * @param cfg
         */
        $.fn.attrSVG = function (cfg) {
            let rot = cfg.rot || 0;
            let x = cfg.x || 0;
            let y = cfg.y || 0;
            let op = cfg.op || 1;
            let sca = cfg.sca || 1;

            $(this).attr({
                transform: 'translate(' + x + ',' + y + ")" + "scale(" + sca + ")" + "rotate(" + rot + ")",
                opacity: op,

            },);
        };

        /**
         * svg实现任意文字排布
         * @param cfg x:横坐标 y:纵坐标 font:字号
         * @returns {Function} 返回一个函数，可继续赋值
         */
        $.fn.createText = function (cfg) {
            let id = new Date().getTime();//将创建时间当做id
            let svg_id = `svg_${id}`;
            let html = `<svg xmlns="http://www.w3.org/2000/svg" id="${svg_id}">`;
            html += ' <path id="path1" d="M 0.5 0.5 h2000" stroke="none" fill="none"></path>';
            html += `<text fill=${(cfg.color || "red")} style="font-size:${(cfg.font || 30)} px;" id=${ id } y="0">`;
            html += '<textPath xlink:href="#path1">';
            html += cfg.str;
            html += ' </textPath> ';
            html += '</text> ';
            html += '</svg> ';
            $(this).append(html);

            let $txt = $('#' + id);
            let txt_y = $txt.attr("y");
            let bBox = $txt[0].getBBox();

            let $svg = $(`#${svg_id}`);
            $svg.height(bBox.height);
            $svg.width(bBox.width);
            $svg.attr("transform", `translate(${cfg.x} ${cfg.y})`);
            let dy = txt_y - bBox.y; //y偏移量
            $txt.attr({"dy": dy});
            return function (str) {
                $txt.text(str);
                let bBox = $txt[0].getBBox();
                $svg.height(bBox.height);
                $svg.width(bBox.width);
            };
        };

    }
}

export default Q;

