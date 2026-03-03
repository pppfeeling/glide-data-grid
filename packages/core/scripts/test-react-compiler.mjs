#!/usr/bin/env node
/**
 * React Compiler 적용 테스트 스크립트
 *
 * 지정된 파일에 대해 babel-plugin-react-compiler를 실행하고
 * 컴파일 결과에 React Compiler가 삽입하는 캐싱 코드가 포함되어 있는지 확인합니다.
 */
import { transformSync } from "@babel/core";
import fs from "fs";
import path from "path";

const targetDir = path.resolve("src/internal/data-grid");

// 특정 파일이 인자로 주어지면 그 파일만, 아니면 전체 확인
const specificFile = process.argv[2];

function getFilesToTest() {
    if (specificFile) {
        return [path.resolve(specificFile)];
    }

    const files = [];
    function walk(dir) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.includes(".stories.")) {
                files.push(fullPath);
            }
        }
    }
    walk(targetDir);
    return files;
}

function testFile(filePath) {
    const relPath = path.relative(process.cwd(), filePath);
    const code = fs.readFileSync(filePath, "utf-8");

    // useCallback/useMemo 사용 횟수 체크
    const useCallbackCount = (code.match(/React\.useCallback|useCallback\(/g) || []).length;
    const useMemoCount = (code.match(/React\.useMemo|useMemo\(/g) || []).length;
    const totalManual = useCallbackCount + useMemoCount;

    try {
        const result = transformSync(code, {
            filename: filePath,
            presets: [
                "@babel/preset-typescript",
                ["@babel/preset-react", { runtime: "automatic" }],
            ],
            plugins: [
                ["babel-plugin-react-compiler", { target: "19" }],
            ],
            configFile: false,
            babelrc: false,
        });

        const output = result.code;

        // React Compiler가 삽입하는 시그니처 패턴 확인
        const hasCompilerCache = output.includes("_c(") || output.includes("$[") || output.includes("useMemoCache");

        // 컴파일된 코드에 useCallback/useMemo가 남아있는지 확인
        const remainingUseCallback = (output.match(/useCallback\(/g) || []).length;
        const remainingUseMemo = (output.match(/useMemo\(/g) || []).length;
        const remainingManual = remainingUseCallback + remainingUseMemo;

        // React 훅 사용 여부 (useState, useRef, useEffect 등 포함)
        const hasAnyHook = /\buse[A-Z]\w*\s*\(/.test(code);

        const status = hasCompilerCache ? "✅ COMPILED" : (hasAnyHook ? "⚠️  HAS HOOKS (not compiled)" : "⬜ NO HOOKS");

        console.log(`${status} ${relPath}`);
        if (totalManual > 0) {
            console.log(`  원본: useCallback=${useCallbackCount}, useMemo=${useMemoCount}`);
            if (hasCompilerCache) {
                console.log(`  컴파일 후 잔존: useCallback=${remainingUseCallback}, useMemo=${remainingUseMemo}`);
            }
        }

        return { filePath: relPath, success: true, compiled: hasCompilerCache, totalManual, remainingManual };
    } catch (err) {
        console.log(`❌ ERROR ${relPath}`);
        console.log(`  ${err.message.split("\n")[0]}`);
        return { filePath: relPath, success: false, error: err.message.split("\n")[0] };
    }
}

const files = getFilesToTest();
console.log(`\n🔍 React Compiler 테스트 - ${files.length}개 파일\n${"=".repeat(60)}\n`);

const results = files.map(testFile);

console.log(`\n${"=".repeat(60)}`);
const compiled = results.filter(r => r.compiled);
const errors = results.filter(r => !r.success);
const noHooks = results.filter(r => r.success && !r.compiled && r.totalManual === 0);
const notCompiled = results.filter(r => r.success && !r.compiled && r.totalManual > 0);

console.log(`\n📊 결과 요약:`);
console.log(`  ✅ 컴파일 성공: ${compiled.length}`);
console.log(`  ⬜ 훅 미사용: ${noHooks.length}`);
console.log(`  ❌ 컴파일 안됨: ${notCompiled.length}`);
console.log(`  ❌ 에러: ${errors.length}`);
console.log(`  총 파일: ${results.length}`);

if (errors.length > 0 || notCompiled.length > 0) {
    process.exit(1);
}
