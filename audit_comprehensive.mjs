/**
 * Comprehensive audit script that:
 * 1. Extracts all unique move effect keys from MOVES in data.js
 * 2. Extracts all unique ability names from POKEMON_DB in data.js
 * 3. Extracts all unique item names from POKEMON_DB (if any) or common competitive items
 * 4. Cross-references each against index.html to find unhandled logic
 */

import { MOVES, POKEMON_DB } from './public/games/pokemon_sd/data.js';
import fs from 'fs';

const indexHtml = fs.readFileSync('./public/games/pokemon_sd/index.html', 'utf-8');

// ─── 1. MOVE EFFECT KEYS ───────────────────────────────────────────
const effectKeyCount = {};
const effectKeyValues = {};
let movesWithEffects = 0;
let movesWithoutEffects = 0;

for (const [id, move] of Object.entries(MOVES)) {
    if (!move.effects || Object.keys(move.effects).length === 0 ||
        (Object.keys(move.effects).length === 1 && move.effects.desc)) {
        movesWithoutEffects++;
        continue;
    }
    movesWithEffects++;
    for (const [key, val] of Object.entries(move.effects)) {
        if (key === 'desc') continue;
        effectKeyCount[key] = (effectKeyCount[key] || 0) + 1;
        if (!effectKeyValues[key]) effectKeyValues[key] = new Set();
        effectKeyValues[key].add(typeof val === 'object' ? JSON.stringify(val) : String(val));
    }
}

console.log('=== MOVE EFFECT KEYS ===');
console.log(`Total moves: ${Object.keys(MOVES).length}`);
console.log(`Moves with effects: ${movesWithEffects}, without: ${movesWithoutEffects}`);
console.log('');

// Sort by count descending
const sortedKeys = Object.entries(effectKeyCount).sort((a, b) => b[1] - a[1]);
for (const [key, count] of sortedKeys) {
    // Check if this key is referenced in index.html
    const regex = new RegExp(`fx\\.${key}|effects\\.${key}|move\\.${key}`, 'i');
    const handled = regex.test(indexHtml);
    const vals = [...effectKeyValues[key]].slice(0, 5).join(', ');
    console.log(`  ${handled ? '✅' : '❌'} fx.${key} (${count} moves) — sample values: ${vals}`);
}

// ─── 2. UNIQUE ABILITIES ───────────────────────────────────────────
const allAbilities = new Set();
for (const mon of POKEMON_DB) {
    if (mon.abilities) {
        for (const ab of mon.abilities) {
            allAbilities.add(ab);
        }
    }
}

console.log('\n=== UNIQUE ABILITIES ===');
console.log(`Total unique abilities: ${allAbilities.size}`);

const handledAbilities = [];
const unhandledAbilities = [];
for (const ab of [...allAbilities].sort()) {
    // Check multiple patterns the ability might be referenced by
    const patterns = [
        ab,
        ab.toLowerCase().replace(/[\s-]/g, ''),
        `'${ab}'`,
        `"${ab}"`,
        `=== '${ab}'`,
        `=== "${ab}"`
    ];
    const found = patterns.some(p => indexHtml.includes(p));
    if (found) {
        handledAbilities.push(ab);
    } else {
        unhandledAbilities.push(ab);
    }
}

console.log(`Handled: ${handledAbilities.length}, Unhandled: ${unhandledAbilities.length}`);
console.log('\nUnhandled abilities:');
for (const ab of unhandledAbilities) {
    console.log(`  ❌ ${ab}`);
}

// ─── 3. ITEMS ──────────────────────────────────────────────────────
// Extract items mentioned in index.html
const itemRegex = /(?:mon|defMon|newMon|m|p)\.item\s*===?\s*['"]([^'"]+)['"]/g;
const handledItems = new Set();
let match;
while ((match = itemRegex.exec(indexHtml)) !== null) {
    handledItems.add(match[1]);
}

// Common competitive items that should have logic
const competitiveItems = [
    'Leftovers', 'Choice Band', 'Choice Scarf', 'Choice Specs', 'Life Orb',
    'Eviolite', 'Assault Vest', 'Focus Sash', 'Heavy-Duty Boots', 'Rocky Helmet',
    'Black Sludge', 'Air Balloon', 'Sitrus Berry', 'Lum Berry', 'Aguav Berry',
    'Figy Berry', 'Wiki Berry', 'Mago Berry', 'Iapapa Berry',
    'Flame Orb', 'Toxic Orb', 'Expert Belt', 'Muscle Band', 'Wise Glasses',
    'Light Clay', 'Heat Rock', 'Damp Rock', 'Icy Rock', 'Smooth Rock',
    'Terrain Extender', 'Shed Shell', 'Red Card', 'Eject Button', 'Safety Goggles',
    'Protective Pads', 'Throat Spray', 'Weakness Policy', 'Power Herb',
    'White Herb', 'Mental Herb', 'Mirror Herb', 'Booster Energy',
    'Clear Amulet', 'Covert Cloak', 'Loaded Dice', 'Punching Glove',
    'Ability Shield', 'Metronome'
];

console.log('\n=== ITEMS ===');
console.log(`Items with logic in index.html: ${handledItems.size}`);
for (const item of [...handledItems].sort()) {
    console.log(`  ✅ ${item}`);
}

console.log('\nMissing competitive items:');
for (const item of competitiveItems) {
    if (!handledItems.has(item)) {
        console.log(`  ❌ ${item}`);
    }
}

// ─── 4. MOVE PROPERTIES (non-effect) ─────────────────────────────
// Check for move properties like contact, priority, etc.
const moveProps = {};
for (const [id, move] of Object.entries(MOVES)) {
    for (const key of Object.keys(move)) {
        if (!['name', 'type', 'power', 'accuracy', 'category', 'desc', 'effects', 'id'].includes(key)) {
            moveProps[key] = (moveProps[key] || 0) + 1;
        }
    }
}
console.log('\n=== MOVE PROPERTIES (non-standard) ===');
for (const [key, count] of Object.entries(moveProps).sort((a, b) => b[1] - a[1])) {
    const handled = indexHtml.includes(`move.${key}`) || indexHtml.includes(`fm.${key}`);
    console.log(`  ${handled ? '✅' : '❌'} move.${key} (${count} moves)`);
}
