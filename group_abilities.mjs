import fs from 'fs';

const dataContent = fs.readFileSync('public/games/pokemon_sd/data.js', 'utf8');
const missingRaw = fs.readFileSync('missing_abilities.txt', 'utf8');
const missing = missingRaw.split('\n').filter(Boolean);

const abilitiesStart = dataContent.indexOf('export const ABILITIES = {');
const lines = dataContent.slice(abilitiesStart).split('\n');
const missingDict = {};

let currentAbility = null;
for (const line of lines) {
    if (line.trim() === '};') break;

    let m = line.match(/^\s*'([^']+)'\s*:/) || line.match(/^\s*"([^"]+)"\s*:/);
    if (m) {
        currentAbility = m[1];
    }

    if (currentAbility && missing.includes(currentAbility)) {
        let descMatch = line.match(/desc:\s*"([^"]+)"/);
        if (descMatch) {
            missingDict[currentAbility] = descMatch[1];
        }
    }
}

const groups = {
    contact: [],
    immunity: [],
    weather_terrain: [],
    stat_boosts: [],
    damage_boosts: [],
    status_ailment: [],
    other: []
};

for (const [ab, desc] of Object.entries(missingDict)) {
    const d = desc.toLowerCase();
    if (d.includes('contact')) {
        groups.contact.push(`${ab}: ${desc}`);
    } else if (d.includes('immune') || d.includes('prevents') || d.includes('absorb') || d.includes('protected') || d.includes('no effect')) {
        groups.immunity.push(`${ab}: ${desc}`);
    } else if (d.includes('weather') || d.includes('terrain') || d.includes('rain') || d.includes('sun') || d.includes('sandstorm') || d.includes('hail')) {
        groups.weather_terrain.push(`${ab}: ${desc}`);
    } else if (d.includes('raises') || d.includes('lowers') || d.includes('stat')) {
        groups.stat_boosts.push(`${ab}: ${desc}`);
    } else if (d.includes('power') || d.includes('damage') || d.includes('strengthens') || d.includes('weakens')) {
        groups.damage_boosts.push(`${ab}: ${desc}`);
    } else if (d.includes('poison') || d.includes('burn') || d.includes('paralyz') || d.includes('sleep') || d.includes('freez')) {
        groups.status_ailment.push(`${ab}: ${desc}`);
    } else {
        groups.other.push(`${ab}: ${desc}`);
    }
}

let report = `# Missing Abilities Grouped by Primitives\n\n`;
for (const [groupName, abs] of Object.entries(groups)) {
    report += `## ${groupName} (${abs.length})\n`;
    for (const line of abs) {
        report += `- ${line}\n`;
    }
    report += `\n`;
}

fs.writeFileSync('missing_abilities_grouped.md', report);
console.log('Wrote missing_abilities_grouped.md');
