class LrcFormat {
  constructor() {
    this.context = ""; // lrc 源
    this.tags = {}; // 歌词
    this.infs = {}; // 歌曲信息
    this.lastWord = ""; // 上一次的歌词
    this.isNotWord = false; // 是否为纯音乐
    this.showInf = "";
  }
  init() {
    this.isNotWord = false;
    // 解析歌曲信息
    this.infs = this.getInfs();
    // 解析歌词
    this.tags = this.getTags();
  }
  getInfs() {
    // 解析标记标签 text lrc文本 
    // return {标签名:标签值} 例如: {by:xiaohuohu}
    let res = {};
    if (typeof (this.context) !== 'string') {
      return res;
    } // 检查参数
    let find = this.context.match(/\[[A-Za-z]+\:[^\[\]]*\]/g); // 匹标志标签
    for (let findKey in find) {
      let textArrayItem = find[findKey];
      let tagName = textArrayItem.substring(textArrayItem.indexOf('[') + 1, textArrayItem.indexOf(':'));
      let tagText = textArrayItem.substring(textArrayItem.indexOf(':') + 1, textArrayItem.indexOf(']'));
      res[tagName] = tagText;
    }
    return res;
  }
  // 设置歌词
  setLrc(context) {
    this.context = context; // lrc 源
    this.lastWord = ""; // 上一次的歌词
    this.init();
  }
  // 获取标签
  getTags() {
    // 解析歌词标签 text lrc全部文本
    // return {time:word} 例如{12300:'hello world'}
    // [m:s.ms] or [m:s:ms] or [m:s], [1:2.3] or [01:02.03] or [01:02] ...
    let res = {}; // 结果
    if (typeof (this.context) != 'string') {
      return res;
    } // 检查参数
    let textArray = this.context.split('\n'); // 歌词拆分
    let timeRule = [60000, 1000, 1]; // 对应位数的毫秒数
    let addTime = 0; // 时间补偿
    for (let textArrayKey in textArray) {
      let textArrayItem = textArray[textArrayKey];
      if (textArrayItem.match(/(?:\[\d+\:\d+(?:[.:]\d+)?\])+.*/)) { // 判断是否符合歌词的规则
        let findWord = textArrayItem.replace(/(?:\[\d+\:\d+(?:[.:]\d+)?\])+/g, '').trim(); // 歌去除时间保留歌词,并去除两端多余空格
        if (findWord) { // 去除歌词为空的项
          let findTime = textArrayItem.match(/(?:\[\d+\:\d+(?:[.:]\d+)?\])/g); // 匹配多个时间 例如 [1:2.3][4:2.4]hello world
          for (let findTimeKey in findTime) {
            let findTimeItem = findTime[findTimeKey].match(/\d+/g); // 切割每一个时间的m s ms部分
            let nowTime = addTime; // 初始为偏移时间 解决[offset:-232]操作
            for (let x = 0; x < findTimeItem.length; x++) {
              nowTime += parseInt(findTimeItem[x]) * timeRule[x]; // 分钟,秒,毫秒转换为转毫秒之后累加
            }
            res[nowTime > 0 ? nowTime : 0] = findWord; // 限制下线时间 0
          }
        }
      } else if (textArrayItem.match(/^\[offset\:\-?[1-9]\d+\]$/)) { // 匹配偏移时间 解决[offset:-232]操作
        // [offset:-232]正值表示整体提前，负值相反
        addTime -= parseInt(textArrayItem.substring(textArrayItem.indexOf(':') + 1, textArrayItem.length));
      }
    }
    return res;
  }
  // 获取歌词
  getWord(time, flag = true, timeDeviation = 500) {
    // 获取解析歌词 time: 毫秒 flag:是否模糊匹配 若为 false 且找不到时返回 '' 
    // timeDeviation:模糊时间 (time - timeDeviation< time < time + timeDeviation),flag 为true 时生效
    if (this.isNotWord) return this.showInf;

    if (flag) { // 模糊匹配
      for (let key in this.tags) {
        // 获取大概区间的第一个歌词
        if ((key >= time - timeDeviation) && (key <= time + timeDeviation)) {
          this.lastWord = this.tags[key];
          return this.tags[key];
        } else if (key > time + timeDeviation) { // 未找到返回上一次的歌词
          return this.lastWord;
        }
      }
    } else { // 精确匹配
      let res = this.tags[time];
      return res ? res : '';
    }
  }
  // 设置状态
  setNotWord(showInf = "暂无歌词") {
    this.isNotWord = true;
    this.showInf = showInf;
  }
}

export default LrcFormat;
