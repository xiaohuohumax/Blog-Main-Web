import config from "@/config"
export default () => {
  // 全局错误拦截
  ((window) => {
    if (!config.globalErrorInterrceptOpen || !window) return;
    // 资源错误
    window.addEventListener(
      "error",
      (event) => {
        let target = event.target;
        let isElementTarget =
          target instanceof HTMLScriptElement ||
          target instanceof HTMLLinkElement ||
          target instanceof HTMLImageElement;
        if (isElementTarget) {
          let url = target.src || target.href;
          console.error(`resource load fail:${url}%o`, target);
        }
        // event.stopPropagation();
      }, true);
    // 错误拦截
    window.onerror = (event) => {
      console.error(event);
      // return true;
    }
  })(window)
}
