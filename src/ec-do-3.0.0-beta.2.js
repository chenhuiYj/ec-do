/*3.0.0-beta2*/
let ecDo = (function () {
    let ruleData = {
        checkType: {
            email(str){
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            },
            mobile(str){
                return /^1[3|4|5|7|8|9][0-9]{9}$/.test(str);
            },
            tel(str){
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            },
            number(str){
                return /^[0-9]$/.test(str);
            },
            english(str){
                return /^[a-zA-Z]+$/.test(str);
            },
            text(str){
                return /^\w+$/.test(str);
            },
            chinese(str){
                return /^[\u4E00-\u9FA5]+$/.test(str);
            },
            lower(str){
                return /^[a-z]+$/.test(str);
            },
            upper(str){
                return /^[A-Z]+$/.test(str);
            }
        }
    }

    function checkValue(val, vals) {
        let _val = val;
        if (Number.isNaN(val)) {
            _val = 'NaN'
        }
        return vals.indexOf(_val) !== -1;
    }

    return {
        /**
         * @description 扩展函数配置数据
         */
        extend: {
            checkType(type, fn){
                ruleData.checkType[type] = fn;
            },
            filterStr(type, fn){
                let fnName = 'filter' + ecDo.firstWordUpper(type);
                if (!ecDo[fnName]) {
                    ecDo[fnName] = fn;
                }
            },
        },
        /**
         * @description 批量处理函数
         */
        handle(){
            let result=[],_arguments=[...arguments];
            let fnName=_arguments.shift();
            let arr=_arguments.shift();
            for(let i=0;i<arr.length;i++){
                _arguments.unshift(arr[i]);
                result.push(this[fnName].apply(this,_arguments))
                _arguments.shift();
            }
            return result;
        },

//***************字符串模块**************************/
        /**
         * @description 清除左右空格
         */
        trim(str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        },
        /**
         * @description 清除所有空格
         */
        trimAll(str){
            return str.replace(/\s+/g, "");
        },
        /**
         * @description 清除左空格
         */
        trimLeft(str){
            return str.replace(/(^\s*)/g, "");
        },
        /**
         * @description 清除右空格
         */
        trimRight(str){
            return str.replace(/(\s*$)/g, "");
        },
        /**
         * @description 大小写切换
         */
        toggleCase(str) {
            let itemText = ""
            str.split("").forEach(item => {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                } else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                } else {
                    itemText += item;
                }
            });
            return itemText;
        },
        /**
         * @description 首字母大写
         */
        firstWordUpper(str){
            return str.replace(/\b\w+\b/g, word => word.substring(0, 1).toUpperCase() + word.substring(1));
        },
        /**
         * @description 首字母小写
         */
        firstWordLower(str){
            return str.replace(/\b\w+\b/g, word => word.substring(0, 1).toLowerCase() + word.substring(1));
        },
        /**
         * @description 加密字符串
         */
        encryptStr(str, regIndex, ARepText = '*') {
            let regText = '',
                Reg = null,
                _regIndex = regIndex.split(','),
                replaceText = ARepText;
            _regIndex = _regIndex.map(item => +item);
            regText = '(\\w{' + _regIndex[0] + '})\\w{' + (1 + _regIndex[1] - _regIndex[0]) + '}';
            Reg = new RegExp(regText);
            let replaceCount = replaceText.repeat((1 + _regIndex[1] - _regIndex[0]));
            return str.replace(Reg, '$1' + replaceCount);
        },
        /**
         * @description 不加密字符串
         */
        encryptUnStr(str, regIndex, ARepText = '*') {
            let regText = '',
                Reg = null,
                _regIndex = regIndex.split(','),
                replaceText = ARepText;
            _regIndex = _regIndex.map(item => +item);
            regText = '(\\w{' + _regIndex[0] + '})(\\w{' + (1 + _regIndex[1] - _regIndex[0]) + '})(\\w{' + (str.length - _regIndex[1] - 1) + '})';
            Reg = new RegExp(regText);
            let replaceCount1 = replaceText.repeat(_regIndex[0]);
            let replaceCount2 = replaceText.repeat(str.length - _regIndex[1] - 1);
            return str.replace(Reg, replaceCount1 + '$2' + replaceCount2);
        },
        /**
         * @description 字符串开始位置加密
         */
        encryptStartStr(str, length, replaceText = '*'){
            let regText = '(\\w{' + length + '})';
            let Reg = new RegExp(regText);
            let replaceCount = replaceText.repeat(length);
            return str.replace(Reg, replaceCount);
        },
        /**
         * @description 字符串结束位置加密
         */
        encryptEndStr(str, length, replaceText = '*'){
            return this.encryptStartStr(str.split('').reverse().join(''), length, replaceText).split('').reverse().join('');
        },
        /**
         * @description 检测字符串
         */
        checkType(str, type){
            return !!ruleData.checkType[type](str);
        },
        /**
         * @description 检测密码强度
         */
        checkPwdLevel(str,rules = [/[0-9]/, /[a-z]/, /[A-Z]/, /[\.|-|_]/]) {
            let nowLv = 0;
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].test(str)) {
                    nowLv++;
                }
            }
            return nowLv;
        },
        /**
         * @description 随机码
         */
        randomWord(count = 36) {
            return Math.random().toString(count).substring(2);
        },
        /**
         * @description 统计特定字符串的次数
         */
        countStr(str, strSplit) {
            return str.split(strSplit).length - 1
        },
        /**
         * @description 过滤特定类型字符串
         */
        filterStr(str, type, replaceStr = ''){
            let arr = Array.prototype.slice.call(arguments);
            let fnName = 'filter' + this.firstWordUpper(type);
            arr.splice(1, 1);
            return this[fnName] ? this[fnName].apply(null, arr) : false;
        },
        /**
         * @description 过滤字符串的特殊符号
         */
        filterSpecialStr(str, replaceStr = '', spStr){
            let regText = '$()[]{}?\|^*+./\"\'+', pattern, _regText = "[^0-9A-Za-z\\s", nowStr;
            //是否有哪些特殊符号需要保留
            if (spStr) {
                for (let j = 0, len = spStr.length; j < len; j++) {
                    nowStr = '';
                    if (regText.indexOf(spStr[j]) === -1) {
                        nowStr = '\\';
                    }
                    _regText += nowStr + spStr[j];
                }
                _regText += ']';
            }
            else {
                _regText = "[^0-9A-Za-z\\s]";
            }
            pattern = new RegExp(_regText, 'g');
            return str = str.replace(pattern, replaceStr);
        },
        /**
         * @description 过滤字符串的html标签
         */
        filterHtml(str, replaceStr = ''){
            return str.replace(/<\/?[^>]*>/g, replaceStr);
        },
        /**
         * @description 过滤字符串的表情
         */
        filterEmjoy(str, replaceStr = ''){
            return str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/ig, replaceStr);
        },
        /**
         * @description 过滤字符串的大写字母
         */
        filterWordUpper(str, replaceStr = ''){
            return str.replace(/[A-Z]/g, replaceStr);
        },
        /**
         * @description 过滤字符串的小写字母
         */
        filterWordLower(str, replaceStr = ''){
            return str.replace(/[a-z]/g, replaceStr);
        },
        /**
         * @description 过滤字符串的数字
         */
        filterNumber(str, replaceStr = ''){
            return str.replace(/[1-9]/g, replaceStr);
        },
        /**
         * @description 过滤字符串的中文
         */
        filterChinese(str, replaceStr = ''){
            return str.replace(/[\u4E00-\u9FA5]/g, replaceStr);
        },
        /**
         * @description 格式化处理字符串
         */
        formatText(str, size = 3, delimiter = ',') {
            let regText = '\\B(?=(\\w{' + size + '})+(?!\\w))';
            let reg = new RegExp(regText, 'g');
            return str.replace(reg, delimiter);
        },
        /**
         * @description 找出最长单词
         * @param str
         * @param splitType
         * @return {{el: string, max: number}}
         */
        longestWord(str, splitType = /\s+/g) {
            let _max = 0, _item = '';
            let strArr = str.split(splitType);
            strArr.forEach(item => {
                if (_max < item.length) {
                    _max = item.length;
                    _item = item;
                }
            });
            return {el: _item, max: _max};
        },
        /**
         * @description 句中单词首字母大写
         * @param str
         * @param splitType
         * @return {*}
         */
        titleCaseUp(str, splitType = /\s+/g) {
            //这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
            let strArr = str.split(splitType),
                result = "";
            strArr.forEach(item => {
                result += this.firstWordUpper(item, 1) + ' ';
            });
            return this.trimRight(result)
        },
