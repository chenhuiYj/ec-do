/*2.0.0*/
let ecDo = {
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
        return str.replace(/\b\w+\b/g, function (word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

        });
    },
    /**
     * @description 首字母小写
     */
    firstWordLower(str){
        return str.replace(/\b\w+\b/g, function (word) {
            return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
        });
    },
    /**
     * @description 字符串循环复制
     */
    repeatStr(str, count) {
        return str.repeat(count);
    },
    /**
     * @description 字符串替换
     */
    replaceAll(str, AFindText, ARepText) {
        let raRegExp = new RegExp(AFindText, "g");
        return str.replace(raRegExp, ARepText);
    },
    /**
     * @description 加密字符串
     */
    encryptStr(str, regIndex, ARepText = '*') {
        let regtext = '',
            Reg = null,
            _regIndex=regIndex.split(','),
            replaceText = ARepText;
        //replaceStr('18819322663',[3,5,3],0)
        //result：188*****663
        //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
        _regIndex=_regIndex.map(item=>+item);
        regtext = '(\\w{' + _regIndex[0] + '})\\w{' + (1+_regIndex[1]-_regIndex[0]) + '}';
        Reg = new RegExp(regtext);
        let replaceCount = this.repeatStr(replaceText, (1+_regIndex[1]-_regIndex[0]));
        return str.replace(Reg, '$1' + replaceCount);
    },
    /**
     * @description 不加密字符串
     */
    encryptUnStr(str, regIndex, ARepText = '*') {
        let regtext = '',
            Reg = null,
            _regIndex=regIndex.split(','),
            replaceText = ARepText;
        _regIndex=_regIndex.map(item=>+item);
        regtext = '(\\w{' + _regIndex[0] + '})(\\w{' + (1+_regIndex[1]-_regIndex[0]) + '})(\\w{' + (str.length-_regIndex[1]-1) + '})';
        Reg = new RegExp(regtext);
        let replaceCount1 = this.repeatStr(replaceText, _regIndex[0]);
        let replaceCount2 = this.repeatStr(replaceText, str.length-_regIndex[1]-1);
        return str.replace(Reg, replaceCount1 + '$2' + replaceCount2);
    },
    /**
     * @description 字符串开始位置加密
     */
    encryptStartStr(str,length,replaceText = '*'){
        let regtext = '(\\w{' + length + '})';
        let Reg = new RegExp(regtext);
        let replaceCount = this.repeatStr(replaceText, length);
        return str.replace(Reg, replaceCount);
    },
    /**
     * @description 字符串结束位置加密
     */
    encryptEndStr(str,length,replaceText = '*'){
        return this.encryptStartStr(str.split('').reverse().join(''),length,replaceText).split('').reverse().join('');
    },
    /**
     * @description 检测字符串
     */
    checkType:(function(){
        let rules={
            email(str){
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            },
            mobile(str){
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
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
        };
        return {
            check(str, type){
                return rules[type]?rules[type](str):false;
            },
            addRule(type,fn){
                rules[type]=fn;
            }
        }
    })(),
    /**
     * @description 检测密码强度
     */
    checkPwdLevel(str) {
        let nowLv = 0;
        if (str.length < 6) {
            return nowLv
        }
        if (/[0-9]/.test(str)) {
            nowLv++
        }
        if (/[a-z]/.test(str)) {
            nowLv++
        }
        if (/[A-Z]/.test(str)) {
            nowLv++
        }
        if (/[\.|-|_]/.test(str)) {
            nowLv++
        }
        return nowLv;
    },
    /**
     * @description 随机码
     */
    randomWord(count=36) {
        return Math.random().toString(count).substring(2);
    },
    /**
     * @description 统计特定字符串的次数
     */
    countStr(str, strSplit) {
        return str.split(strSplit).length - 1
    },
    //过滤字符串(html标签，表情，特殊字符)
    //字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
    //如果需要过滤多种字符，type参数使用,分割，如下栗子
    //过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
    //let str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\'#@!()*/-())_\'":"{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程';
    // ecDo.filterStr(str,'html,WORD,chinese,special','*','%?')
    //result："asd    654a**sasdasd*********6d5#%^*^&*^%^&*$\"'#@!()*/-())_'":"{}?*****************"
    filterStr:(function(){
        let typeFn={
            html(str,replaceStr=''){
                return str.replace(/<\/?[^>]*>/g, replaceStr);
            },
            emjoy(str,replaceStr=''){
                return str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, replaceStr);
            },
            WORD(str,replaceStr=''){
                return str.replace(/[A-Z]/g, replaceStr);
            },
            word(str,replaceStr=''){
                return str.replace(/[a-z]/g, replaceStr);
            },
            number(str,replaceStr=''){
                return str.replace(/[1-9]/g, replaceStr);
            },
            specialStr(str,replaceStr='',spstr){
                let regText = '$()[]{}?\|^*+./\"\'+',pattern;
                //是否有哪些特殊符号需要保留
                if (spstr) {
                    let _spstr = spstr.split(""), _regText = "[^0-9A-Za-z\\s";
                    for (let j = 0, len1 = _spstr.length; j < len1; j++) {
                        if (regText.indexOf(_spstr[j]) === -1) {
                            _regText += _spstr[j];
                        }
                        else {
                            _regText += '\\' + _spstr[j];
                        }
                    }
                    _regText += ']'
                    pattern = new RegExp(_regText, 'g');
                }
                else {
                    pattern = new RegExp("[^0-9A-Za-z\\s]", 'g')
                }
                return str = str.replace(pattern, replaceStr);
            }
        }
        return{
            handle(type,str){
                let arr = Array.prototype.slice.call(arguments);
                arr.splice(0,1);
                return typeFn[type]?typeFn[type].apply(null, arr):false;
            },
            addType(type,fn){
                if(!typeFn[type]){
                    typeFn[type]=fn;
                }
            }
        }
    })(),
    filterSpecialStr(str,replaceStr='',spstr){
        let regText = '$()[]{}?\|^*+./\"\'+',pattern;
        //是否有哪些特殊符号需要保留
        if (spstr) {
            let _spstr = spstr.split(""), _regText = "[^0-9A-Za-z\\s";
            for (let j = 0, len1 = _spstr.length; j < len1; j++) {
                if (regText.indexOf(_spstr[j]) === -1) {
                    _regText += _spstr[j];
                }
                else {
                    _regText += '\\' + _spstr[j];
                }
            }
            _regText += ']'
            pattern = new RegExp(_regText, 'g');
        }
        else {
            pattern = new RegExp("[^0-9A-Za-z\\s]", 'g')
        }
        return str = str.replace(pattern, replaceStr);
    },
    filterHtml(str,replaceStr=''){
        return str.replace(/<\/?[^>]*>/g, replaceStr);
    },
    filterEmjoy(str,replaceStr=''){
        return str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, replaceStr);
    },
    filterWordUpper(str,replaceStr=''){
        return str.replace(/[A-Z]/g, replaceStr);
    },
    filterWordLower(str,replaceStr=''){
        return str.replace(/[a-z]/g, replaceStr);
    },
    filterNumber(str,replaceStr=''){
        return str.replace(/[1-9]/g, replaceStr);
    },
    filterChinese(str,replaceStr=''){
        return str.replace(/[\u4E00-\u9FA5]/g, replaceStr);
    },
    //格式化处理字符串
    //ecDo.formatText('1234asda567asd890')
    //result："12,34a,sda,567,asd,890"
    //ecDo.formatText('1234asda567asd890',4,' ')
    //result："1 234a sda5 67as d890"
    //ecDo.formatText('1234asda567asd890',4,'-')
    //result："1-234a-sda5-67as-d890"
    formatText(str, size = 3, delimiter = ',') {
        let regText = '\\B(?=(\\w{' + size + '})+(?!\\w))';
        let reg = new RegExp(regText, 'g');
        return str.replace(reg, delimiter);
    },
    //找出最长单词 (Find the Longest word in a String)
    //longestWord('Find the Longest word in a String')
    //result：7
    //longestWord('Find|the|Longest|word|in|a|String','|')
    //result：7
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

        //return str.split(splitType).map(w => {return {el:w,count:w.length}}).sort((n1,n2)=>n2.count-n1.count)[0];


    },
    //句中单词首字母大写 (Title Case a Sentence)
    //这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
    //ecDo.titleCaseUp('this is a title')
    //"This Is A Title"
    titleCaseUp(str, splitType = /\s+/g) {
        let strArr = str.split(splitType),
            result = "";
        strArr.forEach(item => {
            result += this.firstWordUpper(item, 1) + ' ';
        });
        return this.trimRight(result)
    },
