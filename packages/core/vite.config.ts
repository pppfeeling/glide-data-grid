import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
    plugins: [
        react({
            babel: {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            modules: false,
                            targets: { firefox: "60", chrome: "67", safari: "12.1" },
                            exclude: ["@babel/plugin-transform-template-literals"],
                        },
                    ],
                ],
                plugins: [
                    ["babel-plugin-react-compiler", { target: "19" }],
                    "@babel/plugin-proposal-class-properties",
                ],
                assumptions: {
                    setPublicClassFields: true,
                    setSpreadProperties: true,
                },
                comments: false,
            },
        }),
        wyw({
            classNameSlug: "gdg-[hash]",
            babelOptions: {
                presets: ["@babel/preset-typescript", "@babel/preset-react"],
            },
        }),
        dts({
            include: ["src/**/*.ts", "src/**/*.tsx"],
            exclude: [
                "src/**/*.stories.tsx",
                "src/stories/**",
                "src/docs/**",
            ],
            rollupTypes: true,
            entryRoot: "src",
            outDir: "dist",
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
            fileName: () => "index.js",
        },
        rollupOptions: {
            onwarn(warning, warn) {
                if (
                    warning.code === "SOURCEMAP_BROKEN" ||
                    warning.code === "SOURCEMAP_ERROR" ||
                    warning.code === "INVALID_ANNOTATION" ||
                    warning.message?.includes("Can't resolve original location of error")
                ) return;
                warn(warning);
            },
            external: [
                "react",
                "react-dom",
                "react/jsx-runtime",
                "lodash",
                "marked",
                "react-responsive-carousel",
            ],
            output: {
                inlineDynamicImports: true,
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith(".css")) return "index.css";
                    return assetInfo.name ?? "asset";
                },
            },
        },
        sourcemap: true,
        cssCodeSplit: false,
        minify: false,
    },
});
