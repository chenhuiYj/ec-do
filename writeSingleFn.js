let fs = require('fs');
let path = require('path');
fs.readFile('./src/ec-do-3.0.0-beta.2.js', (err, data) => {
    if (err) {
        //如 果 出 错， 输 出 错 误 日 志， 并 给 客 户 端 返 回“ Server Error”
        console.error(err);
    }
    else {
        let obj=new Function(data.toString().replace('let','let _ecObj=')+';return _ecObj')();
        let newfilepath;
        Object.keys(obj).forEach((item,index)=>{
            newfilepath= path.join(__dirname, `./src/fn/${item}.js`);
            fs.writeFileSync(newfilepath, `let ${item}=function ${obj[item].toString().replace(item,'')};`);
        })
    }
})

//fs.writeFileSync(newfilepath, 'let _skillData=' + JSON.stringify(_data) + ';export {_skillData}');
