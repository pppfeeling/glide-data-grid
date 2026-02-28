const { dirname, join } = require("path");

/**
 * React Compiler babel 플러그인을 Vite transform으로 적용하는 커스텀 플러그인.
 * @vitejs/plugin-react를 추가하면 wyw-in-js와 Fast Refresh가 충돌하므로,
 * babel 변환만 별도로 수행합니다.
 */
function reactCompilerPlugin() {
    let transformAsync;
    return {
        name: "react-compiler-babel",
        enforce: "pre",
        async configResolved() {
            const babelCore = require("@babel/core");
            transformAsync = babelCore.transformAsync;
        },
        async transform(code, id) {
            if (!/\.[tj]sx$/.test(id) || id.includes("node_modules")) return null;
            const result = await transformAsync(code, {
                filename: id,
                plugins: [["babel-plugin-react-compiler", { target: "19" }]],
                parserOpts: {
                    plugins: ["jsx", "typescript"],
                },
                sourceFileName: id,
                sourceMaps: true,
            });
            if (result?.code == null) return null;
            return { code: result.code, map: result.map };
        },
    };
}

module.exports = {
    stories: ["../**/src/**/*.stories.tsx"],
    addons: [getAbsolutePath("@storybook/addon-docs")],

    typescript: {
        reactDocgen: false,
    },

    async viteFinal(config) {
        const { mergeConfig } = await import("vite");
        const wyw = await import("@wyw-in-js/vite");

        return mergeConfig(config, {
            plugins: [
                reactCompilerPlugin(),
                wyw.default(),
            ],
            optimizeDeps: {
                exclude: ["@faker-js/faker"],
            },
        });
    },

    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {},
    },
};

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}
