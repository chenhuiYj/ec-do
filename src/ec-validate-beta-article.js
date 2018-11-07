let ecValidate = (function (arr) {
    let ruleData = {
        /**
         * @description 不能为空
         * @param val
         * @param msg
         * @return {*}
         */
        isNoNull(val, msg){
            if (val.toString().length===0) {
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
        }
    }
    return {
        /**
         * @description 查询接口
         * @param arr
         * @return {*}
         */
        check(arr) {
            let ruleMsg, checkRule, _rule, _rules, _errorObj = {};
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
                        if (arr[i].alias) {
                            _errorObj[arr[i].alias || 'errorMsg'] = ruleMsg;
                        }
                        else {
                            _errorObj = ruleMsg;
                        }
                        return _errorObj;
                    }
                }
            }
            return 'success';
        },
        /**
         * @description 校验所有接口
         * @param arr
         * @return {*}
         */
        checkAll: function (arr) {
            let ruleMsg, checkRule, _rule, msgObj = {}, valObj = {}, _rules;
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
                        msgObj[arr[i].alias] = ruleMsg;
                    }
                }
            }
            return Object.keys(msgObj).length>0?msgObj:'success';
        },
        /**
         * @description 添加规则接口
         * @param type
         * @param fn
         */
        addRule(type, fn){
            ruleData[type] = fn;
        }
    }
})()
