## ec-do

#### 自己封装的常用操作实例
实例为日常开发常用的小实例，包括数组去重，打乱数组，字母大小写转换，cookie操作的封装等。

### 使用方法

#### 引入ec-do.js
//去除空格

ecDo.trim(' xx x x',1);

//xxxx


//大小写转换

ecDo.changeCase('asdXaaaXHwwHwwad',3)

//"ASDxAAAxhWWhWWAD"

具体使用方式在ec-do.js里面有说明

### 版本说明

#### ecDo 1.x使用es5语法编写
#### ecDo 2.x使用es6语法编写
#### ecDo 3.x使用es6语法编写，目前仍在测试阶段

### 具体方法

> 下面方法，如果在 **demo** 看到 **'result：'** 证明此函数是拥有返回值的函数，否则函数就没有返回值

### 1.trim

##### description

    ecDo.trim(str)

description-清除字符串的左右空格

param **{String}** str-待处理的字符串

##### demo

    ecDo.trim('  1235asd ')
result：'1235asd'

### 2.trimAll

##### description

    ecDo.trimAll(str)

description-清除字符串的所有空格

param **{String}** str-待处理的字符串

##### demo

    ecDo.trim('  1235  asd ')
result：'1235asd'

### 3.trimLeft

##### description

    ecDo.trimLeft(str)

description-清除字符串的左空格

param **{String}** str-待处理的字符串

##### demo

    ecDo.trim('  1235  asd ')
result：'1235  asd '

### 4.trimRight

##### description

    ecDo.trimRight(str)

description-清除字符串的右空格

param **{String}** str-待处理的字符串

##### demo

    ecDo.trim('  1235  asd ')
result：'  1235  asd'

### 5.toggleCase

##### description

    ecDo.toggleCase(str)

description-大小写转换

param **{String}** str-待处理的字符串

##### demo

    ecDo.toggleCase('aSDasd')
 result：'AsdASD'

### 6.firstWordUpper

##### description

    ecDo.firstWordUpper(str)

description-首字母大写

param **{String}** str-待处理的字符串

##### demo

    ecDo.firstWordUpper('shouhou')
 result：'Shouhou'

### 7.firstWordLower

##### description

    ecDo.firstWordLower(str)

description-首字母小写

param **{String}** str-待处理的字符串

##### demo

    ecDo.firstWordLower('ASDSAD')
 result：'aSDSAD'

### 9.replaceAll

##### description

    ecDo.replaceAll(str, AFindText, ARepText)

description-字符串替换

param **{String}** str-待处理的字符串

param **{String}** AFindText-要替换的字符或者正则表达式（不要写g）

param **{String}** ARepText-替换成什么

##### demo

    ecDo.replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州')
    result："这里是广州，中国第三大城市，广东省省会，简称穗，"

### 10.encryptStr

##### description

    ecDo.encryptStr(str, regIndex, ARepText = '*')

description-加密字符串*

param **{String}** str-待处理的字符串

param **{Array}** regIndex-要加密的字符串的位置

param **{String}** ARepText-加密显示的字符，默认是‘*’

##### demo

    ecDo.encryptStr('18819233362','3,7','+')//位置3-7的统一被替换成+
result：188+++++362

### 11.encryptUnStr

##### description

    ecDo.encryptStr(str, regIndex, ARepText = '*')

description-不加密字符串*

param **{String}** str-待处理的字符串

param **{Array}** regIndex-不加密的字符串的位置

param **{String}** ARepText-加密显示的字符，默认是‘*’

##### demo

    ecDo.encryptUnStr('18819233362','3,7','+')//位置3-7的之外的字符全部替换成+
result：188+++++362

### 12.encryptStartStr

##### description

    ecDo.encryptStartStr(str, length, ARepText = '*')

description-字符串开始位置加密

param **{String}** str-待处理的字符串

param **{Array}** regIndex-加密字符串的长度

