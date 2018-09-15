import Logic from "./Logic";

let count = 0;
const styleAndAnim = Symbol('styleAndAnim');
const buildMask = Symbol('buildMask');

class Mask {
    constructor($, {rgba = '0,0,0,0.6', sx = 0.95, sy = 0.95, html = '', life = -1} = {}) {
        this.opts = {rgba, sx, sy, html, life};
        this.$ = $;
    }

    /**
     * 加上当前页面
     * @param html
     * @returns {Mask}
     */
    appendHtml(html) {
        this.opts.html += html;
        return this;
    }

    [buildMask]() {
        let $ = this.$;

        this.$body = $('body');
        this.$mask = $('<div class="to-ui-mask">');//创建遮罩层
        this.$closeBtn = $('<img/>');

        let self = this;
        let opts = this.opts;
        let $mask = this.$mask;
        let $closeBtn = this.$closeBtn;

        $closeBtn.css3("transition", 'all .5s cubic-bezier(0, 0.13, 0.36, 1.42)');

        $closeBtn.attr({
            src: Logic.getImageUrl()[0].url
        });

        $closeBtn.css({
            position: "absolute",
            right: 20,
            top: 20,
            width: 40,
            height: 40
        });


        $mask.html(this.opts.html);
        let $copy_html = $('.i-am-in-mask');
        $copy_html.show();
        $mask.append($copy_html);


        $mask.append($closeBtn);


        this[styleAndAnim](self, opts, $mask);
        return $mask;
    }

    /**
     * 准备完成,创造dom
     */
    open() {
        if (count >= 1) {
            return
        }
        count += 1;
        this.mask = this[buildMask]();
        this.$body.append(this.mask);
        this.$closeBtn.canSelectEl(false);

    };


    static getMask($, opts) {
        return new Mask($, opts);
    }

    [styleAndAnim](self, opts, $mask) {
        let $ = this.$;
        $mask.css({
            "background-color": 'rgba(' + opts.rgba + ')',
        });

        if (opts.life && opts.life !== -1) {
            //设置对话框显示时长
            window.setTimeout(function () {
                self.close();
            }, opts.life);
        }

        //按钮事件---START
        this.$closeBtn.on('click', function () {
            self.close();
        });


        this.$closeBtn.on('mouseenter', function () {
            $(this).css3("transform", 'rotate(180deg)')

        });

        //按钮事件---END

        this.$closeBtn.on('mouseleave ', function () {
            $(this).css3("transform", 'rotate(0deg)')
        });

        setTimeout(function () {
            $mask.css3("transform", 'scale(' + opts.sx + ',' + opts.sy + ')')
        }, 1);

    }

    /**
     * 关闭对话框，遮罩层稍延迟于对话框消失，效果好些
     */
    close() {
        let $mask = this.$mask;
        var rad = Math.round(Math.random() * 10);
        let hORw = ["height", "width"];

        $mask.animate({
            [hORw[rad % 2]]: 50,
            opacity: 0.3
        });

        //仍$mask最终消失
        window.setTimeout(function () {
            $mask.fadeOut();
        }, 600);
        count = 0;
        this.$closeBtn.canSelectEl(true);
        this.isShowing = false;
    }

    /**
     * 获得创建的mask节点
     * @returns {jQuery|HTMLElement}
     */
    css(css) {
        console.log(css);
        this.$mask.css(css);
    }
}

export default Mask;