//***************字符串模块End**************************/
//***************数组模块**************************/
        /**
         * @description 数组去重
         * @param arr
         * @return {[*]}
         */
        unique(arr) {
            return [...new Set(arr)]
        },
        /**
         * @description 数组顺序打乱
         * @param arr
         * @return {Array.<T>}
         */
        upset(arr) {
            let j, _item;
            for (let i = 0; i < arr.length; i++) {
                j = Math.floor(Math.random() * i);
                _item = arr[i];
                arr[i] = arr[j];
                arr[j] = _item;
            }
            return arr;
        },
        /**
         * @description 数组最大值（数值数组）
         * @param arr
         */
        max(arr) {
            return Math.max(...arr);
        },
        /**
         * @description 数组最小值（数值数组）
         * @param arr
         */
        min(arr) {
            return Math.min(...arr);
        },
        /**
         * @description 数组求和（数值数组）
         * @param arr
         */
        sum(arr) {
            return arr.reduce((pre, cur) => pre + cur)
        },
        /**
         * @description 数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了（数值数组）
         * @param arr
         */
        average(arr) {
            return this.sum(arr) / arr.length;
        },
        /**
         * @description 深拷贝
         * @param obj
         */
        clone(obj){
            if (!obj && typeof obj !== 'object') {
                return;
            }
            let newObj = obj.constructor === Array ? [] : {};
            for (let key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    //递归
                    newObj[key] = this.clone(obj[key]);
                } else {
                    newObj[key] = obj[key];
                }
            }
            return newObj;
        },
        /**
         * @description 从数组中随机获取元素
         * @param arr
         * @param num
         * @return {*}
         */
        getRandom(arr, num = 1) {
            let _arr = this.clone(arr), nowIndex, result = [];
            for (let i = 0; i < num; i++) {
                nowIndex = Math.floor(Math.random() * _arr.length);
                result.push(_arr[nowIndex]);
                _arr.splice(nowIndex, 1);
            }
            return num > 1 ? result : result[0];

        },
        /**
         * @description 降序返回数组（字符串）每个元素的出现次数
         * @param arr
         * @param item
         * @return {Array|Number}
         */
        count(arr, item) {
            //是否只返回一个元素的次数
            if (item) {
                let num = 0;
                for (let i = 0, len = obj.length; i < len; i++) {
                    if (item === obj[i]) {
                        num++;
                    }
                }
                return num;
            }
            let obj = {}, k, arr1 = []
            //记录每一元素出现的次数
            for (let i = 0, len = arr.length; i < len; i++) {
                k = arr[i];
                if (obj[k]) {
                    obj[k]++;
                } else {
                    obj[k] = 1;
                }
            }
            //保存结果{el-'元素'，count-出现次数}
            for (let o in obj) {
                arr1.push({el: o, count: obj[o]});
            }
            //排序（降序）
            arr1.sort((n1, n2) => n2.count - n1.count);
            return arr1;
        },
        /**
         * @description 删除值为'val'的数组元素
         * @param arr
         * @param val
         * @return {Array}
         */
        removeArrayForValue(arr, val) {
            return arr.filter(item => item !== val)
        },
        /**
         * @description 删除值含有'val'的数组元素
         * @param arr
         * @param val
         * @return {Array}
         */
        removeArrayForLike(arr, val) {
            return arr.filter(item => item.indexOf(val) === -1);
        },
        /**
         * @description 排除对象某些项
         * @param obj
         * @param keys
         * @return {*}
         */
        filterKeys(obj, keys) {
            let _obj = {};
            let _keys = keys.split(',');
            for (let key in obj) {
                //如果key不存在排除keys里面,添加数据
                if (_keys.indexOf(key) === -1) {
                    _obj[key] = obj[key];
                }
            }
            return _obj;
        },
        /**
         * @description 对象数组排序
         * @param arr
         * @param sortText
         * @return {*}
         */
        sortBy(arr, sortText) {
            if (!sortText) {
                return arr
            }
            let _sortText = sortText.split(',').reverse(), _arr = arr.slice(0);
            for (let i = 0, len = _sortText.length; i < len; i++) {
                _arr.sort((n1, n2) => {
                    return n1[_sortText[i]] - n2[_sortText[i]]
                })
            }
            return _arr;
        },
        /**
         * @description 数组扁平化
         * @param arr
         * @return {Array}
         */
        steamroller(arr) {
            let flattened = [].concat(...arr);
            return flattened.some(item => Array.isArray(item)) ? this.steamroller(flattened) : flattened;
        },
        /**
         * @description 分割数组
         * @param arr
         * @param num
         * @return {Array}
         */
        cut(arr, num){
            let result = [];
            for (let i = 0; i < arr.length; i += num) {
                result.push(arr.slice(i, i + num))
            }
            return result;
        },
