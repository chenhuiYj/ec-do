let ecValidate = (function () {
  let isType = function (o, type) {
    let _type = type.toLowerCase()
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
      nan () {
        return Number.isNaN(o)
      },
      elements () {
        return Object.prototype.toString.call(o).indexOf('HTML') !== -1
      }
    }
    if (typeObj[_type]) {
      return Object.prototype.toString.call(o) === typeObj[_type]
    } else {
      return typeFn[_type]()
    }
  }
  let ruleFn = {
    /**
         * @description 数据类型
         * @param val
         * @param type
         * @param msg
         * @return {*}
         */
    isType (val, type, msg) {
      return !isType(val, type)?msg : undefined
    },
    /**
         * @description 数据类型
         * @param val
         * @param type
         * @param msg
         */
    noType (val, type, msg) {
      return isType(val, type)?msg : undefined
    },
    /**
         * @description 不能为空
         * @param val
         * @param msg
         * @return {*}
         */
    isNoNull (val, msg) {
      return !val?msg : undefined
    },
    /**
         * @description 最小长度
         * @param val
         * @param length
         * @param msg
         * @return {*}
         */
    minLength (val, length, msg) {
      return val.toString().length < length?msg : undefined
    },
    /**
         * @description 最大长度
         * @param val
         * @param length
         * @param msg
         * @return {*}
         */
    maxLength (val, length, msg) {
      return val.toString().length > length?msg : undefined
    },
    /**
         * @description 是否是手机号码格式
         * @param val
         * @param msg
         * @return {*}
         */
    isMobile (val, msg) {
      return !/^1[3-9]\d{9}$/.test(val)?msg : undefined
    },
    /**
         * @description 是否是固定电话
         * @param val
         * @param msg
         * @return {*}
         */
    isTel (val, msg) {
      return !/^([0-9]+-)*(\d{3}-\d{8}|\d{4}-\d{7}|\d{11})(-[0-9]+)*$/.test(val)?msg : undefined
    },
    /**
         * @description 是否是邮箱
         * @param val
         * @param msg
         * @return {*}
         */
    isEmail (val, msg) {
      return !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(val)?msg : undefined
    },
    /**
         * @description 是否是号码格式（身份证）
         * @param val
         * @param msg
         * @return {*}
         */
    isCard (val, msg) {
      return !/^\d{15}$|^\d{18}$/.test(val)?msg : undefined
    },
    /**
         * @description 是否是数字格式
         * @param val
         * @param msg
         * @return {*}
         */
    isNumber (val, msg) {
      return !/^[0-9]+$/.test(val) ? msg : undefined
    },
    /**
         * @description 是否包含数字格式
         * @param val
         * @param msg
         * @return {*}
         */
    hasNumber (val, msg) {
      return !/[0-9]/.test(val) ? msg : undefined
    },
    /**
         * @description 是否不包含数字格式
         * @param val
         * @param msg
         * @return {*}
         */
    noNumber (val, msg) {
      return /^[^0-9]+$/.test(val) ? msg : undefined
    },
    /**
         * @description 是否是有效数值格式（多个小数点）
         * @param val
         * @param msg
         * @return {*}
         */
    isCount (val, msg) {
      if (!/^[1-9]{1}\d*(.\d{1,})?$|^[0]{1}$|^0.\d{1,}$/.test(val)) {
        return msg
      }
    },
    /**
         * @description 是否是中文格式
         * @param val
         * @param msg
         * @return {*}
         */
    isChinese (val, msg) {
      return !/^[\u4E00-\u9FA5]+$/.test(val) ? msg : undefined
    },
    /**
         * @description 是否包含中文
         * @param val
         * @param msg
         * @return {*}
         */
    hasChinese (val, msg) {
      return !/[\u4E00-\u9FA5]/.test(val) ? msg : undefined
    },
    /**
         * @description 是否不包含
         * @param val
         * @param msg
         * @return {*}
         */
    noChinese (val, msg) {
      return /^[^\u4E00-\u9FA5]+$/.test(val) ? msg : undefined
    },
    /**
         * @description 是否是英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
    isEnglish (val, msg) {
      return !/^[a-zA-Z]+$/.test(val) ? msg : undefined
    },
    /**
         * @description 是否包含英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
    hasEnglish (val, msg) {
      return !/[a-zA-Z]+/.test(val) ? msg : undefined
    },
    /**
         * @description 是否不包含英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
    noEnglish (val, msg) {
      return /^[^a-zA-Z]+$/.test(val) ? msg : undefined
    },
    /**
         * @description 是否是大写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
    isUpperEnglish (val, msg) {
      return !/^[A-Z]+$/.test(val) ? msg : undefined
    },
    /**
         * @description 是否包含大写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
    hasUpperEnglish (val, msg) {
      return !/[A-Z]/.test(val) ? msg : undefined
    },
    /**
         * @description 是否不包含大写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
    noUpperEnglish (val, msg) {
      return /^[^A-Z]+$/.test(val) ? msg : undefined
    },
    /**
         * @description 是否是小写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
    isLowerEnglish (val, msg) {
      return !/^[a-z]+$/.test(val) ? msg : undefined
    },
    /**
         * @description 是否包含小写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
    hasLowerEnglish (val, msg) {
      return !/[a-z]/.test(val) ? msg : undefined
    },
    /**
         * @description 是否不包含小写英文字母格式
         * @param val
         * @param msg
         * @return {*}
         */
    noLowerEnglish (val, msg) {
      return /^[^a-z]+$/.test(val) ? msg : undefined
    }
  }
  let filterFn={
    trim(val){
      return val.replace(/(^\s*)|(\s*$)/g, "")
    },
    html(){
      return val.replace(/<\/?[^>]*>/g, "")
    }
  }
  return {
    /**
         * @description 查询接口
         * @param arr
         * @return {*}
         */
    check: function (arr) {
      let ruleMsg; let checkRule; let _ruleSingle; let _ruleRow; let _rules; let _errorObj = {};let _data
      for (let i = 0, len = arr.length; i < len; i++) {
        _data=arr[i].data;
        // 如果字段找不到
        if (_data === undefined) {
          return '字段找不到！'
        }
        if(arr[i].filter){
          _data=filterFn[arr[i].filter](_data);
        }
        _rules = Object.keys(arr[i].rules)
        for (let item of _rules) {
          // 提取规则
          _ruleRow = item.split(',')
          for (let n = 0; n < _ruleRow.length; n++) {
            checkRule = _ruleRow[n].split(':')
            // 如果字段为空且规则不是校验空值，执行下次循环
            if ((_data === '' || _data === null) && checkRule[0] !== 'isNoNull') {
              continue
            }
            _ruleSingle = checkRule.shift()
            checkRule.unshift(_data)
            checkRule.push(arr[i].rules[item])
            // 记录规则错误
            ruleMsg = ruleFn[_ruleSingle].apply(null, checkRule)
            // 如果有一项符合，跳出本次循环
            if (!ruleMsg) {
              ruleMsg = ''
              break
            }
          }
          if (ruleMsg) {
            if (arr[i].alias) {
              _errorObj[arr[i].alias || 'errorMsg'] = ruleMsg
            } else {
              _errorObj = ruleMsg
            }
            return _errorObj
          }
        }
      }
      return undefined
    },
    /**
         * @description 校验所有接口
         * @param arr
         * @return {*}
         */
    checkAll: function (arr) {
      let ruleMsg; let checkRule; let _ruleSingle; let msgObj = {}; let _ruleRow; let _rules;let _data;
      for (let i = 0, len = arr.length; i < len; i++) {
        _data=arr[i].data;
        // 如果字段找不到
        if (_data === undefined) {
          return '字段找不到！'
        }
        if(arr[i].filter){
          _data=filterFn[arr[i].filter](_data);
        }
        _rules = Object.keys(arr[i].rules)
        // 遍历规则
        for (let item of _rules) {
          // 提取规则
          _ruleRow = item.split(',')
          for (let n = 0; n < _ruleRow.length; n++) {
            checkRule = _ruleRow[n].split(':')
            // 如果字段为空且规则不是校验空值，执行下次循环
            if ((_data === '' || _data === null) && checkRule[0] !== 'isNoNull') {
              continue
            }
            _ruleSingle = checkRule.shift()
            checkRule.unshift(_data)
            checkRule.push(arr[i].rules[item])
            // 如果规则错误
            ruleMsg = ruleFn[_ruleSingle].apply(null, checkRule)
            if (!ruleMsg) {
              ruleMsg = ''
              break
            }
          }
          if (ruleMsg) {
            // 返回错误信息
            msgObj[arr[i].alias] = ruleMsg
          }
        }
      }
      return Object.keys(msgObj).length > 0 ? msgObj : undefined
    },
    /**
         * @description 添加规则接口
         * @param type
         * @param fn
         */
    extend: function (type, fn) {
      ruleFn[type] = fn
    }
  }
})()
// ecValidate.extend('isPwd',function (val, msg) {
//     if (!/^[a-zA-Z0-9.]+$/.test(val)) {
//         return msg
//     }
// })
