import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { emptyDir, ensureDir } from "fs-extra";
import consola from "consola";
import camelcase from "camelcase";
import glob from "fast-glob";
import { type BuiltInParserName, format } from "prettier";
import chalk from "chalk";
import { pathComponents, pathRoot } from "./paths";

const getSvgFiles = async () => {

  return glob("*.svg", {
    cwd: path.resolve(pathRoot, "./icons"),
    absolute: true,
  });
};

const getName = (file: string) => {
  const filename = path.basename(file).replace(".svg", "");
  const componentName = filename;
  return {
    filename,
    componentName,
  };
};

const formatCode = (code: string, parser: BuiltInParserName = "typescript") =>
  format(code, {
    parser,
    semi: false,
    singleQuote: true,
  });

const transformToVueComponent = async (file: string) => {
  const content = (await readFile(file, "utf-8")).replaceAll(' fill="#5C5F62"', '');
  const { filename, componentName } = getName(file);
  const vue = formatCode(
    `
<template>
${content}
</template>
<script lang="ts">
import type { DefineComponent } from 'vue'
export default ({
  name: "${componentName}",
}) as DefineComponent
</script>`,
    "vue"
  );
  writeFile(path.resolve(pathComponents, `${filename}.vue`), vue, "utf-8");
};

const generateEntry = async (files: string[]) => {
  const code = formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file);
        return `export { default as ${componentName} } from './${filename}.vue'`;
      })
      .join("\n")
  );

  await writeFile(path.resolve(pathComponents, "index.ts"), code, "utf-8");
};

consola.info(chalk.blue("generating vue components"));
ensureDir(pathComponents).then(() => {
  emptyDir(pathComponents);
  getSvgFiles().then((files) => {
    consola.info(chalk.blue("generating vue files"));
    Promise.all(files.map((file) => transformToVueComponent(file))).then(() => {
      consola.info(chalk.blue("generating entry file"));
      generateEntry(files);
    });
  });
});