param **{String}** ARepText-加密显示的字符，默认是‘*’

##### demo

    ecDo.encryptStartStr('18819233362','4')//从开始位置计算，前4位加密
result：****9233362

### 13.encryptEndStr

##### description

    ecDo.encryptStartStr(str, length, ARepText = '*')

description-字符串结尾位置加密

param **{String}** str-待处理的字符串

param **{Array}** regIndex-加密字符串的长度

param **{String}** ARepText-加密显示的字符，默认是‘*’

##### demo

    ecDo.encryptEndStr('18819233362','4')//从结尾位置计算，后4位加密
result：1881923****

### 14.checkType

##### description

    ecDo.checkType(str, type)

description-检测字符串

param **{String}** str-待处理的字符串

param **{String}** type-数据格式(email,phone,tel,number,english,text,chinese,lower,upper) 可根据需要进行扩展

##### demo

    console.log(ecDo.checkType.check('18819663362','mobile'));
    //true
    //添加扩展
    ecDo.checkType.addRule('password',function (str) {
        return /^[-a-zA-Z0-9._]+$/.test(str);
    })

    ecDo.checkType.check('****asdasd654zxc', 'password')//false


### 15.checkPwdLevel

##### description

    ecDo.checkPwdLevel(str)

description-检测密码强度

param **{String}** str-待检测的字符串

##### demo

    ecDo.checkPwdLevel('12asdASAD')
    result：result：3(强度等级为3，大写+1，小写+1，数字+1，'-','.','_'任意一字符+1，长度小于6等级为0)

### 16.randomWord

##### description

    ecDo.randomWord(count)

description-随机码

param **{int}** count-取值范围2-36

##### demo

    ecDo.randomWord(10)
    result："2584316588472575"

    ecDo.randomWord(14)
    result："9b405070dd00122640c192caab84537"

    ecDo.randomWord(36)
    result："83vhdx10rmjkyb9"


### 17.countStr

##### description

    ecDo.countStr(str, strSplit)

description-检测字符串的出现次数

param **{String}** str-待处理的字符串

param **{String}** strSplit-待检测的字符串

##### demo

    var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
    ecDo.countStr(strTest,'blog')
    result：6

### 18.filterStr

##### description

     ecDo.filterStr.handle(type,str,restr,restr)

description-过滤字符串

param **{String}** type-过滤的类型（specialStr-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），可根据需要进行扩展

param **{String}** str-待处理的字符串

param **{String}** restr-替换成的字符，默认''

param **{String}** spstr-保留的特殊字符

##### demo

    console.log(`过滤字符|${ecDo.filterStr.handle('specialStr','sadasdasdzxc4512235%$@^&^@*!(4613zxc','','@')}|`);//除了@，其他特殊字符全部被过滤
    //添加扩展
    ecDo.filterStr.addType('english',function (str,replaceStr='') {
        return str.replace(/[a-zA-Z]/g, replaceStr);
    });
    //过滤英文字母
     console.log(ecDo.filterStr.handle('english','asdasd46撒打算的','.',''));

### 19.filterSpecialStr

##### description

     ecDo.filterSpecialStr(str, type, restr, spstr)

description-过滤字符串的特殊符号

param **{String}** str-待处理的字符串

param **{String}** restr-替换成的字符，默认''

param **{String}** spstr-保留的特殊字符

##### demo

    console.log(`${ecDo.filterSpecialStr('sadasdasdzxc4512235%$@^&^@*!(4613zxcasdasd46撒打算的','','@')}`);//除了@，其他特殊字符全部被替换成空格
result:sadasdasdzxc4512235@@4613zxcasdasd46

### 20.filterHtml

##### description

     ecDo.filterHtml(str, type)

description-过滤字符串的html标签

param **{String}** str-待处理的字符串

param **{String}** restr-替换成的字符，默认''

##### demo

    console.log(ecDo.filterHtml('<title>Title</title>'));
