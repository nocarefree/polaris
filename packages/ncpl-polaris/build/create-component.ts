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
import type { ${name}Props } from "./${name}";
import styles from "./${name}.module.scss";

defineOptions({
  name: "Np${space}${name}",
});
defineProps<${space}${name}Props>()
</script>`,
    "vue"
  );
  writeFile(resolve(dir, `${name}.vue`), _vue, "utf-8");

  const _type = formatCode(
    `
export type ${space}${name}Props = {
};`
  );
  writeFile(resolve(dir, `${name}.ts`), _type, "utf-8");

  const _index = formatCode(
    `
import { withInstall } from "../utils";
import ${name} from "./${name}.vue";

export const Np${space}${name} = withInstall(${name});
export default Np${space}${name};
export * from "./${name}";`
  );
  writeFile(resolve(dir, `index.ts`), _index, "utf-8");

  if (!space) {
    appendFile(
      resolve(pathComponents, `index.ts`),
      formatCode(
        `
export * from "./${name}";`
      )
    );
  }


}


