/*
 * @Author: Tentel
 * @Date: 2022-08-03 16:51:04
 * @LastEditors: Tentel
 * @LastEditTime: 2022-09-28 15:20:42
 */
import Router from "vue-router";
import routes from "./routes";

export function createRouter(ssrContext, createDefaultRouter, routerOptions) {
  const options = routerOptions
    ? routerOptions
    : createDefaultRouter(ssrContext).options;

  return new Router({
    ...options,
    mode: "history",
    routes: fixRoutes(options.routes),
  });
}

function fixRoutes() {
  // default routes that come from `pages/`
  return [].concat(routes);
}
