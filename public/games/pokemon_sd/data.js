export const POKEMON_DB = [
    { id: 'pikachu', name: 'Pikachu', types: ['Electric'], hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { id: 'charizard', name: 'Charizard', types: ['Fire', 'Flying'], hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
    { id: 'mewtwo', name: 'Mewtwo', types: ['Psychic'], hp: 106, atk: 110, def: 90, spa: 154, spd: 90, spe: 130, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png' },
    { id: 'gengar', name: 'Gengar', types: ['Ghost', 'Poison'], hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
    { id: 'snorlax', name: 'Snorlax', types: ['Normal'], hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png' },
    { id: 'dragonite', name: 'Dragonite', types: ['Dragon', 'Flying'], hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png' },
    { id: 'gyarados', name: 'Gyarados', types: ['Water', 'Flying'], hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png' },
    { id: 'alakazam', name: 'Alakazam', types: ['Psychic'], hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png' },
    { id: 'machamp', name: 'Machamp', types: ['Fighting'], hp: 90, atk: 130, def: 80, spa: 65, spd: 85, spe: 55, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png' },
    { id: 'golem', name: 'Golem', types: ['Rock', 'Ground'], hp: 80, atk: 120, def: 130, spa: 55, spd: 65, spe: 45, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png' },
    { id: 'rayquaza', name: 'Rayquaza', types: ['Dragon', 'Flying'], hp: 105, atk: 150, def: 90, spa: 150, spd: 90, spe: 95, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png' },
    { id: 'lucario', name: 'Lucario', types: ['Fighting', 'Steel'], hp: 70, atk: 110, def: 70, spa: 115, spd: 70, spe: 90, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png' },
    { id: 'garchomp', name: 'Garchomp', types: ['Dragon', 'Ground'], hp: 108, atk: 130, def: 95, spa: 80, spd: 85, spe: 102, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png' },
    { id: 'sylveon', name: 'Sylveon', types: ['Fairy'], hp: 95, atk: 65, def: 65, spa: 110, spd: 130, spe: 60, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png' },
    { id: 'greninja', name: 'Greninja', types: ['Water', 'Dark'], hp: 72, atk: 95, def: 67, spa: 103, spd: 71, spe: 122, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png' },
    { id: 'togekiss', name: 'Togekiss', types: ['Fairy', 'Flying'], hp: 85, atk: 50, def: 95, spa: 120, spd: 115, spe: 80, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/468.png' },
    { id: 'arceus', name: 'Arceus', types: ['Normal'], hp: 120, atk: 120, def: 120, spa: 120, spd: 120, spe: 120, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png' },
    { id: 'eternatus', name: 'Eternatus (Eternamax)', types: ['Poison', 'Dragon'], hp: 255, atk: 115, def: 250, spa: 125, spd: 250, spe: 130, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/890-eternamax.png' },
];

export const FORMATS = [
    { id: 'gen9ou', name: '[Gen 9] OU', warning: '' },
    { id: 'gen9random', name: '[Gen 9] Random Battle', warning: '' },
    { id: 'gen9anythinggoes', name: '[Gen 9] Anything Goes', warning: 'WARNING: Anything Goes format allows teams of identical Pokémon, all items, and no evasion or sleep clauses. Battles may become highly unbalanced!' },
    { id: 'gen9hackmons', name: '[Gen 9] Unlimited Hackmons', warning: 'WARNING: Unlimited Hackmons allows ANY move, ANY ability (including Wonder Guard), and maxed EVs on all stats. Prepare for pure chaos!' },
    { id: 'gen9doubles', name: '[Gen 9] Doubles OU', warning: '' },
];