result:Title

### 22.filterEmjoy

##### description

     ecDo.filterEmjoy(str, type)

description-过滤字符串的大写字母

param **{String}** str-待处理的字符串

param **{String}** restr-替换成的字符，默认''

##### demo

    console.log(ecDo.filterEmjoy('\u4e00asdasdWECASasd'));
result:— asdasdWECASasd


### 22.filterWordUpper

##### description

     ecDo.filterWordUpper(str, type)

description-过滤字符串的大写字母

param **{String}** str-待处理的字符串

param **{String}** restr-替换成的字符，默认''

##### demo

    console.log(ecDo.filterWordUpper('asdasdWECASasd'));
result:asdasdasd

### 23.filterWordLower

##### description

     ecDo.filterWordLower(str, type)

description-过滤字符串的小写字母

param **{String}** str-待处理的字符串

param **{String}** restr-替换成的字符，默认''

##### demo

    console.log(ecDo.filterWordLower('asdasdWECASasd'));
result:WECAS

### 24.filterNumber

##### description

     ecDo.filterNumber(str, type)

description-过滤字符串的数字

param **{String}** str-待处理的字符串

param **{String}** restr-替换成的字符，默认''

##### demo

    console.log(ecDo.filterNumber('asdasd67w9e41z5xc'));
result:asdasdwezxc

### 25.filterChinese

##### description

     ecDo.filterChinese(str, type)

description-过滤字符串的中文字符

param **{String}** str-待处理的字符串

param **{String}** restr-替换成的字符，默认''

##### demo

    console.log(ecDo.filterChinese('8963325asd阿斯达所多1'));
result:8963325asd1


### 26.formatText

##### description

    ecDo.formatText(str, size, delimiter)

description-格式化处理字符串

param **{String}** str-待处理的字符串

param **{Int}** size-间隔

param **{String}** delimiter-间隔符，默认','

##### demo

    ecDo.formatText('1234asda567asd890')
    result："12,34a,sda,567,asd,890"

    ecDo.formatText('1234asda567asd890',4,' ')
    result："1 234a sda5 67as d890"

    ecDo.formatText('1234asda567asd890',4,'-')
    result："1-234a-sda5-67as-d890"

### 27.longestWord

##### description

    ecDo.formatText(str, splitType)

description-找出最长单词

param **{String}** str-字符串

param **{splitType}** size-间隔符，默认' '

##### demo

    ecDo.longestWord('Find the Longest word in a String')
    result: {el: "Longest", max: 7}

    ecDo.longestWord('Find|the|Longest|word|in|a|String','|')
    result: {el: "Longest", max: 7}

### 28.titleCaseUp

##### description

    ecDo.titleCaseUp(str, splitType)

description-句中单词首字母大写

param **{String}** str

param **{splitType}** size-间隔符，默认' '

##### demo

    ecDo.titleCaseUp('this is a title')
result: "This Is A Title"

    ecDo.titleCaseUp('this is a title','|')
result: "This Is A Title"


### 29.unique

##### description

    ecDo.unique(arr)

description-数组去重

param **{Array}** arr-待去重数组

##### demo

    ecDo.unique([1,2,3,4,2,1,2,3,4,5])

result:  [1, 2, 3, 4, 5]

### 30.upsetArr

##### description

    ecDo.upsetArr(arr)

description-数组顺序打乱

param **{Array}** arr-待打乱数组

##### demo
    ecDo.upsetArr([1,2,3,4,5,6,7,8,9,0])
    result:  [7, 1, 3, 2, 4, 6, 8, 9, 0, 5]

### 31.maxArr

##### description

    ecDo.maxArr(arr)

description-获取数组最大值

param **{Array}** arr-待处理数组

##### demo
    ecDo.maxArr([1,2,3,4,5,6,7,8,9,0])
    result:  9
### 32.minArr

##### description

    ecDo.minArr(arr)

