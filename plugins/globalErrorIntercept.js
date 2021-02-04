import config from "@/config"
export default () => {
  // 全局错误拦截
  ((window) => {
    if (!config.globalErrorInterrceptOpen || !window) return;
    // 错误拦截
    window.addEventListener(
      "error",
      (event) => {
        let target = event.target;
        let isElementTarget =
          target instanceof HTMLScriptElement ||
          target instanceof HTMLLinkElement ||
          target instanceof HTMLImageElement;
        // 资源错误
        if (isElementTarget) {
          // // 上报资源地址
          let url = target.src || target.href;
          console.error(`resource load fail:${url}%o`, target);
        }
        return true;
      }, true);
  })(window)
}
