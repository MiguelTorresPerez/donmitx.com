import fs from 'fs';
import path from 'path';

const dataFile = path.resolve('./data.js');

async function fetchAbilities() {
    console.log('Reading data.js...');
    let text = fs.readFileSync(dataFile, 'utf8');

    // Remove the old ABILITIES export
    text = text.replace(/export\s+const\s+ABILITIES\s*=\s*\{[\s\S]*?\};\s*$/, '').trim();

    const allAbilities = new Set();

    // Instead of regex formatting, just find all instances of '"abilities": ['
    let splitByAbilities = text.split('"abilities": [');
    for (let i = 1; i < splitByAbilities.length; i++) {
        // grab whatever is before the closing ']'
        let block = splitByAbilities[i].split(']')[0];

        // now find all words wrapped in quotes
        const stringRegex = /['"]([^'"]+)['"]/g;
        let strMatch;
        while ((strMatch = stringRegex.exec(block)) !== null) {
            const val = strMatch[1];
            if (val.trim() !== '') {
                allAbilities.add(val);
            }
        }
    }

    const uniqueAbilities = Array.from(allAbilities);
    console.log(`Found ${uniqueAbilities.length} unique abilities! Fetching texts...`);

    const resultDict = {};

    for (let i = 0; i < uniqueAbilities.length; i++) {
        const name = uniqueAbilities[i];
        const apiName = name.toLowerCase().replace(/[\s']/g, '-');

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/ability/${apiName}`);
            if (!res.ok) throw new Error('Not found');
            const json = await res.json();

            // Find English flavor text or effect text
            let desc = '';

            // Try to find effect_entries short_effect
            const effectEntry = json.effect_entries.find(e => e.language.name === 'en');
            if (effectEntry) {
                desc = effectEntry.short_effect || effectEntry.effect;
            } else {
                // Fallback to flavor text
                const flavorEntry = json.flavor_text_entries.find(e => e.language.name === 'en');
                if (flavorEntry) desc = flavorEntry.flavor_text;
            }

            // Clean up text
            desc = desc.replace(/\n|\f|\r/g, ' ').replace(/"/g, '\\"');
            resultDict[name] = desc;

            console.log(`[${i + 1}/${uniqueAbilities.length}] Fetched: ${name}`);
        } catch (err) {
            console.log(`[${i + 1}/${uniqueAbilities.length}] Failed to fetch: ${name} (${apiName})`);
            resultDict[name] = 'Passive effect for the Pokémon.';
        }

        // Small delay to prevent API rate limiting
        await new Promise(r => setTimeout(r, 50));
    }

    console.log('Writing back to data.js...');

    let newContent = text + '\n\nexport const ABILITIES = {\n';

    const keys = Object.keys(resultDict);
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        // handle quotes properly
        const safeKey = k.replace(/'/g, "\\'");
        newContent += `    '${safeKey}': { desc: "${resultDict[k]}" }${i < keys.length - 1 ? ',' : ''}\n`;
    }

    newContent += '};\n';
    fs.writeFileSync(dataFile, newContent, 'utf8');

    console.log('Done!');
}

fetchAbilities();
