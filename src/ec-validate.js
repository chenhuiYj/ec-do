let ecValidate=(function () {
    let isType=function(o, type) {
        let typeObj={
            'string':'[object String]',
            'number':'[object Number]',
            'boolean':'[object Boolean]',
            'null':'[object Null]',
            'function':'[object Function]',
            'array':'[object Array]',
            'object':'[object Object]',
            'symbol': '[object Symbol]'
        }
        if(typeObj[type.toLowerCase()]){
            return Object.prototype.toString.call(o) === typeObj[type.toLowerCase()];
        }
        switch (type.toLowerCase()) {
            case 'nan':
                return Number.isNaN(o);
            case 'elements':
                return Object.prototype.toString.call(o).indexOf('HTML') !== -1;
        }
    }
    let ruleData = {
        /**
         * @description 数据类型
         * @param val
         * @param type
         * @param msg
         * @return {*}
         */
        isType(val,type,msg){
            if(!isType(val,type)){
                return msg;
            }
        },
        /**
         * @description 数据类型
         * @param val
         * @param type
         * @param msg
         */
        noType(val,type,msg){
            if(isType(val,type)){
                return msg;
            }
        },
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
            if (!/^([0-9]+-)*(\d{3}-\d{8}|\d{4}-\d{7}|\d{11})(-[0-9]+)*$/.test(val)) {
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
            return !/^[0-9]+$/.test(val) ? msg : '';
        },
        /**
         * @description 是否包含数字格式
         * @param val
         * @param msg
         * @return {*}
         */
        hasNumber(val, msg){
            return !/[0-9]+/.test(val) ? msg : '';
        },
        /**
         * @description 是否不包含数字格式
         * @param val
         * @param msg
         * @return {*}
         */
        noNumber(val, msg){
            return /[0-9]+/.test(val) ? msg : '';
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
            return !/^[\u4E00-\u9FA5]+$/.test(val) ? msg : '';
        },
        /**
         * @description 是否包含中文
         * @param val
         * @param msg
         * @return {*}
         */
        hasChinese(val, msg){
            return !/[\u4E00-\u9FA5]+/.test(val) ? msg : '';
        },
        /**
         * @description 是否不包含
         * @param val
         * @param msg
         * @return {*}
         */
        noChinese(val, msg){
            return /[\u4E00-\u9FA5]+/.test(val) ? msg : '';
        },
        /**
         * @description 是否是英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
        isEnglish(val, msg){
            return !/^[a-zA-Z]+$/.test(val) ? msg : '';
        },
        /**
         * @description 是否包含英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
        hasEnglish(val, msg){
            return !/[a-zA-Z]+/.test(val) ? msg : '';
        },
        /**
         * @description 是否不包含英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
        noEnglish(val, msg){
            return /[a-zA-Z]+/.test(val) ? msg : '';
        },
        /**
         * @description 是否是大写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
        isUpperEnglish(val, msg){
            return !/^[A-Z]+$/.test(val) ? msg : '';
        },
        /**
         * @description 是否包含大写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
        hasUpperEnglish(val, msg){
            return !/[A-Z]+/.test(val) ? msg : '';
        },
        /**
         * @description 是否不包含大写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
        noUpperEnglish(val, msg){
            return /[A-Z]+/.test(val) ? msg : '';
        },
        /**
         * @description 是否是小写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
        isLowerEnglish(val, msg){
            return !/^[a-z]+$/.test(val) ? msg : '';
        },
        /**
         * @description 是否包含小写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
        hasLowerEnglish(val, msg){
            return !/[a-z]+/.test(val) ? msg : '';
        },
        /**
         * @description 是否不包含小写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
        isLowerEnglish(val, msg){
            return /[a-z]+/.test(val) ? msg : '';
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
        /**
         * @description 密码强度
         * @param val
         * @return {*}
         */
        pwdLv(val){
            let nowLv = 0;
            if (val.length < 6) {
                return nowLv
            }
            //nowLv=str.replace(/[0-9]/,' ').replace(/[A-Z]/,' ').replace(/[a-z]/,' ').replace(/[_.\-]/,' ').replace(/[^\s]/g,'').length;
            let rules = [/[0-9]/, /[a-z]/, /[A-Z]/, /[\.|-|_]/];
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].test(val)) {
                    nowLv++;
                }
            }
            return nowLv;
        },
    }
    return {
        /**
         * @description 查询接口
         * @param arr
         * @return {*}
         */
        check: function (arr) {
            let ruleMsg, checkRule, _rule, _rules,_errorObj={};
            return new Promise(function (resolve, reject) {
                for (let i = 0, len = arr.length; i < len; i++) {
                    //如果字段找不到
                    if (arr[i].el === undefined) {
                        return '字段找不到！'
                    }
                    //遍历规则
                    for (let j = 0; j < arr[i].rules.length; j++) {
                        //提取规则
                        _rules = arr[i].rules[j].rule.split(",");
                        for (let n = 0; n < _rules.length; n++) {
                            checkRule = _rules[n].split(":");
                            //如果字段为空且规则不是校验空值，执行下次循环
                            if ((arr[i].el === '' || arr[i].el === null) && checkRule[0] !== 'isNoNull') {
                                continue;
                            }
                            _rule = checkRule.shift();
                            checkRule.unshift(arr[i].el);
                            checkRule.push(arr[i].rules[j].msg);
                            //记录规则错误
                            ruleMsg = ruleData[_rule].apply(null, checkRule);
                            //如果有一项符合，跳出本次循环
                            if (!ruleMsg) {
                                ruleMsg = '';
                                break;
                            }
                        }
                        if (ruleMsg) {
                            if(arr[i].alias){
                                _errorObj[arr[i].alias||'errorMsg']=ruleMsg;
                            }
                            else{
                                _errorObj=ruleMsg;
                            }
                            reject(_errorObj);
                            return;
                        }
                    }
                }
                resolve('success');
            });
        },
        /**
         * @description 校验所有接口
         * @param arr
         * @return {*}
         */
        checkAll: function (arr) {
            let ruleMsg, checkRule, _rule, msgObj = {}, valObj = {},_rules;
            for (let i = 0, len = arr.length; i < len; i++) {
                //如果字段找不到
                if (arr[i].el === undefined) {
                    return '字段找不到！'
                }
                //遍历规则
                for (let j = 0; j < arr[i].rules.length; j++) {
                    //提取规则
                    //如果字段为空且规则不是校验空值，执行下次循环
                    _rules = arr[i].rules[j].rule.split(",");
                    for (let n = 0; n < _rules.length; n++) {
                        checkRule = _rules[n].split(":");
                        if ((arr[i].el === '' || arr[i].el === null) && arr[i].rules[j].rule !== 'isNoNull') {
                            continue;
                        }
                        _rule = checkRule.shift();
                        checkRule.unshift(arr[i].el);
                        checkRule.push(arr[i].rules[j].msg);
                        //如果规则错误
                        ruleMsg = ruleData[_rule].apply(null, checkRule);
                        if (!ruleMsg) {
                            ruleMsg = '';
                            break;
                        }
                    }
                    if (ruleMsg) {
                        //返回错误信息
                        msgObj[arr[i].alias] =ruleMsg;
                    }
                }
            }
            //return msgObj.length>0?msgObj:false;
            return new Promise(function (resolve, reject) {
                if (Object.keys(msgObj).length === 0) {
                    resolve('success');
                }
                else {
                    reject(msgObj);
                }
            });
        },
        /**
         * @description 添加规则接口
         * @param type
         * @param fn
         */
        addRule: function (type, fn) {
            ruleData[type] = fn;
        }
    }
})()
