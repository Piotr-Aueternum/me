module.exports = {
  tabs: 2,
  useTabs: false,
  printWidth: 80,
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],
  importOrder: ["^@components/(.*)$", "", "^./(.*)$", "^../(.*)$"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};
