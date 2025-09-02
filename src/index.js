import importPlugin from "eslint-plugin-import";

const configs = [];

try {
  const typescript = await import("typescript-eslint");
  configs.push(...typescript.configs.recommended);
} catch {
  // TypeScript not available
}

try {
  const vue = await import("eslint-plugin-vue");

  configs.push(...vue.configs["flat/recommended"]);

  configs.push({
    files: ["**/*.vue"],
    rules: {
      "vue/script-indent": ["error", 2, { baseIndent: 1, switchCase: 1 }],
      "vue/max-attributes-per-line": ["error", { singleline: 10, multiline: 10 }],
      "vue/multi-word-component-names": "off",
    },
  });
} catch {
  // Vue not available
}

try {
  const tailwindcss = await import("eslint-plugin-tailwindcss");

  configs.push(...tailwindcss.configs["flat/recommended"]);

  configs.push({
    rules: {
      "tailwindcss/classnames-order": ["error", { callees: ["tc", "tv"] }],
      "tailwindcss/no-custom-classname": "off",
    },
  });
} catch {
  // Tailwind not available
}

configs.push({
  plugins: {
    import: importPlugin,
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "quotes": ["error", "double", { avoidEscape: true }],
    "semi": ["error", "always"],

    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type",
        ],

        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },

        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
            position: "before",
          },

          {
            pattern: "{~,#}/**",
            group: "internal",
            position: "before",
          },
        ],
      },
    ],
  },
});

export default configs;
