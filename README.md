## ec-do

#### 自己封装的常用操作实例
实例为日常开发常用的小实例，包括数组去重，打乱数组，字母大小写转换，cookie操作的封装等。

#### 使用方法
##### 引入ec-do.js
//去除空格

ecDo.trim(' xx x x',1);

//xxxx


//大小写转换

ecDo.changeCase('asdXaaaXHwwHwwad',3)

//"ASDxAAAxhWWhWWAD"

具体使用方式在ec-do.js里面有说明

#### 1.1.0版本

##### 更新方法
1.upDigit(现金额大写转换函数)存在的bug修复！

2.changeCase(大小写转换函数)存在的bug修复！

3.covArr(求数组平均数)存在的bug修改!

4.随机码函数重命名，以前这个随机码函数名是randomNumber，和另一个函数重名了！现在命名randomWord，使用方式不变

##### 优化写法

1.sumArr（数字数组求和）

##### 增加方法

1.ecAjax(封装ajax操作函数)

2.getOptionArray(获取对象数组某些项)

3.filterOptionArray(排除数组某些项)

4.loadImg(图片滚动懒加载)

5.aftLoadImg(加载图片)

6.longestWord(找出最长单词)

7.titleCaseUp(句中单词首字母大写)

8.browserInfo(手机类型判断)

9.filterStr(过滤字符串(html标签，表情，特殊字符，)

10.createKeyExp(创建正则字符)

11.findKey(高亮文本)

12.istype(数据类型判断)

13.steamroller(数组扁平化)

14.arraySort(对象数组排序)

#### 1.1.2版本更新
##### removeClass（删除类名）
之前是只能处理单个html元素，传入html集合或者html元素数组，运行会报错，现在即使传入的是一个html集合或者html元素数组，都可以处理

##### addClass（增加类名）
之前是只能处理单个html元素，传入html集合或者html元素数组，运行会报错，现在即使传入的是一个html集合或者html元素数组，都可以处理

##### hasClass（检测对象是否有哪个类名）
之前如果传进来的obj本身没有class属性，或者class为空的情况下，运行会报错，现在返回fasle

##### siblings（获取兄弟节点）
增加筛选条件，支持标签名，class，id
//之前支持一种写法

ecDo.siblings(obj)

//现在写法

//返回所有兄弟节点

ecDo.siblings(obj)

//返回兄弟节点且兄弟节点id为‘cur’

ecDo.siblings(obj,'#cur')

//返回兄弟节点且兄弟节点class为‘cur’

ecDo.siblings(obj,'.cur')

//返回兄弟节点且兄弟节点标签为a

ecDo.siblings(obj,'a')

#### 1.1.3版本增加

//格式化输入

ecDo.formatText(str,4,'-')

//函数节流

ecDo.delayFn(fn1,100,200)

#### 1.1.4版本修改
ecDo.loadImg方法，增加图片请求失败时，可以添加自定义图片

    //图片请求失败，显示自定义图片

    window.onload = function () {
        ecDo.loadImg('load-img', 100, 'error.jpg');
        window.onscroll = function () {
            ecDo.loadImg('load-img', 100, 'error.jpg');
        }
    }
    //图片请求失败，显示空白图片
    window.onload = function () {
        ecDo.loadImg('load-img', 100);
        window.onscroll = function () {
            ecDo.loadImg('load-img', 100);
        }
    }


增加text方法

    var oDiv=document.getElementById("div1");

    ecDo.text(oDiv,'<div id="div2">45132134656</div>');
    //结果
    <div id="div1">45132134656</div>
## LICENSE
MIT