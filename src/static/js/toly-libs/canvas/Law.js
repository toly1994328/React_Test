/**
 * 定理类
 */

class Law {
    /**正弦定理
     * 已知边及其对角，求另一已知角所对边，第一参对应所求边
     * @param degA
     * @param degB
     * @param b
     * @returns {number|*}
     */
    static sinGetL(degA, degB, b,) {
        return b * Math.sin(degA) / Math.sin(degB);

    }

    /**余弦定理
     * 已知三边，第一参对应所求角
     * @param a
     * @param b
     * @param c
     * @returns {number}
     */
    static cosGetDeg(b, a, c) {
        var cosb = (a * a + c * c - b * b) / (2 * a * c);
        var degB = Math.acos(cosb);

        return degB;
    }

    /**余弦定理
     * 已知两边及夹角，用余弦定理求第三边,第一参对应所求边
     * @param degC  已知角度数
     * @param a 已知角一边长
     * @param b 已知角一边长
     * @param isDeg 是否是角度制
     * @returns number
     */
    static cosGetL(degC, a, b) {
        return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(degC));
    }
}

export default Law;