import fs from 'fs';

const htmlContent = fs.readFileSync('public/games/pokemon_sd/index.html', 'utf8');
const dataContent = fs.readFileSync('public/games/pokemon_sd/data.js', 'utf8');

const abilitiesStart = dataContent.indexOf('export const ABILITIES = {');
if (abilitiesStart === -1) {
    console.error("Could not find ABILITIES start");
    process.exit(1);
}

const lines = dataContent.slice(abilitiesStart).split('\n');
const abilitiesToCheck = [];

for (const line of lines) {
    // Stop if we hit the end of the object
    if (line.trim() === '};' && abilitiesToCheck.length > 0) break;

    // Match line like: 'Bulbous': { desc: "...",
    const m = line.match(/^\s*'([^']+)'\s*:/) || line.match(/^\s*"([^"]+)"\s*:/);
    if (m) {
        abilitiesToCheck.push(m[1]);
    }
}

console.log(`Found ${abilitiesToCheck.length} abilities in data.js.`);

const implemented = [];
const missing = [];

for (const ab of abilitiesToCheck) {
    const rawId = ab.toLowerCase().replace(/[^a-z0-9]/g, '');
    let isImplemented = false;

    // Check if ability is referenced in index.html
    const patterns = [
        `ability === '${ab}'`,
        `ability === "${ab}"`,
        `ab === '${rawId}'`,
        `ab === "${rawId}"`
    ];

    for (const pat of patterns) {
        if (htmlContent.includes(pat)) {
            isImplemented = true;
            break;
        }
    }

    if (isImplemented) {
        implemented.push(ab);
    } else {
        missing.push(ab);
    }
}

console.log(`${implemented.length} implemented.`);
console.log(`${missing.length} completely missing.`);

fs.writeFileSync('missing_abilities.txt', missing.join('\n'));
console.log('Wrote missing abilities to missing_abilities.txt');
