class Cons {
    /**
     * 域名http://localhost:8080/imgs/logo/logo-50.png
     * @constructor
     */
    static BASE_URL() {
        return 'http://localhost';
        // return 'http://192.168.10.103';
        // return 'http://www.toly1994.com';
    }

    static HOME_URL() {
        return 'http://localhost:3000';
        // return 'http://www.toly1994.com';
    }


    static PORT(port = ':8080/') {
        return port;
    }



    /**
     * 图片文件夹
     * @returns {string}
     * @constructor
     */
    static BASE_IMG_URL() {
        return Cons.BASE_URL() + Cons.PORT() + 'imgs/';
    }

    /**
     * 图片文件夹
     * @returns {string}
     * @constructor
     */
    static BASE_LOGO_URL() {
        return Cons.BASE_URL() + Cons.PORT() + 'imgs/logo/';
    }

    /**
     * md
     * @returns {string}
     * @constructor
     */
    static BASE_MD_URL(name) {
        return Cons.BASE_URL() + Cons.PORT() + `file/${name}/`;
    }


    /**
     * md的data数据
     * @returns {string}
     * @constructor
     */
    static BASE_MD_DATA_URL(name) {
        return Cons.BASE_MD_URL(name) + 'data.json';
    }


    /**
     * xlink命名空间
     * @returns {string}
     * @constructor
     */
    static XLINK_NS() {
        return 'http://www.w3.org/1999/xlink';
    };

    /**
     * 返回svg的命名空间
     * @returns {string}
     * @constructor
     */
    static SVG_NS = function () {
        return 'http://www.w3.org/2000/svg';
    };
}

export default Cons;