/** @type {import('@react-router/dev').ReactRouterConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  browserNodeBuiltinsPolyfill: {
    modules: { path: true, os: true }
  }
}; 