import config from "@/config"
import {
  Time
} from "iview";

export default () => {
  // 控制台拦截器
  ((window) => {
    // 是否开启  window 环境
    if (!config.consoleInterrceptOpen || !window) return;
    // 默认样式
    const baseRule = {
      headerInf: "",
      headerCss: {
        color: "#234",
        fontWeight: "bold",
        padding: '5px 0',
      },
      contentCss: {
        color: "#234",
        padding: '5px 0 5px 3px',
      },
    }

    const InterceptRule = {
      log: { // 拦截 console.log
        ...baseRule,
        headerInf: "信息",
      },
      warn: { // 拦截 console.warn
        ...baseRule,
        headerInf: "警告",
        headerCss: {
          color: "#C2E812",
        },
      },
      error: { // 拦截 console.error
        ...baseRule,
        headerInf: "错误",
        headerCss: {
          color: "#C1292E",
        },
      },
      debug: { // 拦截 console.error
        ...baseRule,
        headerInf: "调试",
        headerCss: {
          color: "#C1292E",
        },
      }
    }

    // css 转 str
    function cssObjToStr(cssObj) {
      /* 例如
      {color:"teal",background-color:"tmato",fontSize:"12px"}
      // to
      color:teal;background-color:tomato;font-size:12px;
      */
      if (!cssObj || cssObj == "" || typeof (cssObj) != "object") return "";
      return JSON.stringify(cssObj).trim().slice(1, -1).
      replace(/['"]/ig, "").replace(/,/ig, ";").
      replace(/([A-Z])/g, (arg) => `-${arg.toLowerCase()}`);
    }

    function getNowTime() {
      return new Date(Date.now()).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }

    for (let key in InterceptRule) {
      const item = InterceptRule[key];
      console[key] = (function (oriLogFunc) {
        return function (...args) {
          oriLogFunc.call(console,
            `%c${item.headerInf}[${getNowTime()}]%c${args[0]}`,
            cssObjToStr(item.headerCss),
            cssObjToStr(item.contentCss),
            ...args.slice(1));
        }
      })(console[key]);
    }
  })(window)

}
