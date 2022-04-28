const { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } = require('fs')
const sharp = require('sharp')
var svg_to_png = require('svg-to-png')

const template = `
    <svg width="230" height="230" viewBox="0 0 230 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- chassisb -->
        <!-- body -->
        <!-- chassisa -->
        <!-- turret -->
    </svg>
`

function randInt(max) {
  return Math.floor(Math.random() * (max))
}

function randElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getLayer(name, skip = 0.0) {
  const svg = readFileSync(`./layers/${name}.svg`, 'utf-8')
  const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g
  const layer = svg.match(re)[0]
  return Math.random() > skip ? layer : ''
}

async function svgToPng(name) {
  const src = `./out/${name}.svg`
  const dest = `./out/${name}.png`

  await svg_to_png.convert(src, dest)

  //   const img = await sharp(src);
  //   await img.png({ progressive: true, adaptiveFiltering: true, palette: true }).toFile(dest);
}

function createImage(turret, body, chassis) {
  const final = template
    .replace('<!-- chassisb -->', getLayer(`chassisb${chassis}`))
    .replace('<!-- body -->', getLayer(`body${body}`))
    .replace('<!-- chassisa -->', getLayer(`chassisa${chassis}`))
    .replace('<!-- turret -->', getLayer(`turret${turret}`))

  const meta = {
    name: `TezTank ${turret}${body}${chassis}`,
    description: 'A TezTank Upgradable Tank',
    external_url: `https://teztanks.com/assets/tanks/${turret}${body}${chassis}.svg`,
    image: `https://teztanks.com/assets/tanks/${turret}${body}${chassis}.svg`,
    attributes: [
      {
        turret,
        rarity: 0.10,
      },
      {
        body,
        rarity: 0.20,
      },
      {
        chassis,
        rarity: 0.10,
      }
    ],
  }

  writeFileSync(`./out/${turret}${body}${chassis}.json`, JSON.stringify(meta))
  writeFileSync(`./out/${turret}${body}${chassis}.svg`, final)
  // svgToPng(`${turret}${body}${chassis}`);
}

// Create dir if not exists
if (!existsSync('./out')) {
  mkdirSync('./out')
}

// Cleanup dir before each run
readdirSync('./out').forEach((f) => rmSync(`./out/${f}`))

for (let turret = 0; turret <= 9; turret++) {
  for (let body = 0; body <= 5; body++) {
    for (let chassis = 0; chassis <= 8; chassis++) {
        createImage(turret, body, chassis)
    }
  }
}