//***************字符串模块End**************************/
//***************数组模块**************************/
    //数组去重
    removeRepeatArray(arr) {
        // return arr.filter(function (item, index, self) {
        //     return self.indexOf(item) === index;
        // });
        //es6
        return [...new Set(arr)]
    },
    //数组顺序打乱
    upsetArr(arr) {
        return arr.sort(() => {
            return Math.random() - 0.5
        });
    },

    //数组最大值
    //这一块的封装，主要是针对数字类型的数组
    maxArr(arr) {
        return Math.max.apply(null, arr);
    },
    //数组最小值
    minArr(arr) {
        return Math.min.apply(null, arr);
    },

    //这一块的封装，主要是针对数字类型的数组
    //数组求和
    sumArr(arr) {
        return arr.reduce((pre, cur) =>pre + cur)
    },

    //数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
    covArr(arr) {
        return this.sumArr(arr) / arr.length;
    },
    //从数组中随机获取元素
    randomOne(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    //回数组（字符串）一个元素出现的次数
    //getEleCount('asd56+asdasdwqe','a')
    //result：3
    //getEleCount([1,2,3,4,5,66,77,22,55,22],22)
    //result：2
    getEleCount(obj, ele) {
        let num = 0;
        for (let i = 0, len = obj.length; i < len; i++) {
            if (ele === obj[i]) {
                num++;
            }
        }
        return num;
    },

    //返回数组（字符串）出现最多的几次元素和出现次数
    //arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
    //返回值：el->元素，count->次数
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
    //result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2},{"el":"4","count":1},{"el":"5","count":1},{"el":"6","count":1}]
    //默认情况，返回所有元素出现的次数
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
    //传参（rank=3），只返回出现次数排序前三的
    //result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2}]
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
    //传参（ranktype=1,rank=null），升序返回所有元素出现次数
    //result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1},{"el":"3","count":2},{"el":"1","count":4},{"el":"2","count":6}]
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)
    //传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
    //result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1}]
    getCount(arr, rank, ranktype) {
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
        arr1.sort(function (n1, n2) {
            return n2.count - n1.count
        });
        //如果ranktype为1，则为升序，反转数组
        if (ranktype === 1) {
            arr1 = arr1.reverse();
        }
        let rank1 = rank || arr1.length;
        return arr1.slice(0, rank1);
    },

    //得到n1-n2下标的数组
    //getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
    //result：[5, 6, 7, 8, 9]
    //getArrayNum([0,1,2,3,4,5,6,7,8,9],2) 不传第二个参数,默认返回从n1到数组结束的元素
    //result：[2, 3, 4, 5, 6, 7, 8, 9]
    getArrayNum(arr, n1, n2) {
        return arr.slice(n1, n2);
    },

    //筛选数组
    //删除值为'val'的数组元素
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
    //result：["aaa"]   带有'test'的都删除
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test')
    //result：["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
    removeArrayForValue(arr, val, type) {
        return arr.filter(item=>type ? item.indexOf(val) === -1 : item !== val)
    },
    //获取对象数组某些项
    //let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //getOptionArray(arr,'a,c')
    //result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
    //getOptionArray(arr,'b',1)
    //result：[2, 3, 9, 2, 5]
    getOptionArray(arr, keys) {
        let newArr = [];
        if (!keys) {
            return arr
        }
        let _keys = keys.split(','), newArrOne = {};
        //是否只是需要获取某一项的值
        if (_keys.length === 1) {
            for (let i = 0, len = arr.length; i < len; i++) {
                newArr.push(arr[i][keys])
            }
            return newArr;
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            newArrOne = {};
            for (let j = 0, len1 = _keys.length; j < len1; j++) {
                newArrOne[_keys[j]] = arr[i][_keys[j]]
            }
            newArr.push(newArrOne);
        }
        return newArr
    },
    //排除数组某些项
    //let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //filterOptionArray(arr,'a')
    //result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
    //filterOptionArray(arr,'a,c')
    //result：[{b:2},{b:3},{b:9},{b:2},{b:5}]
    filterOptionArray(arr, keys) {
        let newArr = [];
        let _keys = keys.split(','), newArrOne = {};
        for (let i = 0, len = arr.length; i < len; i++) {
            newArrOne = {};
            for (let key in arr[i]) {
                //如果key不存在排除keys里面,添加数据
                if (_keys.indexOf(key) === -1) {
                    newArrOne[key] = arr[i][key];
                }
            }
            newArr.push(newArrOne);
        }
        return newArr;
    },
    //对象数组的排序
    //let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //ecDo.arraySort(arr,'a,b')a是第一排序条件，b是第二排序条件
    //result：[{"a":1,"b":2,"c":9},{"a":2,"b":3,"c":5},{"a":4,"b":2,"c":5},{"a":4,"b":5,"c":7},{"a":5,"b":9}]
    arraySort(arr, sortText) {
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
    //数组扁平化
    steamroller(arr) {
        let newArr = [], _this = this;
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                // 如果是数组，调用(递归)steamroller 将其扁平化
                // 然后再 push 到 newArr 中
                newArr.push.apply(newArr, _this.steamroller(arr[i]));
            } else {
                // 不是数组直接 push 到 newArr 中
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },
    //另一种写法
    //steamroller([1,2,[4,5,[1,23]]])
    //[1, 2, 4, 5, 1, 23]
    /*
     * i=0 newArr.push(arr[i])  [1]
     * i=1 newArr.push(arr[i])  [1,2]
     * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第一次i=2进入后 i=0, newArr.push(arr[i]);  [4]
     * 第一次i=2进入后 i=1, newArr.push(arr[i]);  [4，5]
     *  * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第二次i=2进入后 i=0, newArr.push(arr[i]);  [1]
     * 第二次i=2进入后 i=1, newArr.push(arr[i]);  [1，23]  执行到下面
     * 第二次循环完，回到第一次进入后  newArr = newArr.concat(steamroller(arr[i]));  [4,5].concat([1,23])   [4,5,1,23]
     * 然后回到第一次   [1,2].concat([4,5,1,23])
     */
    //  steamroller(arr) {
    //      let newArr = [];
    //      for (let i = 0; i < arr.length; i++) {
    //          if (Array.isArray(arr[i])) {
    //              // 如果是数组，调用(递归)steamroller 将其扁平化
    //              // 然后再 push 到 newArr 中
    //              newArr = newArr.concat(steamroller(arr[i]));
    //          } else {
    //              // 不是数组直接 push 到 newArr 中
    //              newArr.push(arr[i]);
    //          }
    //      }
    //      return newArr;
    //  },
//***************数组模块END**************************/

//***************对象及其他模块**************************/
    //适配rem
    getFontSize(_client) {
        let doc = document,
            win = window;
        let docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
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
        win.addEventListener(resizeEvt, recalc, false);
        //文档加载完成时，触发函数
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },
    //到某一个时间的倒计时
    //getEndTime('2017/7/22 16:0:0')
    //result："剩余时间6天 2小时 28 分钟20 秒"
    getEndTime(endTime) {
        let startDate = new Date(); //开始时间，当前时间
        let endDate = new Date(endTime); //结束时间，需传入时间参数
        let t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
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
        return {d,h,m,s};
    },
    formatDate(date,fmt) {
        let _date=new Date(date);
        let o = {
            "M+" : _date.getMonth()+1,                 //月份
            "d+" : _date.getDate(),                    //日
            "h+" : _date.getHours(),                   //小时
            "m+" : _date.getMinutes(),                 //分
            "s+" : _date.getSeconds()                 //秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (_date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(let k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    },
        //随进产生颜色
    randomColor() {
        //randomNumber是下面定义的函数
        //写法1
        //return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';

        //写法2
        return '#' + Math.random().toString(16).substring(2).substr(0, 6);

        //写法3
        //let color='#',_index=this.randomNumber(15);
        //for(let i=0;i<6;i++){
        //color+='0123456789abcdef'[_index];
        //}
        //return color;
    },
    //随机返回一个范围的数字
    randomNumber(n1, n2) {
        //randomNumber(5,10)
        //返回5-10的随机整数，包括5，10
        if (arguments.length === 2) {
            return Math.round(n1 + Math.random() * (n2 - n1));
        }
        //randomNumber(10)
        //返回0-10的随机整数，包括0，10
        else if (arguments.length === 1) {
            return Math.round(Math.random() * n1)
        }
        //randomNumber()
        //返回0-255的随机整数，包括0，255
        else {
            return Math.round(Math.random() * 255)
        }
    },
    //设置url参数
    //setUrlParam({'a':1,'b':2})
    //result：a=1&b=2
    setUrlParam(obj) {
        let _rs = [];
        for (let p in obj) {
            if (obj[p] != null && obj[p] != '') {
                _rs.push(p + '=' + obj[p])
            }
        }
        return _rs.join('&');
    },
    //获取url参数
    //getUrlParam('segmentfault.com/write?draftId=122000011938')
    //result：Object{draftId: "122000011938"}
    getUrlParam(url) {
        url = url ? url : window.location.href;
        let _pa = url.substring(url.indexOf('?') + 1),
            _arrS = _pa.split('&'),
            _rs = {};
        for (let i = 0, _len = _arrS.length; i < _len; i++) {
            let pos = _arrS[i].indexOf('=');
            if (pos == -1) {
                continue;
            }
            let name = _arrS[i].substring(0, pos),
                value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
            _rs[name] = value;
        }
        return _rs;
    },

    //现金额大写转换函数
    //upDigit(168752632)
    //result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
    //upDigit(1682)
    //result："人民币壹仟陆佰捌拾贰元整"
    //upDigit(-1693)
    //result："欠人民币壹仟陆佰玖拾叁元整"
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
    //清除对象中值为空的属性
    //filterParams({a:"",b:null,c:"010",d:123})
    //Object {c: "010", d: 123}
    filterParams(obj) {
        let _newPar = {};
        for (let key in obj) {
            if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                _newPar[key] = obj[key];
            }
        }
        return _newPar;
    },
    //数据类型判断
    //ecDo.istype([],'array')
    //true
    //ecDo.istype([])
    //'[object Array]'
    isType(o, type) {
        switch (type.toLowerCase()) {
            case 'string':
                return Object.prototype.toString.call(o) === '[object String]';
            case 'number':
                return Object.prototype.toString.call(o) === '[object Number]';
            case 'boolean':
                return Object.prototype.toString.call(o) === '[object Boolean]';
            case 'undefined':
                return Object.prototype.toString.call(o) === '[object Undefined]';
            case 'null':
                return Object.prototype.toString.call(o) === '[object Null]';
            case 'function':
                return Object.prototype.toString.call(o) === '[object Function]';
            case 'array':
                return Object.prototype.toString.call(o) === '[object Array]';
            case 'object':
                return Object.prototype.toString.call(o) === '[object Object]';
            case 'nan':
                return isNaN(o);
            case 'elements':
                return Object.prototype.toString.call(o).indexOf('HTML') !== -1
            default:
                return Object.prototype.toString.call(o)
        }
    },
    //表单验证
    validateForm:(function () {
        let ruleData = {
            /**
             * @description 不能为空
             * @param val
             * @param msg
             * @return {*}
             */
            isNoNull(val, msg){
                if (!val) {
                    return msg
                }
            },
            /**
             * @description 最小长度
             * @param val
             * @param length
             * @param msg
             * @return {*}
             */
            minLength(val, length, msg){
                if (val.toString().length < length) {
                    return msg
                }
            },
            /**
             * @description 最大长度
             * @param val
             * @param length
             * @param msg
             * @return {*}
             */
            maxLength(val, length, msg){
                if (val.toString().length > length) {
                    return msg
                }
            },
            /**
             * @description 是否是手机号码格式
             * @param val
             * @param msg
             * @return {*}
             */
            isMobile(val, msg){
                if (!/^1[3-9]\d{9}$/.test(val)) {
                    return msg
                }
            },
            /**
             * @description 是否是固定电话
             * @param val
             * @param msg
             * @return {*}
             */
            isTel(val, msg){
                if (!/^\d{3}-\d{8}|\d{4}-\d{7}|\d{11}$/.test(val)) {
                    return msg
                }
            },
            /**
             * @description 是否是邮箱
             * @param val
             * @param msg
             * @return {*}
             */
            isEmail(val, msg){
                if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-zd]{2,5}$/.test(val)) {
                    return msg
                }
            },
            /**
             * @description 是否是号码格式（身份证）
             * @param val
             * @param msg
             * @return {*}
             */
            isCard(val, msg){
                if (!/^\d{15}$|^\d{18}$/.test(val)) {
                    return msg
                }
            },
            /**
             * @description 是否是数字格式
             * @param val
             * @param msg
             * @return {*}
             */
            isNumber(val, msg){
                if (!/^[0-9]+$/.test(val)) {
                    return msg
                }
            },
            /**
             * @description 是否是有效数值格式（两个小数点）
             * @param val
             * @param msg
             * @return {*}
             */
            isCount(val, msg){
                if (!/^[1-9]{1}\d*(.\d{1,2})?$|^[0]{1}$|^0.\d{1,2}$/.test(val)) {
                    return msg
                }
            },
            /**
             * @description 是否是中文格式
             * @param val
             * @param msg
             * @return {*}
             */
            isChinese(val, msg){
                if (!/^[^\u4E00-\u9FA5]+$/.test(val)) {
                    return msg
                }
            },
            /**
             * @description 是否是英文字母格式
             * @param val
             * @param msg
             * @return {*}
             */
            isEnglish(val, msg){
                if (!/^[a-zA-Z]+$/.test(val)) {
                    return msg
                }
            },
            /**
             * @description 是否是大写英文字母格式
             * @param val
             * @param msg
             * @return {*}
             */
            isUpperEnglish(val, msg){
                if (!/^[A-Z]+$/.test(val)) {
                    return msg
                }
            },
            /**
             * @description 是否是小写英文字母格式
             * @param val
             * @param msg
             * @return {*}
             */
            isLowerEnglish(val, msg){
                if (!/^[a-z]+$/.test(val)) {
                    return msg
                }
            },
            /**
             * @description 是否是密码
             * @param val
             * @param msg
             * @return {*}
             */
            isPassWord(val, msg){
                if (!/^[a-zA-Z0-9._-]+$/.test(val)) {
                    return msg
                }
            },
        }
        return {
            /**
             * @description 查询接口
             * @param arr
             * @return {*}
             */
            check: function (arr) {
                let ruleMsg, checkRule, _rule;
                for (let i = 0, len = arr.length; i < len; i++) {
                    //如果字段找不到
                    if (arr[i].el === undefined) {
                        return '字段找不到！'
                    }
                    //遍历规则
                    for (let j = 0; j < arr[i].rules.length; j++) {
                        //提取规则
                        checkRule = arr[i].rules[j].rule.split(":");
                        _rule = checkRule.shift();
                        checkRule.unshift(arr[i].el);
                        checkRule.push(arr[i].rules[j].msg);
                        //如果规则错误
                        ruleMsg = ruleData[_rule].apply(null, checkRule);
                        if (ruleMsg) {
                            //返回错误信息
                            return ruleMsg;
                        }
                    }
                }
            },
            /**
             * @description 校验所有接口
             * @param arr
             * @return {*}
             */
            checkAll: function (arr) {
                let ruleMsg, checkRule, _rule,msgArr=[];
                for (let i = 0, len = arr.length; i < len; i++) {
                    //如果字段找不到
                    if (arr[i].el === undefined) {
                        return '字段找不到！'
                    }
                    //如果字段为空以及规则不是校验空的规则

                    //遍历规则
                    for (let j = 0; j < arr[i].rules.length; j++) {
                        //提取规则
                        //如果字段为空且规则不是校验空值，执行下次循环
                        if ((arr[i].el === ''||arr[i].el === null)&&arr[i].rules[j].rule[0]!=='isNoNull') {
                            continue;
                        }
                        checkRule = arr[i].rules[j].rule.split(":");
                        _rule = checkRule.shift();
                        checkRule.unshift(arr[i].el);
                        checkRule.push(arr[i].rules[j].msg);
                        //如果规则错误
                        ruleMsg = ruleData[_rule].apply(null, checkRule);
                        if (ruleMsg) {
                            //返回错误信息
                            msgArr.push({
                                el:arr[i].el,
                                alias:arr[i].alias,
                                rules:_rule,
                                msg:ruleMsg
                            });
                        }
                    }
                }
                return msgArr.length>0?msgArr:false;
            },
            /**
             * @description 添加规则接口
             * @param type
             * @param fn
             */
            addRule:function (type,fn) {
                ruleData[type]=fn;
            }
        }
    })(),
    //手机类型判断
    browserInfo(type) {
        switch (type) {
            case 'android':
                return navigator.userAgent.toLowerCase().indexOf('android') !== -1
            case 'iphone':
                return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
            case 'ipad':
                return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
            case 'weixin':
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            default:
                return navigator.userAgent.toLowerCase()
        }
    },
    //函数节流
    // let count=0;
    // function fn1(){
    //     count++;
    //     console.log(count)
    // }
    // //100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
    // document.onmousemove=delayFn(fn1,100,200)
    delayFn(fn, delay, mustDelay) {
        let timer = null;
        let t_start;
        return function () {
            let context = this, args = arguments, t_cur = +new Date();
            //先清理上一次的调用触发（上一次调用触发事件不执行）
            clearTimeout(timer);
            //如果不存触发时间，那么当前的时间就是触发时间
            if (!t_start) {
                t_start = t_cur;
            }
            //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
            if (t_cur - t_start >= mustDelay) {
                fn.apply(context, args);
                t_start = t_cur;
            }
            //否则延迟执行
            else {
                timer = setTimeout(() => {
                    fn.apply(context, args);
                }, delay);
            }
        };
    },
