import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsConfigPath from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
      "process.env.REACT_APP_API_URL": `"${process.env.VITE_API_URL}"`,
      "process.env.REACT_APP_MIDDLEWARE_TOKEN": `"${process.env.VITE_MIDDLEWARE_TOKEN}"`,
      "process.env.REACT_APP_DEBUG_MODE": `"${process.env.VITE_DEBUG_MODE}"`,
    },
    plugins: [reactRefresh(), tsConfigPath(), svgr()],
    esbuild: {
      jsxInject: `import React from 'react'`,
    },
  });
};