//***************数组模块END**************************/


//***************对象及其他模块**************************/
        /**
         * @description 适配rem
         * @param _client 效果图的宽度
         */
        getFontSize(_client) {
            let doc = document,
                win = window;
            let docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                countSize = function () {
                    let clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
                    if (clientWidth > _client) {
                        clientWidth = _client
                    }
                    //设置根元素font-size大小
                    docEl.style.fontSize = 100 * (clientWidth / _client) + 'px';
                };
            //屏幕大小改变，或者横竖屏切换时，触发函数
            win.addEventListener(resizeEvt, countSize, false);
            //文档加载完成时，触发函数
            doc.addEventListener('DOMContentLoaded', countSize, false);
        },
        /**
         * @description 到某一个时间的倒计时
         * @param endTime
         * @return {{d: number, h: number, m: number, s: number}}
         */
        getEndTime(endTime) {
            let t = +new Date(endTime) - +new Date(); //时间差的毫秒数
            let d = 0,
                h = 0,
                m = 0,
                s = 0;
            if (t >= 0) {
                d = Math.floor(t / 1000 / 3600 / 24);
                h = Math.floor(t / 1000 / 60 / 60 % 24);
                m = Math.floor(t / 1000 / 60 % 60);
                s = Math.floor(t / 1000 % 60);
            }
            return {d, h, m, s};
        },
        /**
         * @description 时间格式化
         * @param date
         * @param fmt
         * @return {*}
         */
        formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
            let _date = new Date(date), _fmt = fmt;
            let o = {
                "M+": _date.getMonth() + 1,                 //月份
                "d+": _date.getDate(),                    //日
                "h+": _date.getHours(),                   //小时
                "m+": _date.getMinutes(),                 //分
                "s+": _date.getSeconds()                 //秒
            };
            if (/(y+)/.test(_fmt)) {
                _fmt = _fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (let k in o) {
                if (new RegExp("(" + k + ")").test(_fmt)) {
                    _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return _fmt;
        },
        /**
         * @description 返回某一个月份的最后一天的日期
         * @param month 默认是当前月份
         * @param year 默认是当前年份
         * @return string yyyy/mm/dd
         */
        getDayByMonth(month = new Date().getMonth() + 1, year = new Date().getFullYear()){
            return new Date(year, month, 0).toLocaleDateString();
        },
        /**
         * @description 随机产生颜色
         * @return {string}
         */
        randomColor(sum) {
            if (sum) {
                return '#' + Math.random().toString(16).substring(2).substr(0, 6);
            }
            else {
                return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';
            }
        },
        /**
         * @description 随机返回一个范围的数字
         * @param n1
         * @param n2
         * @return {number}
         */
        randomNumber(n1, n2) {
            switch (arguments.length) {
                case 2:
                    return Math.round(n1 + Math.random() * (n2 - n1));
                case 1:
                    return Math.round(Math.random() * n1);
                default:
                    return Math.round(Math.random() * 100000000);
            }
        },
        /**
         * @description 设置url参数
         * @param url
         * @param obj
         * @return {string}
         */
        setUrlParam(url, obj) {
            let _rs = [];
            for (let p in obj) {
                if (obj[p] !== null && obj[p] !== '' && obj[p] !== undefined) {
                    _rs.push(p + '=' + obj[p])
                }
            }
            return url + '?' + _rs.join('&');
        },
        /**
         * @description 获取url参数
         * @param url
         * @return {Object}
         */
        getUrlParam(url = window.location.href) {
            let _param = url.substring(url.indexOf('?') + 1).split('&'),
                _rs = {}, pos;
            for (let i = 0, _len = _param.length; i < _len; i++) {
                pos = _param[i].split('=');
                if (pos.length === 2) {
                    _rs[pos[0]] = pos[1];
                }
            }
            return _rs;
        },
        /**
         * @description 现金额大写转换函数
         * @param n
         * @return {string}
         */
        upDigit(n) {
            let fraction = ['角', '分', '厘'];
            let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
            let unit = [
                ['元', '万', '亿'],
                ['', '拾', '佰', '仟']
            ];
            let head = n < 0 ? '欠人民币' : '人民币';
            n = Math.abs(n);
            let s = '';
            for (let i = 0; i < fraction.length; i++) {
                s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
            }
            s = s || '整';
            n = Math.floor(n);
            for (let i = 0; i < unit[0].length && n > 0; i++) {
                let p = '';
                for (let j = 0; j < unit[1].length && n > 0; j++) {
                    p = digit[n % 10] + unit[1][j] + p;
                    n = Math.floor(n / 10);
                }
                s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
                //s = p + unit[0][i] + s;
            }
            return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
        },
        /**
         * @description 清除对象中值为空的属性
         * @param obj
         * @param keepValues
         * @return {{}}
         */
        clearKeys(obj, keepValues = [0, false]) {
            keepValues.forEach((item, index) => {
                keepValues[index] = Number.isNaN(item) ? 'NaN' : item
            });
            let _newPar = {};
            for (let key in obj) {
                if (checkValue(obj[key], keepValues) || (obj[key] && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '')) {
                    _newPar[key] = obj[key];
                }
            }
            return _newPar;
        },
        /**
         * @description 设置对象中值为空的属性的默认值
         * @param obj
         * @param fillValues
         * @param val
         * @return {{}}
         */
        fillKeys(obj, fillValues = [null, undefined, ''], val = '--') {
            fillValues.forEach((item, index) => {
                fillValues[index] = Number.isNaN(item) ? 'NaN' : item
            });
            let _newPar = {};
            for (let key in obj) {
                _newPar[key] = checkValue(obj[key], fillValues) ? val : obj[key];
            }
            return _newPar;
        },
        /**
         * @description 数据类型判断
         * @param o
         * @param type
         * @return {*}
         */
        isType(o, type) {
            if (!type) {
                //return Object.prototype.toString.call(o).split(/\s/)[1].replace(']','')
                return Object.prototype.toString.call(o).match(/\s(.*)]/)[1]
            }
            let _types = type.toLowerCase().split(',');
            let typeObj = {
                'string': '[object String]',
                'number': '[object Number]',
                'boolean': '[object Boolean]',
                'null': '[object Null]',
                'function': '[object Function]',
                'array': '[object Array]',
                'object': '[object Object]',
                'symbol': '[object Symbol]'
            }
            let typeFn = {
                nan(){
                    return Number.isNaN(o);
                },
                elements(){
                    return Object.prototype.toString.call(o).indexOf('HTML') !== -1;
                }
            }
            let _result;
            for (let item of _types) {
                if (typeObj[item]) {
                    _result = Object.prototype.toString.call(o) === typeObj[item];
                }
                else {
                    _result = typeFn[item]();
                }
                if (_result) {
                    return _result;
                }
            }
            return false;
        },
        /**
         * @description 手机类型判断
         * @param type
         * @return {*}
         */
        getBrowserInfo(type) {
            let typeObj = {
                android: 'android',
                iphone: 'iphone',
                ipad: 'ipad',
                weixin: 'micromessenger'
            }
            return type ? navigator.userAgent.toLowerCase().indexOf(typeObj[type]) !== -1 : navigator.userAgent.toLowerCase();
        },
        /**
         * @description 函数节流
         * @param fn 执行的函数
         * @param delay 延迟的时间
         * @param option 配置项 {first:true,last:true}
         */
        throttle(fn, delay, option = {}) {
            option = Object.assign({first: true, last: true}, option);
            let timer = null;
            let t_start = 0;
            return function () {
                let _this = this, args = arguments, t_cur = +new Date();
                //先清理上一次的调用触发（上一次调用触发事件不执行）
                clearTimeout(timer);
                //首次触发
                if (!option.first && t_start === 0) {
                    //fn.apply(_this, args);
                    t_start = t_cur;
                }
                //如果当前时间-触发时间大于等于的间隔时间（delay），触发一次函数运行函数
                if (t_cur - t_start >= delay) {
                    fn.apply(_this, args);
                    t_start = t_cur;
                }
                //最后一次
                else {
                    timer = setTimeout(() => {
                        option.last && fn.apply(_this, args);
                        t_start = 0;
                    }, delay);
                }
            };
        },
        /**
         * @description 函数防抖(在事件被触发n毫秒后再执行回调，如果在这n毫秒内又被触发，则重新计时)
         * @param fn 执行函数
         * @param delay 间隔时间
         * @param first 间隔时间
         */
        debounce(fn, delay, first = false){
            let _first = first;
            return function () {
                clearTimeout(fn.id);
                if (_first) {
                    fn.call(this, arguments);
                    _first = !_first;
                }
                fn.id = setTimeout(() => {
                    fn.call(this, arguments)
                }, delay)
            }
        },
//***************对象及其他模块END**************************/
//***************cookie模块*******************************/
        /**
         * @description 设置cookie
         */
        setCookie(name, val, iDay){
            let oDate = new Date();
            oDate.setDate(oDate.getDate() + iDay);
            document.cookie = name + '=' + val + ';expires=' + oDate;
        },
        /**
         * @description 获取cookie
         */
        getCookie(name){
            let arr = document.cookie.split('; '), arr2;
            for (let i = 0; i < arr.length; i++) {
                arr2 = arr[i].split('=');
                if (arr2[0] === name) {
                    return arr2[1];
                }
            }
            return '';
        },
        /**
         * @description 删除cookie
         */
        removeCookie(name){
            this.setCookie(name, 1, -1);
        },
        /**
         * @description 操作cookie
         */
        cookie(name, val, iDay){
            if (arguments.length === 1) {
                return this.getCookie(name);
            }
            else {
                this.setCookie(name, val, iDay);
            }
        },
//***************cookie模块END*******************************/
    };
})();
