/*3.0.0-beta2*/
let ecDom = (function () {
    return {
//***************DOM模块*******************************/
//测试用例参考example/dom.html
        /**
         * @description 检测对象是否有哪个类名
         * @param obj
         * @param classStr
         * @return {boolean}
         */
        hasClass(obj, classStr){
            return obj.className.split(/\s+/).indexOf(classStr) === -1 ? false : true;
        },
        /**
         * @description 添加类名
         * @param obj
         * @param classStr
         * @return {ecDo}
         */
        addClass(obj, classStr){
            if ((this.isType(obj, 'array') || this.isType(obj, 'elements')) && obj.length >= 1) {
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
            return this;
        },
        /**
         * @description 删除类名
         * @param obj
         * @param classStr
         * @return {ecDo}
         */
        removeClass(obj, classStr){
            let reg;
            if ((this.isType(obj, 'array') || this.isType(obj, 'elements')) && obj.length > 1) {
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
            return this;
        },
        /**
         * @description 替换类名
         * @param obj
         * @param newName
         * @param oldName
         * @return {ecDo}
         */
        replaceClass(obj, newName, oldName){
            this.removeClass(obj, oldName);
            this.addClass(obj, newName);
            return this;
        },
        /**
         * @description 获取兄弟节点
         * @param obj
         * @param opt
         * @return {Array}
         */
        siblings(obj, opt){
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
        /**
         * @description 设置样式
         * @param dom
         * @param json
         * @return {ecDo}
         */
        css(dom, json){
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
            return this;
        },
        /**
         * @description 设置或获取innerHTML
         * @param obj
         * @return {*}
         */
        html(obj){
            if (arguments.length === 1) {
                return obj.innerHTML;
            } else if (arguments.length === 2) {
                obj.innerHTML = arguments[1];
            }
            return this;
        },
        /**
         * @description 设置或获取文本内容
         * @param obj
         * @return {*}
         */
        text(obj){
            if (arguments.length === 1) {
                return obj.innerHTML;
            } else if (arguments.length === 2) {
                obj.innerHTML = this.filterStr(arguments[1], 'html');
            }
            return this;
        },
        /**
         * @description 显示元素
         * @param obj
         * @return {ecDo}
         */
        show(obj){
            let blockArr = ['div', 'li', 'ul', 'ol', 'dl', 'table', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'header', 'footer', 'details', 'summary', 'section', 'aside']
            if (blockArr.indexOf(obj.tagName.toLocaleLowerCase()) === -1) {
                obj.style.display = 'inline';
            }
            else {
                obj.style.display = 'block';
            }
            return this;
        },
        /**
         * @description 隐藏元素
         * @param obj
         * @return {ecDo}
         */
        hide(obj){
            obj.style.display = "none";
            return this;
        },
        /** @description  封装ajax函数
         *  @param {string}obj.type http连接的方式，包括POST和GET两种方式
         *  @param {string}obj.url 发送请求的url
         *  @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
         *  @param {object}obj.data 发送的参数，格式为对象类型
         *  @param {function}obj.success ajax发送并接收成功调用的回调函数
         *  @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
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
            let _options = Object.assign({
                type: 'GET',
                url: '',
                async: true,
                data: null,
                success() {
                },
                error() {
                }
            }, obj);
            _options.type = _options.type.toUpperCase();
            let xmlHttp = null;
            if (XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            } else {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            let params = [];
            for (let key in _options.data) {
                params.push(key + '=' + _options.data[key]);
            }
            let postData = params.join('&');
            if (_options.type.toUpperCase() === 'GET') {
                xmlHttp.open(_options.type, `${_options.url}?${postData}`, _options.async);
                xmlHttp.send(null);
            } else if (_options.type.toUpperCase() === 'POST') {
                xmlHttp.open(_options.type, _options.url, _options.async);
                xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                xmlHttp.send(postData);
            }
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    _options.success(xmlHttp.responseText);
                } else {
                    _options.error(xmlHttp.responseText);
                }
            };
        },
        /**
         * @description 图片没加载出来时用一张图片代替
         * @param obj.dom
         * @param obj.url
         * @param obj.errorUrl
         * @param obj.fn
         */
        aftLoadImg(obj){
            let oImg = new Image(), _this = this;
            oImg.src = obj.url;
            oImg.onload = function () {
                obj.dom.src = oImg.src;
                if (obj.fn && _this.isType(obj.fn, 'function')) {
                    obj.fn(obj.dom,true);
                }
            };
            if (obj.errorUrl) {
                oImg.onerror = function () {
                    obj.src = obj.errorUrl;
                    if (obj.fn && _this.isType(obj.fn, 'function')) {
                        obj.fn(obj.dom,false);
                    }
                }
            }
        },
        /**
         * @description 图片滚动懒加载
         * @param className 要遍历图片的类名
         * @param num 距离多少的时候开始加载 默认 0
         * @param errorUrl 出错时候的图片
         */
        lazyLoadImg(className = 'ec-load-img', num = 0, errorUrl = null){
            let oImgLoad = document.getElementsByClassName(className), _this = this, _src = '';
            for (let i = 0, len = oImgLoad.length; i < len; i++) {
                //如果图片已经滚动到指定的高度
                if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - num && !oImgLoad[i].isLoad) {
                    //记录图片是否已经加载
                    oImgLoad[i].isLoad = true;
                    //设置过渡，当图片下来的时候有一个图片透明度变化
                    oImgLoad[i].style.cssText = "transition: ''; opacity: 0;";
                    oImgLoad[i].style.transition = "";
                    oImgLoad[i].style.opacity = "0";
                    _src = oImgLoad[i].dataset ? oImgLoad[i].dataset.src : oImgLoad[i].getAttribute("data-src");
                    this.aftLoadImg({
                        dom: oImgLoad[i],
                        url: _src,
                        errorUrl: errorUrl,
                        fn: function (o) {
                            //添加定时器，确保图片已经加载完了，一秒后再把图片指定的css样式清掉
                            setTimeout(() => {
                                if (o.isLoad) {
                                    o.style.transition = "";
                                }
                            }, 1000)
                        }
                    });
                    //加上动画，透明度样式
                    (function (i) {
                        setTimeout(() => {
                            oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                        }, 16)
                    })(i);
                }
            }
        },
        /**
         * @description 加载图片
         * @param className
         * @param cb
         */
        loadImg(className, cb){
            let _dom = [...document.querySelectorAll('.' + className)], now = 0, len = _dom.length;

            function handleLoad(dom) {
                dom.src = dom.dataset ? dom.dataset.src : dom.getAttribute("data-src");
                dom.onerror = dom.onload = function () {
                    now++
                    console.log(now, len)
                    //如果还有图片待加载
                    if (_dom.length > 0) {
                        //递归调用加载
                        handleLoad(_dom.shift());
                    }
                    else {
                        cb && cb();
                    }
                }
            }

            handleLoad(_dom.shift());
        },
        /**
         * @description 关键词加标签（多个关键词用空格隔开）
         * @param str
         * @param key
         * @param tag
         * @return {XML|string|void|*}
         */
        findKeyword(str, key, tag = 'span'){
            let arr = null, regStr = null, content = null, Reg = null;
            //alert(regStr); //    如：(前端|过来)
            regStr = "(" + key.split(/\s+/).join('|') + ")";
            //alert(regStr); //    如：(前端|过来)
            content = str;
            //alert(Reg);//        /如：(前端|过来)/g
            Reg = new RegExp(regStr, "g");
            //过滤html标签 替换标签，往关键字前后加上标签
            content = content.replace(/<\/?[^>]*>/g, '')
            return content.replace(Reg, "<" + tag + ">$1</" + tag + ">");
        },
//***************DOM模块END*******************************/
    };
})();
