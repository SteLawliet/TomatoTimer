const fs = require("fs");
const confFile = '/Users/zhaoziqi/workspace/vue/data/poto2-conf.json'
const dataFile = '/Users/zhaoziqi/workspace/vue/data/poto2-data.json'

function whiteData(data) {
    data = JSON.stringify(data);
    fs.writeFileSync(dataFile, data, 'utf8',
        (err) => {
            if (err) throw err;
            else console.log("write histories data success")
        });
}

function whiteConf(data) {
    data = JSON.stringify(data);
    fs.writeFileSync(confFile, data, 'utf8',
        (err) => {
            if (err) throw err;
            else console.log("write conf data success")
        });
}

function readData() {
    let data = {};
    fs.readFileSync(dataFile,
        (err, data0) => {
            if (err) throw err;
            else console.log("load histories data success")
            data = data0
        });
    return JSON.parse(data);
}

function readConf() {
    let data = {};
    fs.readFileSync(confFile,
        (err, data0) => {
            if (err) throw err;
            else console.log("load configuration data success");
            data = data0
        });
    return JSON.parse(data);
}

export default {
    whiteConf, readConf, whiteData, readData
}