description-获取数组最小值

param **{Array}** arr-待处理数组

##### demo
    ecDo.minArr([1,2,3,4,5,6,7,8,9,0])
    result:  0

### 33.sumArr

##### description

    ecDo.sumArr(arr)

description-数组求和

param **{Array}** arr-待处理数组

##### demo
    ecDo.sumArr([1,2,3,4,5,6,7,8,9,0])
    result:  45
### 34.covArr

##### description

    ecDo.covArr(arr)

description-数组求和

param **{Array}** arr-待处理数组

##### demo

    ecDo.covArr([1,2,3,4,5,6,7,8,9,0])
    result:  4.5

### 35.randomOne

##### description

    ecDo.randomOne(arr)

description-从数组中随机获取一个元素

param **{Array}** arr-待处理数组

##### demo
    ecDo.randomOne(['a','b','c','d','e'])
result:  "c"


### 36.getEleCount

##### description

    ecDo.getEleCount(obj, ele)

description-获取数组（字符串）一个元素出现的次数

param **{Array  String}** obj-待处理数组（字符串）
param **{String}** ele-要匹配的元素

##### demo

    ecDo.getEleCount('asd56+asdasdwqe','a')
    result：3
    ecDo.getEleCount([1,2,3,4,5,66,77,22,55,22],22)
    result：2

### 37.getCount

##### description

    ecDo.getCount(arr)

description-获取数组（字符串）所有元素的出现次数

param **{Array  String}** obj-待处理数组（字符串）

##### demo

    //返回所有情况
    ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])

result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2},{"el":"4","count":1},{"el":"5","count":1},{"el":"6","count":1}]

### 38.getArrayNum

##### description

    ecDo.getEleCount(obj, ele)

description-得到n1-n2下标的数组

param **{Array}** obj-待处理数组
param **{int}** n1-开始下标
param **{int}** n2-结束下标（不能比n1小）

##### demo

    ecDo.getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
result：[5, 6, 7, 8, 9]
    ecDo.getArrayNum([0,1,2,3,4,5,6,7,8,9],2)
    //不传第二个参数,默认返回从n1到数组结束的元素
result：[2, 3, 4, 5, 6, 7, 8, 9]

### 39.removeArrayForValue

##### description

    ecDo.removeArrayForValue(arr, val, type)

description-删除值为'val'的数组元素

param **{Array}** obj-待处理数组
param **{Sting}** val-要匹配的字符

##### demo
    //数组元素的值全等于'test'才被删除
    ecDo.removeArrayForValue(['test','test1','test2','test','aaa'],'test')
result：["test1", "test2", "aaa"]

### 40.removeArrayForLike

##### description

    ecDo.removeArrayForValue(arr, val, type)

description-删除值含有'val'的数组元素

param **{Array}** obj-待处理数组
param **{Sting}** val-要匹配的字符

##### demo
    //带有'test'的都删除
    ecDo.removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
result：["aaa"]


### 41.getOptionArray

##### description

    ecDo.getOptionArray(arr, keys)

description-获取对象数组某些项

param **{Array}** obj-待处理数组
param **{Sting}** keys-要获取的值的属性，多个属性用','分割

##### demo
    var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]

    ecDo.getOptionArray(arr,'a')
result： [1, 2, 5, 4, 4]

    ecDo.getOptionArray(arr,'a,c')
result：[{a: 1, c: 9},{a: 2, c: 5},{a: 5, c: undefined},{a: 4, c: 5},{a: 4, c: 7}]

### 42.filterOptionArray

##### description

    ecDo.filterOptionArray(arr, keys)

description-过滤对象数组某些项

param **{Array}** arr-待处理数组
param **{Sting}** keys-要过滤的值的属性，多个属性用','分割

##### demo

    var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]

    ecDo.filterOptionArray(arr,'a')
    result： [1, 2, 5, 4, 4]

    ecDo.filterOptionArray(arr,'a,c')
