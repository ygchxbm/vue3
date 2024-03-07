// const fs = require('node:fs');
// const execa = require('execa');
import fs from "node:fs"
import {execa} from "execa";

const dirs = fs.readdirSync('packages').filter(p => {
    return fs.statSync(`packages/${p}`).isDirectory()
})

async function build(target) {
    console.info("target:", target)
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`],{stdio:'inherit'})
}

runParallel(dirs, build).then(() => {
    console.info("successful:", 'successful!!!!!')
})

async function runParallel(dirs, itemfn) {
    let result = []
    for (const item of dirs) {
        result.push(itemfn(item))
    }
    return Promise.all(result);
}

console.info("dirs:", dirs)
