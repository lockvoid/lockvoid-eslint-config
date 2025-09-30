import importPlugin from "eslint-plugin-import";

const configs = [];

let typescript;

try {
  typescript = await import("typescript-eslint");
} catch {
  // TypeScript not available
}

if (typescript) {
  configs.push(...(typescript.default?.configs?.recommended || typescript.configs?.recommended || []));

  configs.push({
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  });
}

let vue;

try {
  vue = await import("eslint-plugin-vue");
} catch {
  // Vue not available
}

if (vue) {
  configs.push(...(vue.default?.configs?.["flat/recommended"] || vue.configs?.["flat/recommended"] || []));

  configs.push({
    files: ["**/*.vue"],
    rules: {
      "vue/script-indent": ["error", 2, { baseIndent: 1, switchCase: 1 }],
      "vue/max-attributes-per-line": ["error", { singleline: 10, multiline: 10 }],
      "vue/multi-word-component-names": "off",
    },
  });
}

let tailwindcss;

try {
  tailwindcss = await import("eslint-plugin-tailwindcss");
} catch (error) {
  // Tailwind not available
}

if (tailwindcss) {
  configs.push(...(tailwindcss.default?.configs?.["flat/recommended"] || tailwindcss.configs?.["flat/recommended"] || []));

  configs.push({
    rules: {
      "tailwindcss/classnames-order": ["error", { callees: ["tc", "tv"] }],
      "tailwindcss/no-custom-classname": "off",
    },
  });
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