result：[{b: 2},{b: 3},{b: 9},{b: 2},{b: 5}]

### 43.arraySort

##### description

    ecDo.arraySort(arr, sortText)

description-对象数组的排序

param **{Array}** arr-待处理数组
param **{Sting}** sortText-排序字段，多个字段用','分割

##### demo

    var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //a是第一排序条件，b是第二排序条件
    ecDo.arraySort(arr,'a,b')
result：[{"a":1,"b":2,"c":9},{"a":2,"b":3,"c":5},{"a":4,"b":2,"c":5},{"a":4,"b":5,"c":7},{"a":5,"b":9}]

### 44.steamroller

##### description

    ecDo.steamroller(arr)

description-数组扁平化

param **{Array}** arr-待处理数组

##### demo

    ecDo.steamroller([1,2,[4,5,[1,23]]])
result：[1, 2, 4, 5, 1, 23]

### 45.getFontSize

##### description

    ecDo.getFontSize(_client)

description-适配rem

param **{Int}** _client-设计图宽度

##### demo

    ecDo.getFontSize(750)

### 46.getEndTime

##### description

    ecDo.getEndTime(endTime)

description-到某一个时间的倒计时

param **{String}** endTime-结束时间(需要正确的时间格式)

##### demo

    ecDo.getEndTime('2017/11/22 16:0:0')
    //测试时间是2017.11.6  17.14.55   //15天22时46分43秒
result：{
        d:15,
        h:22,
        m:46,
        s:43
    }

### 47.formatDate

##### description

    ecDo.getEndTime(date,fmt)

description-时间格式化

param **{String}** date-时间戳(需要正确的格式)
param **{String}** fmt-时间格式
##### demo

    console.log(ecDo.formatDate(1526071153233));
result：2018-05-12 04:39:13

### 48.randomColor

##### description

    ecDo.getEndTime(endTime)

description-生成随机颜色

##### demo

    console.log(ecDo.randomColor(16));
result:#0d4814
    console.log(ecDo.randomColor());
result:rgb(118,235,151)

### 49.randomNumber

##### description

    ecDo.randomNumber(n1, n2)

description-随机返回一个范围的数字

param **{Int}** n1-最小值

param **{Int}** n2-最大值

##### demo
    //返回5-10的随机整数，包括5，10
    ecDo.randomNumber(5,10)
result：6
    //返回0-10的随机整数，包括0，10
    ecDo.randomNumber(10)
result：7
    //返回0-100000000的随机整数，包括0，10
 ecDo.randomNumber()

### 50.setUrlPrmt

##### description

    ecDo.setUrlPrmt(obj)

description-设置url参数

param **{Object}** url-原链接

param **{Object}** obj-需要设置的参数

##### demo

    console.log(ecDo.setUrlParam('http://sss.com',{'a':1,'b':2}));
result：http://sss.com?a=1&b=2

### 51.getUrlPrmt

##### description

    ecDo.getUrlPrmt(url)

description-获取url参数

param **{String}** url-超链接

##### demo

    ecDo.getUrlPrmt('github.com?draftId=122000011938')
result：{draftId: "122000011938"}

### 52.getUrlPrmt

##### description

    ecDo.upDigit(n)

description-现金额大写转换函数

param **{number}** n-金额数目

##### demo

    ecDo.upDigit(10.5)
result："人民币壹拾元伍角"

    ecDo.upDigit(168752632)
result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"

    ecDoupDigit(1682)
result："人民币壹仟陆佰捌拾贰元整"

    ecDo/upDigit(-1693)
result："欠人民币壹仟陆佰玖拾叁元整"

### 53.filterParams

##### description

    ecDo.filterParams(obj)

description-过滤对象里面值为null或者underfind的的属性underfind的属性

param **{Object}** obj-待处理对象

##### demo

    ecDo.filterParams({a:"",b:null,c:"010",d:123})
    result：{c: "010", d: 123}

