// eslint.config.js
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";

export default [
  js.configs.recommended, // 기본 ESLint 권장 규칙
  tseslint.configs.recommended, // TypeScript ESLint 권장 규칙 (직접 추가)
  // eslint-plugin-react의 flat/recommended 설정을 직접 포함
  // 이 방식이 ESLint v9에서 권장됩니다.
  react.configs["flat/recommended"],
  // eslint-plugin-react-hooks의 경우, recommended config가 직접 `rules`를 내보내지 않을 수 있습니다.
  // 따라서 필요한 규칙을 직접 명시적으로 추가합니다.
  // reactHooks.configs.recommended (<- 이 부분이 문제였습니다. 직접 규칙을 추가합니다.)
  tailwindcss.configs.recommended, // TailwindCSS 권장 규칙 (직접 추가)
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"], // 모든 관련 파일에 적용
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        HTMLInputElement: "readonly",
        HTMLTextAreaElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLUListElement: "readonly",
        HTMLLIElement: "readonly",
        HTMLAnchorElement: "readonly",
        HTMLSpanElement: "readonly",
        HTMLOListElement: "readonly",
        Headers: "readonly",
        HeadersInit: "readonly",
        Request: "readonly",
        URL: "readonly",
        KeyboardEvent: "readonly",
        window: "readonly",
        document: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks, // 플러그인 등록
      tailwindcss
    },
    rules: {
      // react-hooks 규칙을 직접 명시
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // 기존에 정의된 React 규칙
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true
        }
      ],
      "react/jsx-max-props-per-line": [
        "error",
        {
          maximum: 1,
          when: "multiline"
        }
      ],
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true
        }
      ],
      "react/react-in-jsx-scope": "off", // React 17+ JSX 변환 사용 시 필요 없음
      "react/prop-types": "off", // TypeScript 사용 시 필요 없음

      // TypeScript ESLint 규칙 (tseslint.configs.recommended에서 이미 포함되었지만, 명시적으로 추가 가능)
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn"

      // TailwindCSS 규칙 (tailwindcss.configs.recommended에서 이미 포함되었지만, 명시적으로 추가 가능)
      // "tailwindcss/no-custom-classname": "warn", // 예시
    },
    settings: {
      react: {
        version: "detect" // 설치된 React 버전 자동 감지
      }
    }
  }
];