//***************对象及其他模块END**************************/
//***************cookie模块*******************************/
    //设置cookie
    setCookie(name, value, iDay) {
        let oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + ';expires=' + oDate;
    },
    //获取cookie
    getCookie(name) {
        let arr = document.cookie.split('; '),arr2;
        for (let i = 0; i < arr.length; i++) {
            arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
        return '';
    },
    //删除cookie
    removeCookie(name) {
        this.setCookie(name, 1, -1);
    },
//***************cookie模块END*******************************/
//***************DOM模块*******************************/
    //检测对象是否有哪个类名
    hasClass(obj, classStr) {
        if (obj.className && this.trim(obj.className, 1) !== "") {
            let arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
            return (arr.indexOf(classStr) === -1) ? false : true;
        }
        else {
            return false;
        }

    },
    //添加类名
    addClass(obj, classStr) {
        if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
            for (let i = 0, len = obj.length; i < len; i++) {
                if (!this.hasClass(obj[i], classStr)) {
                    obj[i].className += " " + classStr;
                }
            }
        }
        else {
            if (!this.hasClass(obj, classStr)) {
                obj.className += " " + classStr;
            }
        }
    },
    //删除类名
    removeClass(obj, classStr) {
        let reg;
        if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
            for (let i = 0, len = obj.length; i < len; i++) {
                if (this.hasClass(obj[i], classStr)) {
                    reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                    obj[i].className = obj[i].className.replace(reg, '');
                }
            }
        }
        else {
            if (this.hasClass(obj, classStr)) {
                reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                obj.className = obj.className.replace(reg, '');
            }
        }
    },
    //替换类名("被替换的类名","替换的类名")
    replaceClass(obj, newName, oldName) {
        this.removeClass(obj, oldName);
        this.addClass(obj, newName);
    },
    //获取兄弟节点
    //ecDo.siblings(obj,'#id')
    siblings(obj, opt) {
        let a = []; //定义一个数组，用来存obj的兄弟元素
        let p = obj.previousSibling;
        while (p) { //先取obj的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
            if (p.nodeType === 1) {
                a.push(p);
            }
            p = p.previousSibling //最后把上一个节点赋给p
        }
        a.reverse(); //把顺序反转一下 这样元素的顺序就是按先后的了
        let n = obj.nextSibling; //再取obj的弟弟
        while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
            if (n.nodeType === 1) {
                a.push(n);
            }
            n = n.nextSibling;
        }
        if (opt) {
            let _opt = opt.substr(1);
            let b = [];//定义一个数组，用于储存过滤a的数组
            if (opt[0] === '.') {
                b = a.filter(item => item.className === _opt);
            }
            else if (opt[0] === '#') {
                b = a.filter(item => item.id === _opt);
            }
            else {
                b = a.filter(item => item.tagName.toLowerCase() === opt);
            }
            return b;
        }
        return a;
    },
    //设置样式
    css(dom, json) {
        if (dom.length) {
            for (let i = 0; i < dom.length; i++) {
                for (let attr in json) {
                    dom[i].style[attr] = json[attr];
                }
            }
        }
        else {
            for (let attr in json) {
                dom.style[attr] = json[attr];
            }
        }
    },
    //设置HTML内容
    html(obj) {
        if (arguments.length === 1) {
            return obj.innerHTML;
        } else if (arguments.length === 2) {
            obj.innerHTML = arguments[1];
        }
    },
    //设置HTML内容
    text(obj) {
        if (arguments.length === 1) {
            return obj.innerHTML;
        } else if (arguments.length === 2) {
            obj.innerHTML = this.filterStr(arguments[1], 'html');
        }
    },
    //显示隐藏
    show(obj) {
        let blockArr = ['div', 'li', 'ul', 'ol', 'dl', 'table', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'header', 'footer', 'details', 'summary', 'section', 'aside', '']
        if (blockArr.indexOf(obj.tagName.toLocaleLowerCase()) === -1) {
            obj.style.display = 'inline';
        }
        else {
            obj.style.display = 'block';
        }
    },
    hide(obj) {
        obj.style.display = "none";
    },
    /* 封装ajax函数
     * @param {string}obj.type http连接的方式，包括POST和GET两种方式
     * @param {string}obj.url 发送请求的url
     * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
     * @param {object}obj.data 发送的参数，格式为对象类型
     * @param {function}obj.success ajax发送并接收成功调用的回调函数
     * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
     */
    //  ajax({
    //  	type:'get',
    //  	url:'xxx',
    //  	data:{
    //  		id:'111'
    //  	},
    //  	success:function(res){
    //  		console.log(res)
    //  	}
    //  })
    ajax(obj){
        obj = Object.assign({
            type: 'POST',
            url: '',
            async: true,
            data: null,
            success() {},
            error() {}
        }, obj);
        obj.type = obj.type.toUpperCase();
        let xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        let params = [];
        for (let key in obj.data) {
            params.push(key + '=' + obj.data[key]);
        }
        let postData = params.join('&');
        if (obj.type.toUpperCase() === 'POST') {
            xmlHttp.open(obj.type, obj.url, obj.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (obj.type.toUpperCase() === 'GET') {
            xmlHttp.open(obj.type, `${obj.url}?${postData}`, obj.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                obj.success(xmlHttp.responseText);
            } else {
                obj.error(xmlHttp.responseText);
            }
        };
    },
    //图片没加载出来时用一张图片代替
    aftLoadImg(obj, url, errorUrl, cb) {
        let oImg = new Image(), _this = this;
        oImg.src = url;
        oImg.onload = function () {
            obj.src = oImg.src;
            if (cb && _this.istype(cb, 'function')) {
                cb(obj);
            }
        };
        oImg.onerror = function () {
            obj.src = errorUrl;
            if (cb && _this.istype(cb, 'function')) {
                cb(obj);
            }
        }
    },
    //图片滚动懒加载
    //@className {string} 要遍历图片的类名
    //@num {number} 距离多少的时候开始加载 默认 0
    //比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
    //html代码
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....
    //data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
    //详细可以查看testLoadImg.html

    //window.onload = function() {
    //	loadImg('load-img',100);
    //	window.onscroll = function() {
    //		loadImg('load-img',100);
    //		}
    //}
    loadImg(className = 'ec-load-img', num = 0, errorUrl = null) {
        let oImgLoad = document.getElementsByClassName(className);
        for (let i = 0, len = oImgLoad.length; i < len; i++) {
            //如果图片已经滚动到指定的高度
            if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - num && !oImgLoad[i].isLoad) {
                //记录图片是否已经加载
                oImgLoad[i].isLoad = true;
                //设置过渡，当图片下来的时候有一个图片透明度变化
                oImgLoad[i].style.cssText = "transition: ''; opacity: 0;";
                if (oImgLoad[i].dataset) {
                    this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, errorUrl, function (o) {
                        //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
                        setTimeout(()=>{
                            if (o.isLoad) {
                                this.removeClass(o, className);
                                o.style.cssText = "";
                            }
                        }, 1000)
                    });
                } else {
                    this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), errorUrl, function (o) {
                        //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
                        setTimeout(()=>{
                            if (o.isLoad) {
                                this.removeClass(o, className);
                                o.style.cssText = "";
                            }
                        }, 1000)
                    });
                }
                (function (i) {
                    setTimeout(()=>{
                        oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                    }, 16)
                })(i);
            }
        }
    },
    //创建正则字符
    createKeyExp(strArr) {
        let str = "";
        for (let i = 0; i < strArr.length; i++) {
            if (i !== strArr.length - 1) {
                str = str + strArr[i] + "|";
            } else {
                str = str + strArr[i];
            }
        }
        return "(" + str + ")";
    },
    //关键字加标签（多个关键词用空格隔开）
    //ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')
    //"<i>守侯</i>我oaks接到了来自下次你离<i>开</i>快乐吉祥留在<i>开</i>城侯"
    findKey(str, key, el = 'span') {
        let arr = null, regStr = null, content = null, Reg = null;
        arr = key.split(/\s+/);
        //alert(regStr); //    如：(前端|过来)
        regStr = this.createKeyExp(arr);
        content = str;
        //alert(Reg);//        /如：(前端|过来)/g
        Reg = new RegExp(regStr, "g");
        //过滤html标签 替换标签，往关键字前后加上标签
        content = content.replace(/<\/?[^>]*>/g, '')
        return content.replace(Reg, "<" + el + ">$1</" + el + ">");
    },
//***************DOM模块END*******************************/
};
//ecDo.checkType=ecDo.checkType();