### 54.isType

##### description

    ecDo.istype(o, type)

description-数据类型判断

param **{Array|Object|String|Function|Number|Boolean|Undefined|Null|HTML}** o-待处理的对象
param **{String}** type-类型字符串

##### demo

    ecDo.istype([],'array')
    result：true

    ecDo.istype([])
    result：'[object Array]'


### 55.getBrowserInfo

##### description

    ecDo.getBrowserInfo(type)

description-手机类型判断
param **{String}** type-类型字符串（android|iphone|ipad|weixin）

##### demo

    ecDo.getBrowserInfo('android')
result：是安卓就返回true，否则就false

    ecDo.getBrowserInfo()
result：返回手机浏览器的信息

### 56.throttle

##### description

    ecDo.throttle(fn, delay, mustDelay)

description-函数节流
param **{String}** fn-执行的函数
param **{Number}** delay-间隔时间
param **{Number}** mustDelay-最大间隔时间

##### demo

     var count=0;
     function fn1(){
         count++;
         console.log(count)
     }
     //每100ms连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
     document.onmousemove=delayFn(fn1,100,200)

参考：example/throttle.html

### 57.debounce

##### description

    ecDo.debounce(fn, delay)

description-函数节流
param **{String}** fn-执行的函数
param **{Number}** delay-间隔时间

##### demo

     var count=0;
     function fn1(){
         count++;
         console.log(count)
     }
     //鼠标移动事件触发，如果在300毫秒内连续触发事件，一直快速移动（时间间隔小于300毫秒），等到移动的时间间隔大于300毫秒的时候再执行。
     document.onmousemove=debounce(fn1,100,200)

参考：example/delayFn.html

### 58.setCookie

##### description

    ecDo.setCookie(name, value, iDay)

description-设置cookie

param **{String}** name-cookie名
param **{String}** value-cookie值
param **{Int}** iDay-时间（天数）

##### demo

    ecDo.setCookie('test', 'testcookie', 2)

### 59.getCookie

##### description

    ecDo.getCookie(name)

description-获取cookie

param **{String}** name-cookie名

##### demo

    ecDo.getCookie('test')

### 60.removeCookie

##### description

    ecDo.removeCookie(name)

description-删除cookie

param **{String}** name-cookie名

##### demo

    ecDo.removeCookie('test')

### 61.cookie

##### description

    ecDo.cookie(name, value, iDay)

description-设置cookie

param **{String}** name-cookie名
param **{String}** value-cookie值
param **{Int}** iDay-时间（天数）

##### demo

    ecDo.cookie('test', 'testcookie', 2)//设置
    ecDo.cookie('test')//获取
    ecDo.cookie('test', 'testcookie', -1)//删除，中间的值已经没有意义，只要天数设置-1，只要无效


### 62.hasClass

##### description

    ecDo.hasClass(obj, classStr)

description-检测对象是否有哪个类名

param **{Object}** obj-Dom对象
param **{String}** classStr-class名

##### demo

    ecDo.hasClass(obj,'test')
result:true|false

### 63.addClass

##### description

    ecDo.addClass(obj, classStr)

description-添加类名

param **{Object}** obj-Dom对象
param **{String}** classStr-class名

##### demo

    ecDo.addClass(obj,'test')

### 64.removeClass

##### description

    ecDo.removeClass(obj, classStr)

description-添加类名

param **{Object}** obj-Dom对象
param **{String}** classStr-class名

##### demo

    ecDo.removeClass(obj,'test')

### 65.replaceClass

##### description

    ecDo.replaceClass(obj, newName, oldName)

description-替换类名

param **{Object}** obj-Dom对象
param **{String}** newName-被替换的类名
param **{String}** oldName-替换的类名

##### demo

    ecDo.replaceClass(obj,'test','afterClass')

### 66.siblings

##### description

    ecDo.siblings(obj, opt)

