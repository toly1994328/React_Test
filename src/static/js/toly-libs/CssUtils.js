class CssUtils {
    static scale(x = 1, y = 1) {
        let obj = {};
        (['MozTransform', 'MsTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
            obj[value] = `scale(${x}, ${y})`;
        });
        return obj;
    }

    static getRandomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let a = Math.random() * 0.5 + 0.5;
        let color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        return color;
    }
}
export default CssUtils;