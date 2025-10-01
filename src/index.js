import importPlugin from "eslint-plugin-import";

let typescriptImport;

try {
  typescriptImport = await import("typescript-eslint");
} catch {
  // noop
}

let vueImport;

try {
  vueImport = await import("eslint-plugin-vue");
} catch {
  // noop
}

let tailwindcssImport;

try {
  tailwindcssImport = await import("eslint-plugin-tailwindcss");
} catch (error) {
  // noop
}

export default ({ typescript = false, vue = false, tailwindcss = false } = {}) => {
  const configs = [];

  if (typescript) {
    configs.push(...(typescriptImport.default?.configs?.recommended || typescriptImport.configs?.recommended));

    configs.push({
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    });
  }

  if (vue) {
    configs.push(...(vueImport.default?.configs?.["flat/recommended"] || vueImport.configs?.["flat/recommended"]));

    configs.push({
      files: ["**/*.vue"],
      rules: {
        "vue/script-indent": ["error", 2, { baseIndent: 1, switchCase: 1 }],
        "vue/max-attributes-per-line": ["error", { singleline: 10, multiline: 10 }],
        "vue/multi-word-component-names": "off",
      },
    });
  }

  if (tailwindcss) {
    configs.push(...(tailwindcssImport.default?.configs?.["flat/recommended"] || tailwindcssImport.configs?.["flat/recommended"]));

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

  return configs;
};
