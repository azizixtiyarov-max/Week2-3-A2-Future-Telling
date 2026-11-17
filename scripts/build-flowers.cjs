// Run after build-pages.py to regenerate the vivid botanical SVGs.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..', 'dist');
const context = {window:{},document:{querySelector:()=>null}};
vm.runInNewContext(fs.readFileSync(path.join(root,'growth.js'),'utf8'),context);
for (const [name,type] of Object.entries({bloom:'knowledge',sun:'knowledge',pink:'memory',blue:'memory',orbit:'care',lilac:'care'})) {
  fs.writeFileSync(path.join(root,'assets',`${name}.svg`),context.window.GardenGrowth.flower(type,2));
}
