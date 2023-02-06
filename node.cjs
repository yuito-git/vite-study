const { resolve } = require("path");
const globule = require("globule");

const inputs = {};
const documents = globule.find([`./src/**/*.html`, `./src/**/*.pug`], {
  ignore: [`./src/html/**/_*.html`, `./src/pug/**/_*.pug`],
});
console.log(`documents:${documents}`);

console.log(`__dirname:${__dirname}`);

documents.forEach((document) => {
  const fileName = document.replace(`./src/`, "");
  const key = fileName.replace(`${fileName}`, "main");
  console.log(key);
  inputs[key] = resolve(__dirname, "src", fileName);
});

console.log({ ...inputs })