#!/usr/bin/env node

import { $, argv } from 'zx'

await $`npx firebase login`
let project = argv.project
if (project) {
  await $`npx firebase use ${project}`
} else {
  project = await $`npx firebase use`
}

await $`npx next build`
await $`npx next export`
await $`npx firebase target:clear hosting cms`
if (argv.site) {
  await $`npx firebase target:apply hosting cms ${argv.site}`
} else {
  await $`npx firebase target:apply hosting cms ${project}`
}
await $`npx firebase deploy`