description-获取兄弟节点

param **{Object}** obj-Dom对象
param **{String}** opt-过滤条件

##### demo

    ecDo.siblings(obj,'#id')
    result：符合条件的Dom对象


### 67.css

##### description

    ecDo.css(obj,json)

description-设置样式

param **{Object}** obj-Dom对象
param **{Object}** json-样式名

#### demo

    ecDo.css(obj,{'width':'300px','height':'300px'})

### 68.html

##### description

    ecDo.html(obj)
    ecDo.html(obj,str)

description-设置或者获取对象的所有内容

param **{Object}** obj-Dom对象
param **{String}** str-html内容

##### demo

    ecDo.html(obj)
    result：innerHTML

    ecDo.html(obj,'<div>1111</div>')

### 69.text

##### description

    ecDo.text(obj)
    ecDo.text(obj,str)

description-设置或者获取对象的文本

param **{Object}** obj-Dom对象
param **{String}** str-内容(html标签将会被过滤)

##### demo

    ecDo.text(obj)
    result：innerHTML（过滤html标签）

    ecDo.text(obj,'1230.312asd')

### 70.show

##### description

    ecDo.show(obj)

description-显示对象

param **{Object}** obj-Dom对象

##### demo

    ecDo.show(obj)

### 71.hide

##### description

    ecDo.hide(obj)

description-隐藏对象

param **{Object}** obj-Dom对象

##### demo

    ecDo.hide(obj)

### 72.ajax

##### description

    ecDo.ajax(obj)

description-ajax封装参数

param **{Object}** 对象参数

 * @param {string}obj.type http连接的方式，包括POST和GET两种方式
 * @param {string}obj.url 发送请求的url
 * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}obj.data 发送的参数，格式为对象类型
 * @param {function}obj.success ajax发送并接收成功调用的回调函数
 * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数

##### demo

    ecDo.ajax({
      	type:'get',
      	url:'xxx',
      	data:{
      		id:'111'
      	},
      	success:function(res){
      		console.log(res)
      	}
    })

### 73.aftLoadImg

##### description

    ecDo.aftLoadImg({dom, url, errorUrl, fn})

description-图片没加载出来时用一张图片代替

param **{Object}** obj.dom-Dom对象
param **{String}** obj.url-图片的url
param **{String}** obj.errorUrl-出错的图片的url
param **{Function}** obj.fn-回调函数,参数为obj.dom

##### demo

参考example/aftLoadImg.html

### 74.lazyLoadImg

##### description

    ecDo.lazyLoadImg(className, num, errorUrl)

description-图片滚动懒加载

param **{String}** className-遍历Dom带有的类名
param **{String}** num-图片的url
param **{String}** errorUrl-出错的图片的url

##### demo

    //比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载


    //html代码
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....

    //data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
    //详细可以查看testLoadImg.html
        window.onload = function() {
         ecDo.loadImg('load-img',100);
        window.onscroll = function() {
                ecDo. loadImg('load-img',100);
            }
        }

参考example/lazyLoadImg.html

### 75.loadImg

##### description

    ecDo.loadImg(className, cb)

description-图片加载（预加载）

param **{string}** className-遍历Dom带有的类名
param **{function}** cb-加载完毕的回调函数

##### demo

参考example/loadImg.html,example/loadImg1.html

### 76.findKey

##### description

     ecDo.findKey(str, key, el)

description-关键字加标签（高亮）

param **{String}** str-待处理的字符串
param **{String}** key-关键字，多个关键字','分割
param **{String}** el-要添加的元素，html标签元素  默认span

##### demo

    ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开')
result："<span>守侯</span>我oaks接到了来自下次你离<span>开</span>快乐吉祥留在<span>开</span>城侯"

    ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')
result："<i>守侯</i>我oaks接到了来自下次你离<i>开</i>快乐吉祥留在<i>开</i>城侯"

## LICENSE
MIT