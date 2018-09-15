import Logic from "./Logic";

class Datas {
    /**
     * 字符串转数组
     * @returns {string[]}
     */
    static str2Array(str = "www.toly1994.com") {
        return str.split('')
    }

    /**
     * 取随机个英文字母
     * @param len 字符串长度
     * @param hasBig 是否有大写字母
     * @returns {string}
     */
    static rangeChar(len, hasBig = false) {
        let allLen = 25;
        let chars = ["a", "b", "c", "d", "e", "f", "g",
            "h", "i", "j", "k", "l", "m", "n",
            "o", "p", "q", "r", "s", "t",
            "u", "v", "w", "x", "y", "z"];
        let charsBig = chars.map(item => item.toUpperCase());

        if (hasBig) {
            chars = chars.concat(charsBig);
            allLen = 49;
        }
        let result = [];
        for (let i = 0; i < len; i++) {
            let char = chars[Logic.rangeInt(0, allLen)];
            result.push(char);
        }
        return result.join('');
    };

}

export default Datas;
