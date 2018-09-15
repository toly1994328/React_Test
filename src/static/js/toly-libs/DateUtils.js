let LunarDaysOfMonth = new Array

(
    0xd4a8, 0xd4a0, 0xda50, 0x5aa8, 0x56a0, 0xaad8, 0x25d0, 0x92d0, 0xc958, 0xa950, // 2001-2010

    0xb4a0, 0xb550, 0xb550, 0x55a8, 0x4ba0, 0xa5b0, 0x52b8, 0x52b0, 0xa930, 0x74a8, // 2011-2020 

    0x6aa0, 0xad50, 0x4da8, 0x4b60, 0x9570, 0xa4e0, 0xd260, 0xe930, 0xd530, 0x5aa0, // 2021-2030 

    0x6b50, 0x96d0, 0x4ae8, 0x4ad0, 0xa4d0, 0xd258, 0xd250, 0xd520, 0xdaa0, 0xb5a0, // 2031-2040 

    0x56d0, 0x4ad8, 0x49b0, 0xa4b8, 0xa4b0, 0xaa50, 0xb528, 0x6d20, 0xada0, 0x55b0  // 2041-2050 

);


// 数组LunarLeapYear存放农历2001年到2050年闰月的月份，如没有则为0，从高到低，每字节存两年 

let LunarLeapYear = new Array

(
    0x40, 0x02, 0x07, 0x00, 0x50, // 2001-2010

    0x04, 0x09, 0x00, 0x60, 0x04, // 2011-2020 

    0x00, 0x20, 0x60, 0x05, 0x00, // 2021-2030 

    0x30, 0xb0, 0x06, 0x00, 0x50, // 2031-2040 

    0x02, 0x07, 0x00, 0x50, 0x03  // 2041-2050 

);


class DateUtils {

    // 返回农历iLunarYear年的闰月月份，如没有则返回0 

    static GetLeapMonth(iLunarYear) {

        let Leap = LunarLeapYear[(iLunarYear - 2001) >> 1];

        return (((iLunarYear - 2001) & 1) == 0) ? (Leap >> 4) : (Leap & 0x0f);

    }


// 返回农历iLunarYer年iLunarMonth月的天数，结果是一个长整数
// 如果iLunarMonth不是闰月， 高字为0，低字为该月的天数
// 如果iLunarMonth是闰月， 高字为后一个月的天数，低字为前一个月的天数
    static LunarMonthDays(iLunarYear, iLunarMonth) {
        let High;
        let Low;
        let Bit;

        High = 0;

        Low = 29;

        Bit = 16 - iLunarMonth;

        if ((iLunarMonth > this.GetLeapMonth(iLunarYear)) && (this.GetLeapMonth(iLunarYear) > 0)) Bit--;

        if ((LunarDaysOfMonth[iLunarYear - 2001] & (1 << Bit)) > 0) Low++;

        if (iLunarMonth === this.GetLeapMonth(iLunarYear)) {

            High = ((LunarDaysOfMonth[iLunarYear - 2001] & (1 << (Bit - 1))) > 0) ? 30 : 29;

        }


        return Low + (High << 16);

    }


// 返回农历iLunarYear年的总天数//1994==>348
    static LunarYearDays(iLunarYear) {
        let Days, tmp;
        Days = 0;

        for (let i = 1; i <= 12; i++) {
            tmp = this.LunarMonthDays(iLunarYear, i);
            Days = Days + ((tmp >> 16) & 0xffff); //取高位
            Days = Days + (tmp & 0xffff); //取低位
        }
        return Days;
    }


// 将农历iLunarYear年格式化成天干地支记年法表示的字符串//1994==>甲戌年
    static formatLunarYear(iLunarYear) {
        let szText1 = new String("甲乙丙丁戊己庚辛壬癸");
        let szText2 = new String("子丑寅卯辰巳午未申酉戌亥");
        let strYear;
        strYear = szText1.substr((iLunarYear - 4) % 10, 1);
        strYear = strYear + szText2.substr((iLunarYear - 4) % 12, 1);
        return strYear + "年";
    }


// 将农历iLunarMonth月格式化成农历表示的字符串// 1==>正月
    static formatLunarMonth(iLunarMonth) {
        let szText = new String("正二三四五六七八九十");
        let strMonth;
        if (iLunarMonth <= 10) {
            strMonth = szText.substr(iLunarMonth - 1, 1);
        }
        else if (iLunarMonth == 11) strMonth = "十一";
        else strMonth = "十二";
        return strMonth + "月";
    }


// 将农历iLunarDay日格式化成农历表示的字符串//21==>formatLunarDay
    static formatLunarDay(iLunarDay) {
        let szText1 = new String("初十廿三");
        let szText2 = new String("一二三四五六七八九十");
        let strDay;
        if ((iLunarDay != 20) && (iLunarDay != 30)) {
            strDay = szText1.substr((iLunarDay - 1) / 10, 1) + szText2.substr((iLunarDay - 1) % 10, 1);
        }
        else if (iLunarDay != 20) {
            strDay = szText1.substr(iLunarDay / 10, 1) + "十";
        }
        else {
            strDay = "二十";
        }
        return strDay;
    }


// 将公历日期转换为农历日期，返回农历表示的字符串
    static getLunarDay(SolarDate) {
        let tmp, iLunarYear, iLunarMonth, iLunarDay, Leap = false;
        let MinMilli = 1000 * 60;
        let HrMilli = MinMilli * 60;
        let DyMilli = HrMilli * 24;

        // 从2001年1月1日算起，给定的公历日期已经过去的天数
        // 11323是1970年1月1日到2001年1月1日之间的天数，因为Date是从1970年1月1日作为起点的
        let iSpanDays = Math.round(SolarDate.getTime() / DyMilli) - 11323;
        // 公历2001年1月24日为农历2001年正月初一，差23天
        if (iSpanDays < 23) {
            let iYear = 2000;
            iLunarMonth = 12;
            iLunarDay = iSpanDays + 7;
        }
        else {
            // 从农历2001年正月初一算起 
            iSpanDays = iSpanDays - 23;
            iLunarYear = 2001;
            iLunarMonth = 1;
            iLunarDay = 1;
            // 计算农历年
            tmp = this.LunarYearDays(iLunarYear);
            while (iSpanDays >= tmp) {
                iSpanDays -= tmp;
                iLunarYear++;
                tmp = this.LunarYearDays(iLunarYear);
            }
            // 计算农历月
            tmp = this.LunarMonthDays(iLunarYear, iLunarMonth) & 0xffff; //取低字
            while (iSpanDays >= tmp) {
                iSpanDays -= tmp;
                if (iLunarMonth == this.GetLeapMonth(iLunarYear)) { // 该年该月闰月
                    tmp = this.LunarMonthDays(iLunarYear, iLunarMonth) >> 16; //取高字
                    if (iSpanDays < tmp) {
                        Leap = (tmp > 0) ? true : false;  // 闰月的后个月？
                        break;
                    }
                    iSpanDays = iSpanDays - tmp;
                }
                iLunarMonth++;
                tmp = this.LunarMonthDays(iLunarYear, iLunarMonth) & 0xffff; //取低字
            }
            // 计算农历日
            iLunarDay += iSpanDays;
        }
        return {
            day: this.formatLunarDay(iLunarDay),
            month: this.formatLunarMonth(iLunarMonth),
            year: this.formatLunarYear(iLunarYear),
            full: this.formatLunarYear(iLunarYear)+this.formatLunarMonth(iLunarMonth)+this.formatLunarDay(iLunarDay)
        }
    }


}

export default DateUtils;