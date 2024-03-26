import path from "node:path";
import { readFile, writeFile, mkdir, appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { emptyDir, ensureDir } from "fs-extra";
import consola from "consola";
import camelcase from "camelcase";
import glob from "fast-glob";
import { type BuiltInParserName, format } from "prettier";
import chalk from "chalk";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { space } from "@shopify/polaris-tokens";

//component path
const dir = dirname(fileURLToPath(import.meta.url));
const pathRoot = resolve(dir, "..");
const pathSrc = resolve(pathRoot, "src");
const pathComponents = resolve(pathSrc, "components");

const avgpath = process.argv[2].split('/');
let parentComponent = pathComponents, i, s, p: any = [];
for (i = 0; i < avgpath.length; i++) {
  s = camelcase(avgpath[i], { pascalCase: true })
  if (i < avgpath.length - 1) {
    p.push(s);
  }
  parentComponent = resolve(parentComponent, s)
  if (!existsSync(parentComponent)) {
    mkdir(parentComponent);
  }
}

createFiles(s, p.length == 0 ? '' : p.join(''), parentComponent);


function createFiles(name = '', space = '', dir = '') {
  const formatCode = (code: string, parser: BuiltInParserName = "typescript") =>
    format(code, {
      parser,
      semi: false,
      singleQuote: true,
    });

  const _vue = formatCode(
    `
<template>
<div />
</template>
<script setup lang="ts">
import { ref } from 'vue';

</script>`,
    "vue"
  );
  writeFile(resolve(dir, `${name}.vue`), _vue, "utf-8");

  const _index = formatCode(
    `
import ${name} from "./${name}.vue";
export default ${space}${name};`
  );
  writeFile(resolve(dir, `index.ts`), _index, "utf-8");

}


