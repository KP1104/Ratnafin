import { defineConfig, loadEnv, Alias } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsConfigPath from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import Pages from "vite-plugin-pages";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
      "process.env.REACT_APP_API_URL": `"${process.env.VITE_API_URL}"`,
      "process.env.REACT_APP_MIDDLEWARE_TOKEN": `"${process.env.VITE_MIDDLEWARE_TOKEN}"`,
      "process.env.REACT_APP_DEBUG_MODE": `"${process.env.VITE_DEBUG_MODE}"`,
    },
    plugins: [
      reactRefresh(),
      tsConfigPath(),
      svgr(),
      eslintPlugin({
        eslintOptions: {
          useEslintrc: true,
        },
      }),
      Pages({
        react: true,
      }),
    ],
    esbuild: {
      jsxInject: `import React from 'react'`,
    },
    build: {
      rollupOptions: {
        input: ["src/index.tsx"],
        output: {
          sourcemap: true,
          name: "start",
        },
        manualChunks: {
          lib: [
            "react",
            "react-query",
            "react-router-dom",
            "recoil",
            "@material-ui/core",
            "@material-ui/lab",
            "@material-ui/pickers",
            "react-table",
            "history",
            "react-number-format",
            "react-beautiful-dnd",
            "react-dnd",
            "react-dnd-html5-backend",
            "react-imask",
          ],
          lib2: ["react-window", "notistack"],
          helpers: [
            "autosuggest-highlight",
            "clsx",
            "date-fns",
            "json-rules-engine",
            "lodash-es",
            "match-sorter",
            "yup",
          ],
        },
      },
    },
  });
};
