export const TYPE_CHART = {
    Normal: { Rock: 0.5, Ghost: 0, Steel: 0.5 },
    Fire: { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Bug: 2, Rock: 0.5, Dragon: 0.5, Steel: 2 },
    Water: { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
    Electric: { Water: 2, Electric: 0.5, Grass: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
    Grass: { Fire: 0.5, Water: 2, Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5, Steel: 0.5 },
    Ice: { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2, Steel: 0.5 },
    Fighting: { Normal: 2, Ice: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dark: 2, Steel: 2, Fairy: 0.5 },
    Poison: { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Fairy: 2 },
    Ground: { Fire: 2, Electric: 2, Grass: 0.5, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
    Flying: { Electric: 0.5, Grass: 2, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
    Psychic: { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
    Bug: { Fire: 0.5, Grass: 2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
    Rock: { Fire: 2, Ice: 2, Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
    Ghost: { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
    Dragon: { Dragon: 2, Steel: 0.5, Fairy: 0 },
    Dark: { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
    Steel: { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
    Fairy: { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 }
};

export function getEffectiveness(attackType, targetTypes) {
    let multiplier = 1;
    for (const tType of targetTypes) {
        if (TYPE_CHART[attackType] && TYPE_CHART[attackType][tType] !== undefined) {
            multiplier *= TYPE_CHART[attackType][tType];
        }
    }
    return multiplier;
}

export const MOVES = {
    'tackle': { name: 'Tackle', type: 'Normal', power: 40, accuracy: 100, category: 'Physical' },
    'quickattack': { name: 'Quick Attack', type: 'Normal', power: 40, accuracy: 100, category: 'Physical', priority: 1 },
    'thunderbolt': { name: 'Thunderbolt', type: 'Electric', power: 90, accuracy: 100, category: 'Special' },
    'flamethrower': { name: 'Flamethrower', type: 'Fire', power: 90, accuracy: 100, category: 'Special' },
    'waterpump': { name: 'Hydro Pump', type: 'Water', power: 110, accuracy: 80, category: 'Special' },
    'earthquake': { name: 'Earthquake', type: 'Ground', power: 100, accuracy: 100, category: 'Physical' },
    'icebeam': { name: 'Ice Beam', type: 'Ice', power: 90, accuracy: 100, category: 'Special' },
    'shadowball': { name: 'Shadow Ball', type: 'Ghost', power: 80, accuracy: 100, category: 'Special' },
    'psychic': { name: 'Psychic', type: 'Psychic', power: 90, accuracy: 100, category: 'Special' },
    'closecombat': { name: 'Close Combat', type: 'Fighting', power: 120, accuracy: 100, category: 'Physical' },
    'dracometeor': { name: 'Draco Meteor', type: 'Dragon', power: 130, accuracy: 90, category: 'Special' },
    'outrage': { name: 'Outrage', type: 'Dragon', power: 120, accuracy: 100, category: 'Physical' },
    'darkpulse': { name: 'Dark Pulse', type: 'Dark', power: 80, accuracy: 100, category: 'Special' },
    'moonblast': { name: 'Moonblast', type: 'Fairy', power: 95, accuracy: 100, category: 'Special' },
    'stoneedge': { name: 'Stone Edge', type: 'Rock', power: 100, accuracy: 80, category: 'Physical', critRate: 1 },
    'bulletpunch': { name: 'Bullet Punch', type: 'Steel', power: 40, accuracy: 100, category: 'Physical', priority: 1 },
    'machpunch': { name: 'Mach Punch', type: 'Fighting', power: 40, accuracy: 100, category: 'Physical', priority: 1 },
    'extremespeed': { name: 'Extreme Speed', type: 'Normal', power: 80, accuracy: 100, category: 'Physical', priority: 2 },
    'hyperbeam': { name: 'Hyper Beam', type: 'Normal', power: 150, accuracy: 90, category: 'Special' },
    'struggle': { name: 'Struggle', type: 'Normal', power: 50, accuracy: 100, category: 'Physical' }
};

// Base Stats are multiplied by level/IV/EVs. To make it quick, we'll auto-calculate actual stats at Level 100.
// Formula (simplified): HP = baseHP * 2 + 110. Other = baseStat * 2 + 5.
function calcStats(base) {
    return {
        hp: base.hp * 2 + 110,
        atk: base.atk * 2 + 5,
        def: base.def * 2 + 5,
        spa: base.spa * 2 + 5,
        spd: base.spd * 2 + 5,
        spe: base.spe * 2 + 5
    };
}

export const POKEMON_DB = [
    {
        id: 'pikachu', name: 'Pikachu', types: ['Electric'],
        ...calcStats({ hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 }),
        moves: ['thunderbolt', 'quickattack', 'struggle', 'tackle'],
        sprite: 'https://play.pokemonshowdown.com/sprites/ani/pikachu.gif',
        spriteBack: 'https://play.pokemonshowdown.com/sprites/ani-back/pikachu.gif'
    },
    {
        id: 'charizard', name: 'Charizard', types: ['Fire', 'Flying'],
        ...calcStats({ hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 }),
        moves: ['flamethrower', 'earthquake', 'quickattack', 'dracometeor'],
        sprite: 'https://play.pokemonshowdown.com/sprites/ani/charizard.gif',
        spriteBack: 'https://play.pokemonshowdown.com/sprites/ani-back/charizard.gif'
    },
    {
        id: 'mewtwo', name: 'Mewtwo', types: ['Psychic'],
        ...calcStats({ hp: 106, atk: 110, def: 90, spa: 154, spd: 90, spe: 130 }),
        moves: ['psychic', 'shadowball', 'icebeam', 'thunderbolt'],
        sprite: 'https://play.pokemonshowdown.com/sprites/ani/mewtwo.gif',
        spriteBack: 'https://play.pokemonshowdown.com/sprites/ani-back/mewtwo.gif'
    },
    {
        id: 'gengar', name: 'Gengar', types: ['Ghost', 'Poison'],
        ...calcStats({ hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 }),
        moves: ['shadowball', 'thunderbolt', 'darkpulse', 'psychic'],
        sprite: 'https://play.pokemonshowdown.com/sprites/ani/gengar.gif',
        spriteBack: 'https://play.pokemonshowdown.com/sprites/ani-back/gengar.gif'
    },
    {
        id: 'snorlax', name: 'Snorlax', types: ['Normal'],
        ...calcStats({ hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 }),
        moves: ['tackle', 'earthquake', 'icebeam', 'shadowball'],
        sprite: 'https://play.pokemonshowdown.com/sprites/ani/snorlax.gif',
        spriteBack: 'https://play.pokemonshowdown.com/sprites/ani-back/snorlax.gif'
    },
    {
        id: 'dragonite', name: 'Dragonite', types: ['Dragon', 'Flying'],
        ...calcStats({ hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80 }),
        moves: ['outrage', 'earthquake', 'flamethrower', 'extremespeed'],
        sprite: 'https://play.pokemonshowdown.com/sprites/ani/dragonite.gif',
        spriteBack: 'https://play.pokemonshowdown.com/sprites/ani-back/dragonite.gif'
    },
    {
        id: 'lucario', name: 'Lucario', types: ['Fighting', 'Steel'],
        ...calcStats({ hp: 70, atk: 110, def: 70, spa: 115, spd: 70, spe: 90 }),
        moves: ['closecombat', 'bulletpunch', 'extremespeed', 'stoneedge'],
        sprite: 'https://play.pokemonshowdown.com/sprites/ani/lucario.gif',
        spriteBack: 'https://play.pokemonshowdown.com/sprites/ani-back/lucario.gif'
    },
    {
        id: 'garchomp', name: 'Garchomp', types: ['Dragon', 'Ground'],
        ...calcStats({ hp: 108, atk: 130, def: 95, spa: 80, spd: 85, spe: 102 }),
        moves: ['earthquake', 'outrage', 'stoneedge', 'dracometeor'],
        sprite: 'https://play.pokemonshowdown.com/sprites/ani/garchomp.gif',
        spriteBack: 'https://play.pokemonshowdown.com/sprites/ani-back/garchomp.gif'
    },
    {
        id: 'greninja', name: 'Greninja', types: ['Water', 'Dark'],
        ...calcStats({ hp: 72, atk: 95, def: 67, spa: 103, spd: 71, spe: 122 }),
        moves: ['waterpump', 'darkpulse', 'icebeam', 'quickattack'],
        sprite: 'https://play.pokemonshowdown.com/sprites/ani/greninja.gif',
        spriteBack: 'https://play.pokemonshowdown.com/sprites/ani-back/greninja.gif'
    },
    {
        id: 'arceus', name: 'Arceus', types: ['Normal'],
        ...calcStats({ hp: 120, atk: 120, def: 120, spa: 120, spd: 120, spe: 120 }),
        moves: ['extremespeed', 'earthquake', 'shadowball', 'dracometeor'],
        sprite: 'https://play.pokemonshowdown.com/sprites/ani/arceus.gif',
        spriteBack: 'https://play.pokemonshowdown.com/sprites/ani-back/arceus.gif'
    }
];

export const FORMATS = [
    { id: 'gen9ou', name: '[Gen 9] OU', warning: '' },
    { id: 'gen9random', name: '[Gen 9] Random Battle', warning: 'WARNING: In Random Battles, teams are auto-generated. This mock ignores auto-generation for now and lets you pick.' },
    { id: 'gen9anythinggoes', name: '[Gen 9] Anything Goes', warning: 'WARNING: Anything Goes format allows teams of identical Pokémon.' },
    { id: 'gen9hackmons', name: '[Gen 9] Unlimited Hackmons', warning: 'WARNING: Pure Chaos!' }
];
