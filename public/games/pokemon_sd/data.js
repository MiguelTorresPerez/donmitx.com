export const TYPE_CHART = {
    Normal:  { Rock: 0.5, Ghost: 0, Steel: 0.5 },
    Fire:    { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Bug: 2, Rock: 0.5, Dragon: 0.5, Steel: 2 },
    Water:   { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
    Electric:{ Water: 2, Electric: 0.5, Grass: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
    Grass:   { Fire: 0.5, Water: 2, Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5, Steel: 0.5 },
    Ice:     { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2, Steel: 0.5 },
    Fighting:{ Normal: 2, Ice: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dark: 2, Steel: 2, Fairy: 0.5 },
    Poison:  { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Fairy: 2 },
    Ground:  { Fire: 2, Electric: 2, Grass: 0.5, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
    Flying:  { Electric: 0.5, Grass: 2, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
    Psychic: { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
    Bug:     { Fire: 0.5, Grass: 2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
    Rock:    { Fire: 2, Ice: 2, Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
    Ghost:   { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
    Dragon:  { Dragon: 2, Steel: 0.5, Fairy: 0 },
    Dark:    { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
    Steel:   { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
    Fairy:   { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 }
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
    "struggle": {
        "name": "Struggle",
        "type": "Normal",
        "power": 50,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "razor-wind": {
        "name": "Razor Wind",
        "type": "Normal",
        "power": 80,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "headbutt": {
        "name": "Headbutt",
        "type": "Normal",
        "power": 70,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "body-slam": {
        "name": "Body Slam",
        "type": "Normal",
        "power": 85,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "take-down": {
        "name": "Take Down",
        "type": "Normal",
        "power": 90,
        "accuracy": 85,
        "category": "Physical",
        "priority": 0
    },
    "double-edge": {
        "name": "Double Edge",
        "type": "Normal",
        "power": 120,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "strength": {
        "name": "Strength",
        "type": "Normal",
        "power": 80,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "razor-leaf": {
        "name": "Razor Leaf",
        "type": "Grass",
        "power": 55,
        "accuracy": 95,
        "category": "Physical",
        "priority": 0
    },
    "solar-beam": {
        "name": "Solar Beam",
        "type": "Grass",
        "power": 120,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "hyper-beam": {
        "name": "Hyper Beam",
        "type": "Normal",
        "power": 150,
        "accuracy": 90,
        "category": "Special",
        "priority": 0
    },
    "mega-punch": {
        "name": "Mega Punch",
        "type": "Normal",
        "power": 80,
        "accuracy": 85,
        "category": "Physical",
        "priority": 0
    },
    "fire-punch": {
        "name": "Fire Punch",
        "type": "Fire",
        "power": 75,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "thunder-punch": {
        "name": "Thunder Punch",
        "type": "Electric",
        "power": 75,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "wing-attack": {
        "name": "Wing Attack",
        "type": "Flying",
        "power": 60,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "mega-kick": {
        "name": "Mega Kick",
        "type": "Normal",
        "power": 120,
        "accuracy": 75,
        "category": "Physical",
        "priority": 0
    },
    "bite": {
        "name": "Bite",
        "type": "Dark",
        "power": 60,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "fly": {
        "name": "Fly",
        "type": "Flying",
        "power": 90,
        "accuracy": 95,
        "category": "Physical",
        "priority": 0
    },
    "ice-punch": {
        "name": "Ice Punch",
        "type": "Ice",
        "power": 75,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "hydro-pump": {
        "name": "Hydro Pump",
        "type": "Water",
        "power": 110,
        "accuracy": 80,
        "category": "Special",
        "priority": 0
    },
    "surf": {
        "name": "Surf",
        "type": "Water",
        "power": 90,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "bug-bite": {
        "name": "Bug Bite",
        "type": "Bug",
        "power": 60,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "electroweb": {
        "name": "Electroweb",
        "type": "Electric",
        "power": 55,
        "accuracy": 95,
        "category": "Special",
        "priority": 0
    },
    "psybeam": {
        "name": "Psybeam",
        "type": "Psychic",
        "power": 65,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "psychic": {
        "name": "Psychic",
        "type": "Psychic",
        "power": 90,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "quick-attack": {
        "name": "Quick Attack",
        "type": "Normal",
        "power": 40,
        "accuracy": 100,
        "category": "Physical",
        "priority": 1
    },
    "swift": {
        "name": "Swift",
        "type": "Normal",
        "power": 60,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "sky-attack": {
        "name": "Sky Attack",
        "type": "Flying",
        "power": 140,
        "accuracy": 90,
        "category": "Physical",
        "priority": 0
    },
    "ice-beam": {
        "name": "Ice Beam",
        "type": "Ice",
        "power": 90,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "blizzard": {
        "name": "Blizzard",
        "type": "Ice",
        "power": 110,
        "accuracy": 70,
        "category": "Special",
        "priority": 0
    },
    "bubble-beam": {
        "name": "Bubble Beam",
        "type": "Water",
        "power": 65,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "thunderbolt": {
        "name": "Thunderbolt",
        "type": "Electric",
        "power": 90,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "drill-peck": {
        "name": "Drill Peck",
        "type": "Flying",
        "power": 80,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "slam": {
        "name": "Slam",
        "type": "Normal",
        "power": 80,
        "accuracy": 75,
        "category": "Physical",
        "priority": 0
    },
    "submission": {
        "name": "Submission",
        "type": "Fighting",
        "power": 80,
        "accuracy": 80,
        "category": "Physical",
        "priority": 0
    },
    "earthquake": {
        "name": "Earthquake",
        "type": "Ground",
        "power": 100,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "dig": {
        "name": "Dig",
        "type": "Ground",
        "power": 80,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "horn-attack": {
        "name": "Horn Attack",
        "type": "Normal",
        "power": 65,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "thrash": {
        "name": "Thrash",
        "type": "Normal",
        "power": 120,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "flamethrower": {
        "name": "Flamethrower",
        "type": "Fire",
        "power": 90,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "fire-blast": {
        "name": "Fire Blast",
        "type": "Fire",
        "power": 110,
        "accuracy": 85,
        "category": "Special",
        "priority": 0
    },
    "petal-dance": {
        "name": "Petal Dance",
        "type": "Grass",
        "power": 120,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "leech-life": {
        "name": "Leech Life",
        "type": "Bug",
        "power": 80,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "rock-slide": {
        "name": "Rock Slide",
        "type": "Rock",
        "power": 75,
        "accuracy": 90,
        "category": "Physical",
        "priority": 0
    },
    "slash": {
        "name": "Slash",
        "type": "Normal",
        "power": 70,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "thunder": {
        "name": "Thunder",
        "type": "Electric",
        "power": 110,
        "accuracy": 70,
        "category": "Special",
        "priority": 0
    },
    "rolling-kick": {
        "name": "Rolling Kick",
        "type": "Fighting",
        "power": 60,
        "accuracy": 85,
        "category": "Physical",
        "priority": 0
    },
    "stomp": {
        "name": "Stomp",
        "type": "Normal",
        "power": 65,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "explosion": {
        "name": "Explosion",
        "type": "Normal",
        "power": 250,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "zap-cannon": {
        "name": "Zap Cannon",
        "type": "Electric",
        "power": 120,
        "accuracy": 50,
        "category": "Special",
        "priority": 0
    },
    "tri-attack": {
        "name": "Tri Attack",
        "type": "Normal",
        "power": 80,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "jump-kick": {
        "name": "Jump Kick",
        "type": "Fighting",
        "power": 100,
        "accuracy": 95,
        "category": "Physical",
        "priority": 0
    },
    "aurora-beam": {
        "name": "Aurora Beam",
        "type": "Ice",
        "power": 65,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "self-destruct": {
        "name": "Self Destruct",
        "type": "Normal",
        "power": 200,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "vice-grip": {
        "name": "Vice Grip",
        "type": "Normal",
        "power": 55,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "thief": {
        "name": "Thief",
        "type": "Dark",
        "power": 60,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "skull-bash": {
        "name": "Skull Bash",
        "type": "Normal",
        "power": 130,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "sludge": {
        "name": "Sludge",
        "type": "Poison",
        "power": 65,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "bounce": {
        "name": "Bounce",
        "type": "Flying",
        "power": 85,
        "accuracy": 85,
        "category": "Physical",
        "priority": 0
    },
    "giga-drain": {
        "name": "Giga Drain",
        "type": "Grass",
        "power": 75,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "dream-eater": {
        "name": "Dream Eater",
        "type": "Psychic",
        "power": 100,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "dizzy-punch": {
        "name": "Dizzy Punch",
        "type": "Normal",
        "power": 70,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "waterfall": {
        "name": "Waterfall",
        "type": "Water",
        "power": 80,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "feint-attack": {
        "name": "Feint Attack",
        "type": "Dark",
        "power": 60,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "sludge-bomb": {
        "name": "Sludge Bomb",
        "type": "Poison",
        "power": 90,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "hidden-power": {
        "name": "Hidden Power",
        "type": "Normal",
        "power": 60,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "facade": {
        "name": "Facade",
        "type": "Normal",
        "power": 70,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "high-jump-kick": {
        "name": "High Jump Kick",
        "type": "Fighting",
        "power": 130,
        "accuracy": 90,
        "category": "Physical",
        "priority": 0
    },
    "iron-tail": {
        "name": "Iron Tail",
        "type": "Steel",
        "power": 100,
        "accuracy": 75,
        "category": "Physical",
        "priority": 0
    },
    "steel-wing": {
        "name": "Steel Wing",
        "type": "Steel",
        "power": 70,
        "accuracy": 90,
        "category": "Physical",
        "priority": 0
    },
    "icy-wind": {
        "name": "Icy Wind",
        "type": "Ice",
        "power": 55,
        "accuracy": 95,
        "category": "Special",
        "priority": 0
    },
    "dragon-breath": {
        "name": "Dragon Breath",
        "type": "Dragon",
        "power": 60,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    },
    "zen-headbutt": {
        "name": "Zen Headbutt",
        "type": "Psychic",
        "power": 80,
        "accuracy": 90,
        "category": "Physical",
        "priority": 0
    },
    "iron-head": {
        "name": "Iron Head",
        "type": "Steel",
        "power": 80,
        "accuracy": 100,
        "category": "Physical",
        "priority": 0
    },
    "steel-beam": {
        "name": "Steel Beam",
        "type": "Steel",
        "power": 140,
        "accuracy": 95,
        "category": "Special",
        "priority": 0
    },
    "tera-blast": {
        "name": "Tera Blast",
        "type": "Normal",
        "power": 80,
        "accuracy": 100,
        "category": "Special",
        "priority": 0
    }
};

export const POKEMON_DB = [
    {
        "id": "bulbasaur",
        "name": "Bulbasaur",
        "types": [
            "Grass",
            "Poison"
        ],
        "hp": 200,
        "atk": 103,
        "def": 103,
        "spa": 135,
        "spd": 135,
        "spe": 95,
        "moves": [
            "razor-wind",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/bulbasaur.gif"
    },
    {
        "id": "ivysaur",
        "name": "Ivysaur",
        "types": [
            "Grass",
            "Poison"
        ],
        "hp": 230,
        "atk": 129,
        "def": 131,
        "spa": 165,
        "spd": 165,
        "spe": 125,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ivysaur.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ivysaur.gif"
    },
    {
        "id": "venusaur",
        "name": "Venusaur",
        "types": [
            "Grass",
            "Poison"
        ],
        "hp": 270,
        "atk": 169,
        "def": 171,
        "spa": 205,
        "spd": 205,
        "spe": 165,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/venusaur.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/venusaur.gif"
    },
    {
        "id": "charmander",
        "name": "Charmander",
        "types": [
            "Fire"
        ],
        "hp": 188,
        "atk": 109,
        "def": 91,
        "spa": 125,
        "spd": 105,
        "spe": 135,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "wing-attack"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/charmander.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/charmander.gif"
    },
    {
        "id": "charmeleon",
        "name": "Charmeleon",
        "types": [
            "Fire"
        ],
        "hp": 226,
        "atk": 133,
        "def": 121,
        "spa": 165,
        "spd": 135,
        "spe": 165,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/charmeleon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/charmeleon.gif"
    },
    {
        "id": "charizard",
        "name": "Charizard",
        "types": [
            "Fire",
            "Flying"
        ],
        "hp": 266,
        "atk": 173,
        "def": 161,
        "spa": 223,
        "spd": 175,
        "spe": 205,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "wing-attack"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/charizard.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/charizard.gif"
    },
    {
        "id": "squirtle",
        "name": "Squirtle",
        "types": [
            "Water"
        ],
        "hp": 198,
        "atk": 101,
        "def": 135,
        "spa": 105,
        "spd": 133,
        "spe": 91,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/squirtle.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/squirtle.gif"
    },
    {
        "id": "wartortle",
        "name": "Wartortle",
        "types": [
            "Water"
        ],
        "hp": 228,
        "atk": 131,
        "def": 165,
        "spa": 135,
        "spd": 165,
        "spe": 121,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/wartortle.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/wartortle.gif"
    },
    {
        "id": "blastoise",
        "name": "Blastoise",
        "types": [
            "Water"
        ],
        "hp": 268,
        "atk": 171,
        "def": 205,
        "spa": 175,
        "spd": 215,
        "spe": 161,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/blastoise.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/blastoise.gif"
    },
    {
        "id": "caterpie",
        "name": "Caterpie",
        "types": [
            "Bug"
        ],
        "hp": 200,
        "atk": 65,
        "def": 75,
        "spa": 45,
        "spd": 45,
        "spe": 95,
        "moves": [
            "bug-bite",
            "electroweb",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/caterpie.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/caterpie.gif"
    },
    {
        "id": "metapod",
        "name": "Metapod",
        "types": [
            "Bug"
        ],
        "hp": 210,
        "atk": 45,
        "def": 115,
        "spa": 55,
        "spd": 55,
        "spe": 65,
        "moves": [
            "bug-bite",
            "electroweb",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/metapod.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/metapod.gif"
    },
    {
        "id": "butterfree",
        "name": "Butterfree",
        "types": [
            "Bug",
            "Flying"
        ],
        "hp": 230,
        "atk": 95,
        "def": 105,
        "spa": 185,
        "spd": 165,
        "spe": 145,
        "moves": [
            "razor-wind",
            "headbutt",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/butterfree.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/butterfree.gif"
    },
    {
        "id": "weedle",
        "name": "Weedle",
        "types": [
            "Bug",
            "Poison"
        ],
        "hp": 190,
        "atk": 75,
        "def": 65,
        "spa": 45,
        "spd": 45,
        "spe": 105,
        "moves": [
            "bug-bite",
            "electroweb",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/weedle.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/weedle.gif"
    },
    {
        "id": "kakuna",
        "name": "Kakuna",
        "types": [
            "Bug",
            "Poison"
        ],
        "hp": 200,
        "atk": 55,
        "def": 105,
        "spa": 55,
        "spd": 55,
        "spe": 75,
        "moves": [
            "bug-bite",
            "electroweb",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/kakuna.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/kakuna.gif"
    },
    {
        "id": "beedrill",
        "name": "Beedrill",
        "types": [
            "Bug",
            "Poison"
        ],
        "hp": 240,
        "atk": 185,
        "def": 85,
        "spa": 95,
        "spd": 165,
        "spe": 155,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hyper-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/beedrill.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/beedrill.gif"
    },
    {
        "id": "pidgey",
        "name": "Pidgey",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 190,
        "atk": 95,
        "def": 85,
        "spa": 75,
        "spd": 75,
        "spe": 117,
        "moves": [
            "razor-wind",
            "wing-attack",
            "fly",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/pidgey.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/pidgey.gif"
    },
    {
        "id": "pidgeotto",
        "name": "Pidgeotto",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 236,
        "atk": 125,
        "def": 115,
        "spa": 105,
        "spd": 105,
        "spe": 147,
        "moves": [
            "razor-wind",
            "wing-attack",
            "fly",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/pidgeotto.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/pidgeotto.gif"
    },
    {
        "id": "pidgeot",
        "name": "Pidgeot",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 276,
        "atk": 165,
        "def": 155,
        "spa": 145,
        "spd": 145,
        "spe": 207,
        "moves": [
            "razor-wind",
            "wing-attack",
            "fly",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/pidgeot.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/pidgeot.gif"
    },
    {
        "id": "rattata",
        "name": "Rattata",
        "types": [
            "Normal"
        ],
        "hp": 170,
        "atk": 117,
        "def": 75,
        "spa": 55,
        "spd": 75,
        "spe": 149,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/rattata.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/rattata.gif"
    },
    {
        "id": "raticate",
        "name": "Raticate",
        "types": [
            "Normal"
        ],
        "hp": 220,
        "atk": 167,
        "def": 125,
        "spa": 105,
        "spd": 145,
        "spe": 199,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/raticate.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/raticate.gif"
    },
    {
        "id": "spearow",
        "name": "Spearow",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 190,
        "atk": 125,
        "def": 65,
        "spa": 67,
        "spd": 67,
        "spe": 145,
        "moves": [
            "razor-wind",
            "wing-attack",
            "fly",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/spearow.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/spearow.gif"
    },
    {
        "id": "fearow",
        "name": "Fearow",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 240,
        "atk": 185,
        "def": 135,
        "spa": 127,
        "spd": 127,
        "spe": 205,
        "moves": [
            "razor-wind",
            "wing-attack",
            "fly",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/fearow.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/fearow.gif"
    },
    {
        "id": "ekans",
        "name": "Ekans",
        "types": [
            "Poison"
        ],
        "hp": 180,
        "atk": 125,
        "def": 93,
        "spa": 85,
        "spd": 113,
        "spe": 115,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ekans.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ekans.gif"
    },
    {
        "id": "arbok",
        "name": "Arbok",
        "types": [
            "Poison"
        ],
        "hp": 230,
        "atk": 195,
        "def": 143,
        "spa": 135,
        "spd": 163,
        "spe": 165,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/arbok.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/arbok.gif"
    },
    {
        "id": "pikachu",
        "name": "Pikachu",
        "types": [
            "Electric"
        ],
        "hp": 180,
        "atk": 115,
        "def": 85,
        "spa": 105,
        "spd": 105,
        "spe": 185,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "slam",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/pikachu.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/pikachu.gif"
    },
    {
        "id": "raichu",
        "name": "Raichu",
        "types": [
            "Electric"
        ],
        "hp": 230,
        "atk": 185,
        "def": 115,
        "spa": 185,
        "spd": 165,
        "spe": 225,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "slam",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/raichu.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/raichu.gif"
    },
    {
        "id": "sandshrew",
        "name": "Sandshrew",
        "types": [
            "Ground"
        ],
        "hp": 210,
        "atk": 155,
        "def": 175,
        "spa": 45,
        "spd": 65,
        "spe": 85,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sandshrew.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sandshrew.gif"
    },
    {
        "id": "sandslash",
        "name": "Sandslash",
        "types": [
            "Ground"
        ],
        "hp": 260,
        "atk": 205,
        "def": 225,
        "spa": 95,
        "spd": 115,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sandslash.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sandslash.gif"
    },
    {
        "id": "nidoran-f",
        "name": "Nidoran-f",
        "types": [
            "Poison"
        ],
        "hp": 220,
        "atk": 99,
        "def": 109,
        "spa": 85,
        "spd": 85,
        "spe": 87,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/nidoran-f.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/nidoran-f.gif"
    },
    {
        "id": "nidorina",
        "name": "Nidorina",
        "types": [
            "Poison"
        ],
        "hp": 250,
        "atk": 129,
        "def": 139,
        "spa": 115,
        "spd": 115,
        "spe": 117,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/nidorina.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/nidorina.gif"
    },
    {
        "id": "nidoqueen",
        "name": "Nidoqueen",
        "types": [
            "Poison",
            "Ground"
        ],
        "hp": 290,
        "atk": 189,
        "def": 179,
        "spa": 155,
        "spd": 175,
        "spe": 157,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/nidoqueen.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/nidoqueen.gif"
    },
    {
        "id": "nidoran-m",
        "name": "Nidoran-m",
        "types": [
            "Poison"
        ],
        "hp": 202,
        "atk": 119,
        "def": 85,
        "spa": 85,
        "spd": 85,
        "spe": 105,
        "moves": [
            "headbutt",
            "horn-attack",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/nidoran-m.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/nidoran-m.gif"
    },
    {
        "id": "nidorino",
        "name": "Nidorino",
        "types": [
            "Poison"
        ],
        "hp": 232,
        "atk": 149,
        "def": 119,
        "spa": 115,
        "spd": 115,
        "spe": 135,
        "moves": [
            "headbutt",
            "horn-attack",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/nidorino.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/nidorino.gif"
    },
    {
        "id": "nidoking",
        "name": "Nidoking",
        "types": [
            "Poison",
            "Ground"
        ],
        "hp": 272,
        "atk": 209,
        "def": 159,
        "spa": 175,
        "spd": 155,
        "spe": 175,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/nidoking.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/nidoking.gif"
    },
    {
        "id": "clefairy",
        "name": "Clefairy",
        "types": [
            "Fairy"
        ],
        "hp": 250,
        "atk": 95,
        "def": 101,
        "spa": 125,
        "spd": 135,
        "spe": 75,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/clefairy.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/clefairy.gif"
    },
    {
        "id": "clefable",
        "name": "Clefable",
        "types": [
            "Fairy"
        ],
        "hp": 300,
        "atk": 145,
        "def": 151,
        "spa": 195,
        "spd": 185,
        "spe": 125,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/clefable.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/clefable.gif"
    },
    {
        "id": "vulpix",
        "name": "Vulpix",
        "types": [
            "Fire"
        ],
        "hp": 186,
        "atk": 87,
        "def": 85,
        "spa": 105,
        "spd": 135,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/vulpix.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/vulpix.gif"
    },
    {
        "id": "ninetales",
        "name": "Ninetales",
        "types": [
            "Fire"
        ],
        "hp": 256,
        "atk": 157,
        "def": 155,
        "spa": 167,
        "spd": 205,
        "spe": 205,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ninetales.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ninetales.gif"
    },
    {
        "id": "jigglypuff",
        "name": "Jigglypuff",
        "types": [
            "Normal",
            "Fairy"
        ],
        "hp": 340,
        "atk": 95,
        "def": 45,
        "spa": 95,
        "spd": 55,
        "spe": 45,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/jigglypuff.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/jigglypuff.gif"
    },
    {
        "id": "wigglytuff",
        "name": "Wigglytuff",
        "types": [
            "Normal",
            "Fairy"
        ],
        "hp": 390,
        "atk": 145,
        "def": 95,
        "spa": 175,
        "spd": 105,
        "spe": 95,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/wigglytuff.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/wigglytuff.gif"
    },
    {
        "id": "zubat",
        "name": "Zubat",
        "types": [
            "Poison",
            "Flying"
        ],
        "hp": 190,
        "atk": 95,
        "def": 75,
        "spa": 65,
        "spd": 85,
        "spe": 115,
        "moves": [
            "razor-wind",
            "wing-attack",
            "fly",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/zubat.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/zubat.gif"
    },
    {
        "id": "golbat",
        "name": "Golbat",
        "types": [
            "Poison",
            "Flying"
        ],
        "hp": 260,
        "atk": 165,
        "def": 145,
        "spa": 135,
        "spd": 155,
        "spe": 185,
        "moves": [
            "razor-wind",
            "wing-attack",
            "fly",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/golbat.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/golbat.gif"
    },
    {
        "id": "oddish",
        "name": "Oddish",
        "types": [
            "Grass",
            "Poison"
        ],
        "hp": 200,
        "atk": 105,
        "def": 115,
        "spa": 155,
        "spd": 135,
        "spe": 65,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "razor-leaf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/oddish.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/oddish.gif"
    },
    {
        "id": "gloom",
        "name": "Gloom",
        "types": [
            "Grass",
            "Poison"
        ],
        "hp": 230,
        "atk": 135,
        "def": 145,
        "spa": 175,
        "spd": 155,
        "spe": 85,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "razor-leaf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/gloom.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/gloom.gif"
    },
    {
        "id": "vileplume",
        "name": "Vileplume",
        "types": [
            "Grass",
            "Poison"
        ],
        "hp": 260,
        "atk": 165,
        "def": 175,
        "spa": 225,
        "spd": 185,
        "spe": 105,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/vileplume.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/vileplume.gif"
    },
    {
        "id": "paras",
        "name": "Paras",
        "types": [
            "Bug",
            "Grass"
        ],
        "hp": 180,
        "atk": 145,
        "def": 115,
        "spa": 95,
        "spd": 115,
        "spe": 55,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/paras.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/paras.gif"
    },
    {
        "id": "parasect",
        "name": "Parasect",
        "types": [
            "Bug",
            "Grass"
        ],
        "hp": 230,
        "atk": 195,
        "def": 165,
        "spa": 125,
        "spd": 165,
        "spe": 65,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/parasect.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/parasect.gif"
    },
    {
        "id": "venonat",
        "name": "Venonat",
        "types": [
            "Bug",
            "Poison"
        ],
        "hp": 230,
        "atk": 115,
        "def": 105,
        "spa": 85,
        "spd": 115,
        "spe": 95,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "psybeam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/venonat.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/venonat.gif"
    },
    {
        "id": "venomoth",
        "name": "Venomoth",
        "types": [
            "Bug",
            "Poison"
        ],
        "hp": 250,
        "atk": 135,
        "def": 125,
        "spa": 185,
        "spd": 155,
        "spe": 185,
        "moves": [
            "razor-wind",
            "headbutt",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/venomoth.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/venomoth.gif"
    },
    {
        "id": "diglett",
        "name": "Diglett",
        "types": [
            "Ground"
        ],
        "hp": 130,
        "atk": 115,
        "def": 55,
        "spa": 75,
        "spd": 95,
        "spe": 195,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/diglett.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/diglett.gif"
    },
    {
        "id": "dugtrio",
        "name": "Dugtrio",
        "types": [
            "Ground"
        ],
        "hp": 180,
        "atk": 205,
        "def": 105,
        "spa": 105,
        "spd": 145,
        "spe": 245,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/dugtrio.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/dugtrio.gif"
    },
    {
        "id": "meowth",
        "name": "Meowth",
        "types": [
            "Normal"
        ],
        "hp": 190,
        "atk": 95,
        "def": 75,
        "spa": 85,
        "spd": 85,
        "spe": 185,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/meowth.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/meowth.gif"
    },
    {
        "id": "persian",
        "name": "Persian",
        "types": [
            "Normal"
        ],
        "hp": 240,
        "atk": 145,
        "def": 125,
        "spa": 135,
        "spd": 135,
        "spe": 235,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/persian.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/persian.gif"
    },
    {
        "id": "psyduck",
        "name": "Psyduck",
        "types": [
            "Water"
        ],
        "hp": 210,
        "atk": 109,
        "def": 101,
        "spa": 135,
        "spd": 105,
        "spe": 115,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/psyduck.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/psyduck.gif"
    },
    {
        "id": "golduck",
        "name": "Golduck",
        "types": [
            "Water"
        ],
        "hp": 270,
        "atk": 169,
        "def": 161,
        "spa": 195,
        "spd": 165,
        "spe": 175,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/golduck.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/golduck.gif"
    },
    {
        "id": "mankey",
        "name": "Mankey",
        "types": [
            "Fighting"
        ],
        "hp": 190,
        "atk": 165,
        "def": 75,
        "spa": 75,
        "spd": 95,
        "spe": 145,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/mankey.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/mankey.gif"
    },
    {
        "id": "primeape",
        "name": "Primeape",
        "types": [
            "Fighting"
        ],
        "hp": 240,
        "atk": 215,
        "def": 125,
        "spa": 125,
        "spd": 145,
        "spe": 195,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/primeape.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/primeape.gif"
    },
    {
        "id": "growlithe",
        "name": "Growlithe",
        "types": [
            "Fire"
        ],
        "hp": 220,
        "atk": 145,
        "def": 95,
        "spa": 145,
        "spd": 105,
        "spe": 125,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "thrash"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/growlithe.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/growlithe.gif"
    },
    {
        "id": "arcanine",
        "name": "Arcanine",
        "types": [
            "Fire"
        ],
        "hp": 290,
        "atk": 225,
        "def": 165,
        "spa": 205,
        "spd": 165,
        "spe": 195,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/arcanine.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/arcanine.gif"
    },
    {
        "id": "poliwag",
        "name": "Poliwag",
        "types": [
            "Water"
        ],
        "hp": 190,
        "atk": 105,
        "def": 85,
        "spa": 85,
        "spd": 85,
        "spe": 185,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/poliwag.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/poliwag.gif"
    },
    {
        "id": "poliwhirl",
        "name": "Poliwhirl",
        "types": [
            "Water"
        ],
        "hp": 240,
        "atk": 135,
        "def": 135,
        "spa": 105,
        "spd": 105,
        "spe": 185,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/poliwhirl.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/poliwhirl.gif"
    },
    {
        "id": "poliwrath",
        "name": "Poliwrath",
        "types": [
            "Water",
            "Fighting"
        ],
        "hp": 290,
        "atk": 195,
        "def": 195,
        "spa": 145,
        "spd": 185,
        "spe": 145,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/poliwrath.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/poliwrath.gif"
    },
    {
        "id": "abra",
        "name": "Abra",
        "types": [
            "Psychic"
        ],
        "hp": 160,
        "atk": 45,
        "def": 35,
        "spa": 215,
        "spd": 115,
        "spe": 185,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/abra.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/abra.gif"
    },
    {
        "id": "kadabra",
        "name": "Kadabra",
        "types": [
            "Psychic"
        ],
        "hp": 190,
        "atk": 75,
        "def": 65,
        "spa": 245,
        "spd": 145,
        "spe": 215,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/kadabra.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/kadabra.gif"
    },
    {
        "id": "alakazam",
        "name": "Alakazam",
        "types": [
            "Psychic"
        ],
        "hp": 220,
        "atk": 105,
        "def": 95,
        "spa": 275,
        "spd": 195,
        "spe": 245,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/alakazam.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/alakazam.gif"
    },
    {
        "id": "machop",
        "name": "Machop",
        "types": [
            "Fighting"
        ],
        "hp": 250,
        "atk": 165,
        "def": 105,
        "spa": 75,
        "spd": 75,
        "spe": 75,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/machop.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/machop.gif"
    },
    {
        "id": "machoke",
        "name": "Machoke",
        "types": [
            "Fighting"
        ],
        "hp": 270,
        "atk": 205,
        "def": 145,
        "spa": 105,
        "spd": 125,
        "spe": 95,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/machoke.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/machoke.gif"
    },
    {
        "id": "machamp",
        "name": "Machamp",
        "types": [
            "Fighting"
        ],
        "hp": 290,
        "atk": 265,
        "def": 165,
        "spa": 135,
        "spd": 175,
        "spe": 115,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/machamp.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/machamp.gif"
    },
    {
        "id": "bellsprout",
        "name": "Bellsprout",
        "types": [
            "Grass",
            "Poison"
        ],
        "hp": 210,
        "atk": 155,
        "def": 75,
        "spa": 145,
        "spd": 65,
        "spe": 85,
        "moves": [
            "slam",
            "headbutt",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/bellsprout.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/bellsprout.gif"
    },
    {
        "id": "weepinbell",
        "name": "Weepinbell",
        "types": [
            "Grass",
            "Poison"
        ],
        "hp": 240,
        "atk": 185,
        "def": 105,
        "spa": 175,
        "spd": 95,
        "spe": 115,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/weepinbell.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/weepinbell.gif"
    },
    {
        "id": "victreebel",
        "name": "Victreebel",
        "types": [
            "Grass",
            "Poison"
        ],
        "hp": 270,
        "atk": 215,
        "def": 135,
        "spa": 205,
        "spd": 145,
        "spe": 145,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/victreebel.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/victreebel.gif"
    },
    {
        "id": "tentacool",
        "name": "Tentacool",
        "types": [
            "Water",
            "Poison"
        ],
        "hp": 190,
        "atk": 85,
        "def": 75,
        "spa": 105,
        "spd": 205,
        "spe": 145,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/tentacool.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/tentacool.gif"
    },
    {
        "id": "tentacruel",
        "name": "Tentacruel",
        "types": [
            "Water",
            "Poison"
        ],
        "hp": 270,
        "atk": 145,
        "def": 135,
        "spa": 165,
        "spd": 245,
        "spe": 205,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/tentacruel.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/tentacruel.gif"
    },
    {
        "id": "geodude",
        "name": "Geodude",
        "types": [
            "Rock",
            "Ground"
        ],
        "hp": 190,
        "atk": 165,
        "def": 205,
        "spa": 65,
        "spd": 65,
        "spe": 45,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/geodude.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/geodude.gif"
    },
    {
        "id": "graveler",
        "name": "Graveler",
        "types": [
            "Rock",
            "Ground"
        ],
        "hp": 220,
        "atk": 195,
        "def": 235,
        "spa": 95,
        "spd": 95,
        "spe": 75,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/graveler.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/graveler.gif"
    },
    {
        "id": "golem",
        "name": "Golem",
        "types": [
            "Rock",
            "Ground"
        ],
        "hp": 270,
        "atk": 245,
        "def": 265,
        "spa": 115,
        "spd": 135,
        "spe": 95,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/golem.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/golem.gif"
    },
    {
        "id": "ponyta",
        "name": "Ponyta",
        "types": [
            "Fire"
        ],
        "hp": 210,
        "atk": 175,
        "def": 115,
        "spa": 135,
        "spd": 135,
        "spe": 185,
        "moves": [
            "stomp",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ponyta.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ponyta.gif"
    },
    {
        "id": "rapidash",
        "name": "Rapidash",
        "types": [
            "Fire"
        ],
        "hp": 240,
        "atk": 205,
        "def": 145,
        "spa": 165,
        "spd": 165,
        "spe": 215,
        "moves": [
            "stomp",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/rapidash.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/rapidash.gif"
    },
    {
        "id": "slowpoke",
        "name": "Slowpoke",
        "types": [
            "Water",
            "Psychic"
        ],
        "hp": 290,
        "atk": 135,
        "def": 135,
        "spa": 85,
        "spd": 85,
        "spe": 35,
        "moves": [
            "stomp",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/slowpoke.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/slowpoke.gif"
    },
    {
        "id": "slowbro",
        "name": "Slowbro",
        "types": [
            "Water",
            "Psychic"
        ],
        "hp": 300,
        "atk": 155,
        "def": 225,
        "spa": 205,
        "spd": 165,
        "spe": 65,
        "moves": [
            "mega-punch",
            "ice-punch",
            "stomp",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/slowbro.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/slowbro.gif"
    },
    {
        "id": "magnemite",
        "name": "Magnemite",
        "types": [
            "Electric",
            "Steel"
        ],
        "hp": 160,
        "atk": 75,
        "def": 145,
        "spa": 195,
        "spd": 115,
        "spe": 95,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "thunderbolt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/magnemite.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/magnemite.gif"
    },
    {
        "id": "magneton",
        "name": "Magneton",
        "types": [
            "Electric",
            "Steel"
        ],
        "hp": 210,
        "atk": 125,
        "def": 195,
        "spa": 245,
        "spd": 145,
        "spe": 145,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hyper-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/magneton.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/magneton.gif"
    },
    {
        "id": "farfetchd",
        "name": "Farfetchd",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 214,
        "atk": 185,
        "def": 115,
        "spa": 121,
        "spd": 129,
        "spe": 125,
        "moves": [
            "razor-wind",
            "fly",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/farfetchd.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/farfetchd.gif"
    },
    {
        "id": "doduo",
        "name": "Doduo",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 180,
        "atk": 175,
        "def": 95,
        "spa": 75,
        "spd": 75,
        "spe": 155,
        "moves": [
            "wing-attack",
            "fly",
            "jump-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/doduo.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/doduo.gif"
    },
    {
        "id": "dodrio",
        "name": "Dodrio",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 230,
        "atk": 225,
        "def": 145,
        "spa": 125,
        "spd": 125,
        "spe": 225,
        "moves": [
            "wing-attack",
            "fly",
            "jump-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/dodrio.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/dodrio.gif"
    },
    {
        "id": "seel",
        "name": "Seel",
        "types": [
            "Water"
        ],
        "hp": 240,
        "atk": 95,
        "def": 115,
        "spa": 95,
        "spd": 145,
        "spe": 95,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/seel.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/seel.gif"
    },
    {
        "id": "dewgong",
        "name": "Dewgong",
        "types": [
            "Water",
            "Ice"
        ],
        "hp": 290,
        "atk": 145,
        "def": 165,
        "spa": 145,
        "spd": 195,
        "spe": 145,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/dewgong.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/dewgong.gif"
    },
    {
        "id": "grimer",
        "name": "Grimer",
        "types": [
            "Poison"
        ],
        "hp": 270,
        "atk": 165,
        "def": 105,
        "spa": 85,
        "spd": 105,
        "spe": 55,
        "moves": [
            "fire-punch",
            "ice-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/grimer.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/grimer.gif"
    },
    {
        "id": "muk",
        "name": "Muk",
        "types": [
            "Poison"
        ],
        "hp": 320,
        "atk": 215,
        "def": 155,
        "spa": 135,
        "spd": 205,
        "spe": 105,
        "moves": [
            "fire-punch",
            "ice-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/muk.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/muk.gif"
    },
    {
        "id": "shellder",
        "name": "Shellder",
        "types": [
            "Water"
        ],
        "hp": 170,
        "atk": 135,
        "def": 205,
        "spa": 95,
        "spd": 55,
        "spe": 85,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/shellder.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/shellder.gif"
    },
    {
        "id": "cloyster",
        "name": "Cloyster",
        "types": [
            "Water",
            "Ice"
        ],
        "hp": 210,
        "atk": 195,
        "def": 365,
        "spa": 175,
        "spd": 95,
        "spe": 145,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/cloyster.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/cloyster.gif"
    },
    {
        "id": "gastly",
        "name": "Gastly",
        "types": [
            "Ghost",
            "Poison"
        ],
        "hp": 170,
        "atk": 75,
        "def": 65,
        "spa": 205,
        "spd": 75,
        "spe": 165,
        "moves": [
            "fire-punch",
            "ice-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/gastly.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/gastly.gif"
    },
    {
        "id": "haunter",
        "name": "Haunter",
        "types": [
            "Ghost",
            "Poison"
        ],
        "hp": 200,
        "atk": 105,
        "def": 95,
        "spa": 235,
        "spd": 115,
        "spe": 195,
        "moves": [
            "fire-punch",
            "ice-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/haunter.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/haunter.gif"
    },
    {
        "id": "gengar",
        "name": "Gengar",
        "types": [
            "Ghost",
            "Poison"
        ],
        "hp": 230,
        "atk": 135,
        "def": 125,
        "spa": 265,
        "spd": 155,
        "spe": 225,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/gengar.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/gengar.gif"
    },
    {
        "id": "onix",
        "name": "Onix",
        "types": [
            "Rock",
            "Ground"
        ],
        "hp": 180,
        "atk": 95,
        "def": 325,
        "spa": 65,
        "spd": 95,
        "spe": 145,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/onix.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/onix.gif"
    },
    {
        "id": "drowzee",
        "name": "Drowzee",
        "types": [
            "Psychic"
        ],
        "hp": 230,
        "atk": 101,
        "def": 95,
        "spa": 91,
        "spd": 185,
        "spe": 89,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/drowzee.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/drowzee.gif"
    },
    {
        "id": "hypno",
        "name": "Hypno",
        "types": [
            "Psychic"
        ],
        "hp": 280,
        "atk": 151,
        "def": 145,
        "spa": 151,
        "spd": 235,
        "spe": 139,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/hypno.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/hypno.gif"
    },
    {
        "id": "krabby",
        "name": "Krabby",
        "types": [
            "Water"
        ],
        "hp": 170,
        "atk": 215,
        "def": 185,
        "spa": 55,
        "spd": 55,
        "spe": 105,
        "moves": [
            "vice-grip",
            "slam",
            "stomp",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/krabby.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/krabby.gif"
    },
    {
        "id": "kingler",
        "name": "Kingler",
        "types": [
            "Water"
        ],
        "hp": 220,
        "atk": 265,
        "def": 235,
        "spa": 105,
        "spd": 105,
        "spe": 155,
        "moves": [
            "vice-grip",
            "slam",
            "stomp",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/kingler.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/kingler.gif"
    },
    {
        "id": "voltorb",
        "name": "Voltorb",
        "types": [
            "Electric"
        ],
        "hp": 190,
        "atk": 65,
        "def": 105,
        "spa": 115,
        "spd": 115,
        "spe": 205,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "thunderbolt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/voltorb.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/voltorb.gif"
    },
    {
        "id": "electrode",
        "name": "Electrode",
        "types": [
            "Electric"
        ],
        "hp": 230,
        "atk": 105,
        "def": 145,
        "spa": 165,
        "spd": 165,
        "spe": 305,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hyper-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/electrode.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/electrode.gif"
    },
    {
        "id": "exeggcute",
        "name": "Exeggcute",
        "types": [
            "Grass",
            "Psychic"
        ],
        "hp": 230,
        "atk": 85,
        "def": 165,
        "spa": 125,
        "spd": 95,
        "spe": 85,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "psybeam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/exeggcute.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/exeggcute.gif"
    },
    {
        "id": "exeggutor",
        "name": "Exeggutor",
        "types": [
            "Grass",
            "Psychic"
        ],
        "hp": 300,
        "atk": 195,
        "def": 175,
        "spa": 255,
        "spd": 155,
        "spe": 115,
        "moves": [
            "stomp",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/exeggutor.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/exeggutor.gif"
    },
    {
        "id": "cubone",
        "name": "Cubone",
        "types": [
            "Ground"
        ],
        "hp": 210,
        "atk": 105,
        "def": 195,
        "spa": 85,
        "spd": 105,
        "spe": 75,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/cubone.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/cubone.gif"
    },
    {
        "id": "marowak",
        "name": "Marowak",
        "types": [
            "Ground"
        ],
        "hp": 230,
        "atk": 165,
        "def": 225,
        "spa": 105,
        "spd": 165,
        "spe": 95,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/marowak.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/marowak.gif"
    },
    {
        "id": "hitmonlee",
        "name": "Hitmonlee",
        "types": [
            "Fighting"
        ],
        "hp": 210,
        "atk": 245,
        "def": 111,
        "spa": 75,
        "spd": 225,
        "spe": 179,
        "moves": [
            "mega-punch",
            "mega-kick",
            "jump-kick",
            "rolling-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/hitmonlee.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/hitmonlee.gif"
    },
    {
        "id": "hitmonchan",
        "name": "Hitmonchan",
        "types": [
            "Fighting"
        ],
        "hp": 210,
        "atk": 215,
        "def": 163,
        "spa": 75,
        "spd": 225,
        "spe": 157,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/hitmonchan.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/hitmonchan.gif"
    },
    {
        "id": "lickitung",
        "name": "Lickitung",
        "types": [
            "Normal"
        ],
        "hp": 290,
        "atk": 115,
        "def": 155,
        "spa": 125,
        "spd": 155,
        "spe": 65,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/lickitung.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/lickitung.gif"
    },
    {
        "id": "koffing",
        "name": "Koffing",
        "types": [
            "Poison"
        ],
        "hp": 190,
        "atk": 135,
        "def": 195,
        "spa": 125,
        "spd": 95,
        "spe": 75,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "flamethrower"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/koffing.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/koffing.gif"
    },
    {
        "id": "weezing",
        "name": "Weezing",
        "types": [
            "Poison"
        ],
        "hp": 240,
        "atk": 185,
        "def": 245,
        "spa": 175,
        "spd": 145,
        "spe": 125,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "flamethrower"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/weezing.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/weezing.gif"
    },
    {
        "id": "rhyhorn",
        "name": "Rhyhorn",
        "types": [
            "Ground",
            "Rock"
        ],
        "hp": 270,
        "atk": 175,
        "def": 195,
        "spa": 65,
        "spd": 65,
        "spe": 55,
        "moves": [
            "stomp",
            "headbutt",
            "horn-attack",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/rhyhorn.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/rhyhorn.gif"
    },
    {
        "id": "rhydon",
        "name": "Rhydon",
        "types": [
            "Ground",
            "Rock"
        ],
        "hp": 320,
        "atk": 265,
        "def": 245,
        "spa": 95,
        "spd": 95,
        "spe": 85,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/rhydon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/rhydon.gif"
    },
    {
        "id": "chansey",
        "name": "Chansey",
        "types": [
            "Normal"
        ],
        "hp": 610,
        "atk": 15,
        "def": 15,
        "spa": 75,
        "spd": 215,
        "spe": 105,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/chansey.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/chansey.gif"
    },
    {
        "id": "tangela",
        "name": "Tangela",
        "types": [
            "Grass"
        ],
        "hp": 240,
        "atk": 115,
        "def": 235,
        "spa": 205,
        "spd": 85,
        "spe": 125,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/tangela.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/tangela.gif"
    },
    {
        "id": "kangaskhan",
        "name": "Kangaskhan",
        "types": [
            "Normal"
        ],
        "hp": 320,
        "atk": 195,
        "def": 165,
        "spa": 85,
        "spd": 165,
        "spe": 185,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/kangaskhan.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/kangaskhan.gif"
    },
    {
        "id": "horsea",
        "name": "Horsea",
        "types": [
            "Water"
        ],
        "hp": 170,
        "atk": 85,
        "def": 145,
        "spa": 145,
        "spd": 55,
        "spe": 125,
        "moves": [
            "razor-wind",
            "headbutt",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/horsea.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/horsea.gif"
    },
    {
        "id": "seadra",
        "name": "Seadra",
        "types": [
            "Water"
        ],
        "hp": 220,
        "atk": 135,
        "def": 195,
        "spa": 195,
        "spd": 95,
        "spe": 175,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/seadra.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/seadra.gif"
    },
    {
        "id": "goldeen",
        "name": "Goldeen",
        "types": [
            "Water"
        ],
        "hp": 200,
        "atk": 139,
        "def": 125,
        "spa": 75,
        "spd": 105,
        "spe": 131,
        "moves": [
            "headbutt",
            "horn-attack",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/goldeen.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/goldeen.gif"
    },
    {
        "id": "seaking",
        "name": "Seaking",
        "types": [
            "Water"
        ],
        "hp": 270,
        "atk": 189,
        "def": 135,
        "spa": 135,
        "spd": 165,
        "spe": 141,
        "moves": [
            "headbutt",
            "horn-attack",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/seaking.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/seaking.gif"
    },
    {
        "id": "staryu",
        "name": "Staryu",
        "types": [
            "Water"
        ],
        "hp": 170,
        "atk": 95,
        "def": 115,
        "spa": 145,
        "spd": 115,
        "spe": 175,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/staryu.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/staryu.gif"
    },
    {
        "id": "starmie",
        "name": "Starmie",
        "types": [
            "Water",
            "Psychic"
        ],
        "hp": 230,
        "atk": 155,
        "def": 175,
        "spa": 205,
        "spd": 175,
        "spe": 235,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/starmie.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/starmie.gif"
    },
    {
        "id": "mr-mime",
        "name": "Mr-mime",
        "types": [
            "Psychic",
            "Fairy"
        ],
        "hp": 190,
        "atk": 95,
        "def": 135,
        "spa": 205,
        "spd": 245,
        "spe": 185,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/mr-mime.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/mr-mime.gif"
    },
    {
        "id": "scyther",
        "name": "Scyther",
        "types": [
            "Bug",
            "Flying"
        ],
        "hp": 250,
        "atk": 225,
        "def": 165,
        "spa": 115,
        "spd": 165,
        "spe": 215,
        "moves": [
            "razor-wind",
            "wing-attack",
            "headbutt",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/scyther.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/scyther.gif"
    },
    {
        "id": "jynx",
        "name": "Jynx",
        "types": [
            "Ice",
            "Psychic"
        ],
        "hp": 240,
        "atk": 105,
        "def": 75,
        "spa": 235,
        "spd": 195,
        "spe": 195,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/jynx.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/jynx.gif"
    },
    {
        "id": "electabuzz",
        "name": "Electabuzz",
        "types": [
            "Electric"
        ],
        "hp": 240,
        "atk": 171,
        "def": 119,
        "spa": 195,
        "spd": 175,
        "spe": 215,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/electabuzz.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/electabuzz.gif"
    },
    {
        "id": "magmar",
        "name": "Magmar",
        "types": [
            "Fire"
        ],
        "hp": 240,
        "atk": 195,
        "def": 119,
        "spa": 205,
        "spd": 175,
        "spe": 191,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/magmar.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/magmar.gif"
    },
    {
        "id": "pinsir",
        "name": "Pinsir",
        "types": [
            "Bug"
        ],
        "hp": 240,
        "atk": 255,
        "def": 205,
        "spa": 115,
        "spd": 145,
        "spe": 175,
        "moves": [
            "vice-grip",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/pinsir.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/pinsir.gif"
    },
    {
        "id": "tauros",
        "name": "Tauros",
        "types": [
            "Normal"
        ],
        "hp": 260,
        "atk": 205,
        "def": 195,
        "spa": 85,
        "spd": 145,
        "spe": 225,
        "moves": [
            "stomp",
            "headbutt",
            "horn-attack",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/tauros.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/tauros.gif"
    },
    {
        "id": "magikarp",
        "name": "Magikarp",
        "types": [
            "Water"
        ],
        "hp": 150,
        "atk": 25,
        "def": 115,
        "spa": 35,
        "spd": 45,
        "spe": 165,
        "moves": [
            "hydro-pump",
            "bounce",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/magikarp.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/magikarp.gif"
    },
    {
        "id": "gyarados",
        "name": "Gyarados",
        "types": [
            "Water",
            "Flying"
        ],
        "hp": 300,
        "atk": 255,
        "def": 163,
        "spa": 125,
        "spd": 205,
        "spe": 167,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "thrash"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/gyarados.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/gyarados.gif"
    },
    {
        "id": "lapras",
        "name": "Lapras",
        "types": [
            "Water",
            "Ice"
        ],
        "hp": 370,
        "atk": 175,
        "def": 165,
        "spa": 175,
        "spd": 195,
        "spe": 125,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/lapras.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/lapras.gif"
    },
    {
        "id": "ditto",
        "name": "Ditto",
        "types": [
            "Normal"
        ],
        "hp": 206,
        "atk": 101,
        "def": 101,
        "spa": 101,
        "spd": 101,
        "spe": 101,
        "moves": [
            "struggle",
            "struggle",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ditto.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ditto.gif"
    },
    {
        "id": "eevee",
        "name": "Eevee",
        "types": [
            "Normal"
        ],
        "hp": 220,
        "atk": 115,
        "def": 105,
        "spa": 95,
        "spd": 135,
        "spe": 115,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/eevee.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/eevee.gif"
    },
    {
        "id": "vaporeon",
        "name": "Vaporeon",
        "types": [
            "Water"
        ],
        "hp": 370,
        "atk": 135,
        "def": 125,
        "spa": 225,
        "spd": 195,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/vaporeon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/vaporeon.gif"
    },
    {
        "id": "jolteon",
        "name": "Jolteon",
        "types": [
            "Electric"
        ],
        "hp": 240,
        "atk": 135,
        "def": 125,
        "spa": 225,
        "spd": 195,
        "spe": 265,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/jolteon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/jolteon.gif"
    },
    {
        "id": "flareon",
        "name": "Flareon",
        "types": [
            "Fire"
        ],
        "hp": 240,
        "atk": 265,
        "def": 125,
        "spa": 195,
        "spd": 225,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/flareon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/flareon.gif"
    },
    {
        "id": "porygon",
        "name": "Porygon",
        "types": [
            "Normal"
        ],
        "hp": 240,
        "atk": 125,
        "def": 145,
        "spa": 175,
        "spd": 155,
        "spe": 85,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "ice-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/porygon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/porygon.gif"
    },
    {
        "id": "omanyte",
        "name": "Omanyte",
        "types": [
            "Rock",
            "Water"
        ],
        "hp": 180,
        "atk": 85,
        "def": 205,
        "spa": 185,
        "spd": 115,
        "spe": 75,
        "moves": [
            "slam",
            "headbutt",
            "horn-attack",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/omanyte.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/omanyte.gif"
    },
    {
        "id": "omastar",
        "name": "Omastar",
        "types": [
            "Rock",
            "Water"
        ],
        "hp": 250,
        "atk": 125,
        "def": 255,
        "spa": 235,
        "spd": 145,
        "spe": 115,
        "moves": [
            "headbutt",
            "horn-attack",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/omastar.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/omastar.gif"
    },
    {
        "id": "kabuto",
        "name": "Kabuto",
        "types": [
            "Rock",
            "Water"
        ],
        "hp": 170,
        "atk": 165,
        "def": 185,
        "spa": 115,
        "spd": 95,
        "spe": 115,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/kabuto.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/kabuto.gif"
    },
    {
        "id": "kabutops",
        "name": "Kabutops",
        "types": [
            "Rock",
            "Water"
        ],
        "hp": 230,
        "atk": 235,
        "def": 215,
        "spa": 135,
        "spd": 145,
        "spe": 165,
        "moves": [
            "razor-wind",
            "mega-kick",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/kabutops.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/kabutops.gif"
    },
    {
        "id": "aerodactyl",
        "name": "Aerodactyl",
        "types": [
            "Rock",
            "Flying"
        ],
        "hp": 270,
        "atk": 215,
        "def": 135,
        "spa": 125,
        "spd": 155,
        "spe": 265,
        "moves": [
            "razor-wind",
            "wing-attack",
            "fly",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/aerodactyl.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/aerodactyl.gif"
    },
    {
        "id": "snorlax",
        "name": "Snorlax",
        "types": [
            "Normal"
        ],
        "hp": 430,
        "atk": 225,
        "def": 135,
        "spa": 135,
        "spd": 225,
        "spe": 65,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/snorlax.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/snorlax.gif"
    },
    {
        "id": "articuno",
        "name": "Articuno",
        "types": [
            "Ice",
            "Flying"
        ],
        "hp": 290,
        "atk": 175,
        "def": 205,
        "spa": 195,
        "spd": 255,
        "spe": 175,
        "moves": [
            "razor-wind",
            "fly",
            "headbutt",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/articuno.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/articuno.gif"
    },
    {
        "id": "zapdos",
        "name": "Zapdos",
        "types": [
            "Electric",
            "Flying"
        ],
        "hp": 290,
        "atk": 185,
        "def": 175,
        "spa": 255,
        "spd": 185,
        "spe": 205,
        "moves": [
            "razor-wind",
            "fly",
            "headbutt",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/zapdos.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/zapdos.gif"
    },
    {
        "id": "moltres",
        "name": "Moltres",
        "types": [
            "Fire",
            "Flying"
        ],
        "hp": 290,
        "atk": 205,
        "def": 185,
        "spa": 255,
        "spd": 175,
        "spe": 185,
        "moves": [
            "razor-wind",
            "wing-attack",
            "fly",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/moltres.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/moltres.gif"
    },
    {
        "id": "dratini",
        "name": "Dratini",
        "types": [
            "Dragon"
        ],
        "hp": 192,
        "atk": 133,
        "def": 95,
        "spa": 105,
        "spd": 105,
        "spe": 105,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/dratini.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/dratini.gif"
    },
    {
        "id": "dragonair",
        "name": "Dragonair",
        "types": [
            "Dragon"
        ],
        "hp": 232,
        "atk": 173,
        "def": 135,
        "spa": 145,
        "spd": 145,
        "spe": 145,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/dragonair.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/dragonair.gif"
    },
    {
        "id": "dragonite",
        "name": "Dragonite",
        "types": [
            "Dragon",
            "Flying"
        ],
        "hp": 292,
        "atk": 273,
        "def": 195,
        "spa": 205,
        "spd": 205,
        "spe": 165,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/dragonite.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/dragonite.gif"
    },
    {
        "id": "mewtwo",
        "name": "Mewtwo",
        "types": [
            "Psychic"
        ],
        "hp": 322,
        "atk": 225,
        "def": 185,
        "spa": 313,
        "spd": 185,
        "spe": 265,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/mewtwo.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/mewtwo.gif"
    },
    {
        "id": "mew",
        "name": "Mew",
        "types": [
            "Psychic"
        ],
        "hp": 310,
        "atk": 205,
        "def": 205,
        "spa": 205,
        "spd": 205,
        "spe": 205,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/mew.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/mew.gif"
    },
    {
        "id": "chikorita",
        "name": "Chikorita",
        "types": [
            "Grass"
        ],
        "hp": 200,
        "atk": 103,
        "def": 135,
        "spa": 103,
        "spd": 135,
        "spe": 95,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/chikorita.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/chikorita.gif"
    },
    {
        "id": "bayleef",
        "name": "Bayleef",
        "types": [
            "Grass"
        ],
        "hp": 230,
        "atk": 129,
        "def": 165,
        "spa": 131,
        "spd": 165,
        "spe": 125,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/bayleef.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/bayleef.gif"
    },
    {
        "id": "meganium",
        "name": "Meganium",
        "types": [
            "Grass"
        ],
        "hp": 270,
        "atk": 169,
        "def": 205,
        "spa": 171,
        "spd": 205,
        "spe": 165,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/meganium.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/meganium.gif"
    },
    {
        "id": "cyndaquil",
        "name": "Cyndaquil",
        "types": [
            "Fire"
        ],
        "hp": 188,
        "atk": 109,
        "def": 91,
        "spa": 125,
        "spd": 105,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "thrash"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/cyndaquil.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/cyndaquil.gif"
    },
    {
        "id": "quilava",
        "name": "Quilava",
        "types": [
            "Fire"
        ],
        "hp": 226,
        "atk": 133,
        "def": 121,
        "spa": 165,
        "spd": 135,
        "spe": 165,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/quilava.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/quilava.gif"
    },
    {
        "id": "typhlosion",
        "name": "Typhlosion",
        "types": [
            "Fire"
        ],
        "hp": 266,
        "atk": 173,
        "def": 161,
        "spa": 223,
        "spd": 175,
        "spe": 205,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/typhlosion.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/typhlosion.gif"
    },
    {
        "id": "totodile",
        "name": "Totodile",
        "types": [
            "Water"
        ],
        "hp": 210,
        "atk": 135,
        "def": 133,
        "spa": 93,
        "spd": 101,
        "spe": 91,
        "moves": [
            "mega-punch",
            "ice-punch",
            "razor-wind",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/totodile.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/totodile.gif"
    },
    {
        "id": "croconaw",
        "name": "Croconaw",
        "types": [
            "Water"
        ],
        "hp": 240,
        "atk": 165,
        "def": 165,
        "spa": 123,
        "spd": 131,
        "spe": 121,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/croconaw.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/croconaw.gif"
    },
    {
        "id": "feraligatr",
        "name": "Feraligatr",
        "types": [
            "Water"
        ],
        "hp": 280,
        "atk": 215,
        "def": 205,
        "spa": 163,
        "spd": 171,
        "spe": 161,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/feraligatr.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/feraligatr.gif"
    },
    {
        "id": "sentret",
        "name": "Sentret",
        "types": [
            "Normal"
        ],
        "hp": 180,
        "atk": 97,
        "def": 73,
        "spa": 75,
        "spd": 95,
        "spe": 45,
        "moves": [
            "fire-punch",
            "ice-punch",
            "thunder-punch",
            "slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sentret.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sentret.gif"
    },
    {
        "id": "furret",
        "name": "Furret",
        "types": [
            "Normal"
        ],
        "hp": 280,
        "atk": 157,
        "def": 133,
        "spa": 95,
        "spd": 115,
        "spe": 185,
        "moves": [
            "fire-punch",
            "ice-punch",
            "thunder-punch",
            "slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/furret.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/furret.gif"
    },
    {
        "id": "hoothoot",
        "name": "Hoothoot",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 230,
        "atk": 65,
        "def": 65,
        "spa": 77,
        "spd": 117,
        "spe": 105,
        "moves": [
            "wing-attack",
            "fly",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/hoothoot.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/hoothoot.gif"
    },
    {
        "id": "noctowl",
        "name": "Noctowl",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 310,
        "atk": 105,
        "def": 105,
        "spa": 177,
        "spd": 197,
        "spe": 145,
        "moves": [
            "wing-attack",
            "fly",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/noctowl.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/noctowl.gif"
    },
    {
        "id": "ledyba",
        "name": "Ledyba",
        "types": [
            "Bug",
            "Flying"
        ],
        "hp": 190,
        "atk": 45,
        "def": 65,
        "spa": 85,
        "spd": 165,
        "spe": 115,
        "moves": [
            "mega-punch",
            "ice-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ledyba.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ledyba.gif"
    },
    {
        "id": "ledian",
        "name": "Ledian",
        "types": [
            "Bug",
            "Flying"
        ],
        "hp": 220,
        "atk": 75,
        "def": 105,
        "spa": 115,
        "spd": 225,
        "spe": 175,
        "moves": [
            "mega-punch",
            "ice-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ledian.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ledian.gif"
    },
    {
        "id": "spinarak",
        "name": "Spinarak",
        "types": [
            "Bug",
            "Poison"
        ],
        "hp": 190,
        "atk": 125,
        "def": 85,
        "spa": 85,
        "spd": 85,
        "spe": 65,
        "moves": [
            "body-slam",
            "double-edge",
            "psybeam",
            "solar-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/spinarak.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/spinarak.gif"
    },
    {
        "id": "ariados",
        "name": "Ariados",
        "types": [
            "Bug",
            "Poison"
        ],
        "hp": 250,
        "atk": 185,
        "def": 145,
        "spa": 125,
        "spd": 145,
        "spe": 85,
        "moves": [
            "body-slam",
            "double-edge",
            "hyper-beam",
            "solar-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ariados.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ariados.gif"
    },
    {
        "id": "crobat",
        "name": "Crobat",
        "types": [
            "Poison",
            "Flying"
        ],
        "hp": 280,
        "atk": 185,
        "def": 165,
        "spa": 145,
        "spd": 165,
        "spe": 265,
        "moves": [
            "wing-attack",
            "fly",
            "double-edge",
            "bite"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/crobat.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/crobat.gif"
    },
    {
        "id": "chinchou",
        "name": "Chinchou",
        "types": [
            "Water",
            "Electric"
        ],
        "hp": 260,
        "atk": 81,
        "def": 81,
        "spa": 117,
        "spd": 117,
        "spe": 139,
        "moves": [
            "take-down",
            "double-edge",
            "hydro-pump",
            "surf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/chinchou.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/chinchou.gif"
    },
    {
        "id": "lanturn",
        "name": "Lanturn",
        "types": [
            "Water",
            "Electric"
        ],
        "hp": 360,
        "atk": 121,
        "def": 121,
        "spa": 157,
        "spd": 157,
        "spe": 139,
        "moves": [
            "take-down",
            "double-edge",
            "hydro-pump",
            "surf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/lanturn.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/lanturn.gif"
    },
    {
        "id": "pichu",
        "name": "Pichu",
        "types": [
            "Electric"
        ],
        "hp": 150,
        "atk": 85,
        "def": 35,
        "spa": 75,
        "spd": 75,
        "spe": 125,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/pichu.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/pichu.gif"
    },
    {
        "id": "cleffa",
        "name": "Cleffa",
        "types": [
            "Fairy"
        ],
        "hp": 210,
        "atk": 55,
        "def": 61,
        "spa": 95,
        "spd": 115,
        "spe": 35,
        "moves": [
            "mega-punch",
            "mega-kick",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/cleffa.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/cleffa.gif"
    },
    {
        "id": "igglybuff",
        "name": "Igglybuff",
        "types": [
            "Normal",
            "Fairy"
        ],
        "hp": 290,
        "atk": 65,
        "def": 35,
        "spa": 85,
        "spd": 45,
        "spe": 35,
        "moves": [
            "mega-punch",
            "mega-kick",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/igglybuff.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/igglybuff.gif"
    },
    {
        "id": "togepi",
        "name": "Togepi",
        "types": [
            "Fairy"
        ],
        "hp": 180,
        "atk": 45,
        "def": 135,
        "spa": 85,
        "spd": 135,
        "spe": 45,
        "moves": [
            "mega-punch",
            "mega-kick",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/togepi.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/togepi.gif"
    },
    {
        "id": "togetic",
        "name": "Togetic",
        "types": [
            "Fairy",
            "Flying"
        ],
        "hp": 220,
        "atk": 85,
        "def": 175,
        "spa": 165,
        "spd": 215,
        "spe": 85,
        "moves": [
            "mega-punch",
            "fly",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/togetic.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/togetic.gif"
    },
    {
        "id": "natu",
        "name": "Natu",
        "types": [
            "Psychic",
            "Flying"
        ],
        "hp": 190,
        "atk": 105,
        "def": 95,
        "spa": 145,
        "spd": 95,
        "spe": 145,
        "moves": [
            "double-edge",
            "drill-peck",
            "solar-beam",
            "psychic"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/natu.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/natu.gif"
    },
    {
        "id": "xatu",
        "name": "Xatu",
        "types": [
            "Psychic",
            "Flying"
        ],
        "hp": 240,
        "atk": 155,
        "def": 145,
        "spa": 195,
        "spd": 145,
        "spe": 195,
        "moves": [
            "fly",
            "double-edge",
            "hyper-beam",
            "solar-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/xatu.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/xatu.gif"
    },
    {
        "id": "mareep",
        "name": "Mareep",
        "types": [
            "Electric"
        ],
        "hp": 220,
        "atk": 85,
        "def": 85,
        "spa": 135,
        "spd": 95,
        "spe": 75,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/mareep.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/mareep.gif"
    },
    {
        "id": "flaaffy",
        "name": "Flaaffy",
        "types": [
            "Electric"
        ],
        "hp": 250,
        "atk": 115,
        "def": 115,
        "spa": 165,
        "spd": 125,
        "spe": 95,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/flaaffy.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/flaaffy.gif"
    },
    {
        "id": "ampharos",
        "name": "Ampharos",
        "types": [
            "Electric"
        ],
        "hp": 290,
        "atk": 155,
        "def": 175,
        "spa": 235,
        "spd": 185,
        "spe": 115,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ampharos.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ampharos.gif"
    },
    {
        "id": "bellossom",
        "name": "Bellossom",
        "types": [
            "Grass"
        ],
        "hp": 260,
        "atk": 165,
        "def": 195,
        "spa": 185,
        "spd": 205,
        "spe": 105,
        "moves": [
            "double-edge",
            "hyper-beam",
            "razor-leaf",
            "solar-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/bellossom.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/bellossom.gif"
    },
    {
        "id": "marill",
        "name": "Marill",
        "types": [
            "Water",
            "Fairy"
        ],
        "hp": 250,
        "atk": 45,
        "def": 105,
        "spa": 45,
        "spd": 105,
        "spe": 85,
        "moves": [
            "mega-punch",
            "ice-punch",
            "slam",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/marill.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/marill.gif"
    },
    {
        "id": "azumarill",
        "name": "Azumarill",
        "types": [
            "Water",
            "Fairy"
        ],
        "hp": 310,
        "atk": 105,
        "def": 165,
        "spa": 125,
        "spd": 165,
        "spe": 105,
        "moves": [
            "mega-punch",
            "ice-punch",
            "slam",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/azumarill.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/azumarill.gif"
    },
    {
        "id": "sudowoodo",
        "name": "Sudowoodo",
        "types": [
            "Rock"
        ],
        "hp": 250,
        "atk": 205,
        "def": 235,
        "spa": 65,
        "spd": 135,
        "spe": 65,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sudowoodo.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sudowoodo.gif"
    },
    {
        "id": "politoed",
        "name": "Politoed",
        "types": [
            "Water"
        ],
        "hp": 290,
        "atk": 155,
        "def": 155,
        "spa": 185,
        "spd": 205,
        "spe": 145,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/politoed.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/politoed.gif"
    },
    {
        "id": "hoppip",
        "name": "Hoppip",
        "types": [
            "Grass",
            "Flying"
        ],
        "hp": 180,
        "atk": 75,
        "def": 85,
        "spa": 75,
        "spd": 115,
        "spe": 105,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "solar-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/hoppip.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/hoppip.gif"
    },
    {
        "id": "skiploom",
        "name": "Skiploom",
        "types": [
            "Grass",
            "Flying"
        ],
        "hp": 220,
        "atk": 95,
        "def": 105,
        "spa": 95,
        "spd": 135,
        "spe": 165,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "solar-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/skiploom.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/skiploom.gif"
    },
    {
        "id": "jumpluff",
        "name": "Jumpluff",
        "types": [
            "Grass",
            "Flying"
        ],
        "hp": 260,
        "atk": 115,
        "def": 145,
        "spa": 115,
        "spd": 195,
        "spe": 225,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hyper-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/jumpluff.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/jumpluff.gif"
    },
    {
        "id": "aipom",
        "name": "Aipom",
        "types": [
            "Normal"
        ],
        "hp": 220,
        "atk": 145,
        "def": 115,
        "spa": 85,
        "spd": 115,
        "spe": 175,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/aipom.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/aipom.gif"
    },
    {
        "id": "sunkern",
        "name": "Sunkern",
        "types": [
            "Grass"
        ],
        "hp": 170,
        "atk": 65,
        "def": 65,
        "spa": 65,
        "spd": 65,
        "spe": 65,
        "moves": [
            "take-down",
            "double-edge",
            "razor-leaf",
            "solar-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sunkern.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sunkern.gif"
    },
    {
        "id": "sunflora",
        "name": "Sunflora",
        "types": [
            "Grass"
        ],
        "hp": 260,
        "atk": 155,
        "def": 115,
        "spa": 215,
        "spd": 175,
        "spe": 65,
        "moves": [
            "take-down",
            "double-edge",
            "hyper-beam",
            "razor-leaf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sunflora.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sunflora.gif"
    },
    {
        "id": "yanma",
        "name": "Yanma",
        "types": [
            "Bug",
            "Flying"
        ],
        "hp": 240,
        "atk": 135,
        "def": 95,
        "spa": 155,
        "spd": 95,
        "spe": 195,
        "moves": [
            "wing-attack",
            "headbutt",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/yanma.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/yanma.gif"
    },
    {
        "id": "wooper",
        "name": "Wooper",
        "types": [
            "Water",
            "Ground"
        ],
        "hp": 220,
        "atk": 95,
        "def": 95,
        "spa": 55,
        "spd": 55,
        "spe": 35,
        "moves": [
            "ice-punch",
            "slam",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/wooper.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/wooper.gif"
    },
    {
        "id": "quagsire",
        "name": "Quagsire",
        "types": [
            "Water",
            "Ground"
        ],
        "hp": 300,
        "atk": 175,
        "def": 175,
        "spa": 135,
        "spd": 135,
        "spe": 75,
        "moves": [
            "mega-punch",
            "ice-punch",
            "slam",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/quagsire.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/quagsire.gif"
    },
    {
        "id": "espeon",
        "name": "Espeon",
        "types": [
            "Psychic"
        ],
        "hp": 240,
        "atk": 135,
        "def": 125,
        "spa": 265,
        "spd": 195,
        "spe": 225,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/espeon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/espeon.gif"
    },
    {
        "id": "umbreon",
        "name": "Umbreon",
        "types": [
            "Dark"
        ],
        "hp": 300,
        "atk": 135,
        "def": 225,
        "spa": 125,
        "spd": 265,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/umbreon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/umbreon.gif"
    },
    {
        "id": "murkrow",
        "name": "Murkrow",
        "types": [
            "Dark",
            "Flying"
        ],
        "hp": 230,
        "atk": 175,
        "def": 89,
        "spa": 175,
        "spd": 89,
        "spe": 187,
        "moves": [
            "wing-attack",
            "fly",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/murkrow.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/murkrow.gif"
    },
    {
        "id": "slowking",
        "name": "Slowking",
        "types": [
            "Water",
            "Psychic"
        ],
        "hp": 300,
        "atk": 155,
        "def": 165,
        "spa": 205,
        "spd": 225,
        "spe": 65,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/slowking.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/slowking.gif"
    },
    {
        "id": "misdreavus",
        "name": "Misdreavus",
        "types": [
            "Ghost"
        ],
        "hp": 230,
        "atk": 125,
        "def": 125,
        "spa": 175,
        "spd": 175,
        "spe": 175,
        "moves": [
            "headbutt",
            "double-edge",
            "psybeam",
            "hyper-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/misdreavus.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/misdreavus.gif"
    },
    {
        "id": "unown",
        "name": "Unown",
        "types": [
            "Psychic"
        ],
        "hp": 206,
        "atk": 149,
        "def": 101,
        "spa": 149,
        "spd": 101,
        "spe": 101,
        "moves": [
            "hidden-power",
            "struggle",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/unown.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/unown.gif"
    },
    {
        "id": "wobbuffet",
        "name": "Wobbuffet",
        "types": [
            "Psychic"
        ],
        "hp": 490,
        "atk": 71,
        "def": 121,
        "spa": 71,
        "spd": 121,
        "spe": 71,
        "moves": [
            "struggle",
            "struggle",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/wobbuffet.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/wobbuffet.gif"
    },
    {
        "id": "girafarig",
        "name": "Girafarig",
        "types": [
            "Normal",
            "Psychic"
        ],
        "hp": 250,
        "atk": 165,
        "def": 135,
        "spa": 185,
        "spd": 135,
        "spe": 175,
        "moves": [
            "razor-wind",
            "stomp",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/girafarig.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/girafarig.gif"
    },
    {
        "id": "pineco",
        "name": "Pineco",
        "types": [
            "Bug"
        ],
        "hp": 210,
        "atk": 135,
        "def": 185,
        "spa": 75,
        "spd": 75,
        "spe": 35,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/pineco.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/pineco.gif"
    },
    {
        "id": "forretress",
        "name": "Forretress",
        "types": [
            "Bug",
            "Steel"
        ],
        "hp": 260,
        "atk": 185,
        "def": 285,
        "spa": 125,
        "spd": 125,
        "spe": 85,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/forretress.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/forretress.gif"
    },
    {
        "id": "dunsparce",
        "name": "Dunsparce",
        "types": [
            "Normal"
        ],
        "hp": 310,
        "atk": 145,
        "def": 145,
        "spa": 135,
        "spd": 135,
        "spe": 95,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/dunsparce.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/dunsparce.gif"
    },
    {
        "id": "gligar",
        "name": "Gligar",
        "types": [
            "Ground",
            "Flying"
        ],
        "hp": 240,
        "atk": 155,
        "def": 215,
        "spa": 75,
        "spd": 135,
        "spe": 175,
        "moves": [
            "razor-wind",
            "wing-attack",
            "headbutt",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/gligar.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/gligar.gif"
    },
    {
        "id": "steelix",
        "name": "Steelix",
        "types": [
            "Steel",
            "Ground"
        ],
        "hp": 260,
        "atk": 175,
        "def": 405,
        "spa": 115,
        "spd": 135,
        "spe": 65,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/steelix.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/steelix.gif"
    },
    {
        "id": "snubbull",
        "name": "Snubbull",
        "types": [
            "Fairy"
        ],
        "hp": 230,
        "atk": 165,
        "def": 105,
        "spa": 85,
        "spd": 85,
        "spe": 65,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/snubbull.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/snubbull.gif"
    },
    {
        "id": "granbull",
        "name": "Granbull",
        "types": [
            "Fairy"
        ],
        "hp": 290,
        "atk": 245,
        "def": 155,
        "spa": 125,
        "spd": 125,
        "spe": 95,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/granbull.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/granbull.gif"
    },
    {
        "id": "qwilfish",
        "name": "Qwilfish",
        "types": [
            "Water",
            "Poison"
        ],
        "hp": 240,
        "atk": 195,
        "def": 175,
        "spa": 115,
        "spd": 115,
        "spe": 175,
        "moves": [
            "headbutt",
            "take-down",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/qwilfish.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/qwilfish.gif"
    },
    {
        "id": "scizor",
        "name": "Scizor",
        "types": [
            "Bug",
            "Steel"
        ],
        "hp": 250,
        "atk": 265,
        "def": 205,
        "spa": 115,
        "spd": 165,
        "spe": 135,
        "moves": [
            "razor-wind",
            "wing-attack",
            "headbutt",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/scizor.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/scizor.gif"
    },
    {
        "id": "shuckle",
        "name": "Shuckle",
        "types": [
            "Bug",
            "Rock"
        ],
        "hp": 150,
        "atk": 25,
        "def": 465,
        "spa": 25,
        "spd": 465,
        "spe": 15,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "strength"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/shuckle.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/shuckle.gif"
    },
    {
        "id": "heracross",
        "name": "Heracross",
        "types": [
            "Bug",
            "Fighting"
        ],
        "hp": 270,
        "atk": 255,
        "def": 155,
        "spa": 85,
        "spd": 195,
        "spe": 175,
        "moves": [
            "headbutt",
            "horn-attack",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/heracross.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/heracross.gif"
    },
    {
        "id": "sneasel",
        "name": "Sneasel",
        "types": [
            "Dark",
            "Ice"
        ],
        "hp": 220,
        "atk": 195,
        "def": 115,
        "spa": 75,
        "spd": 155,
        "spe": 235,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sneasel.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sneasel.gif"
    },
    {
        "id": "teddiursa",
        "name": "Teddiursa",
        "types": [
            "Normal"
        ],
        "hp": 230,
        "atk": 165,
        "def": 105,
        "spa": 105,
        "spd": 105,
        "spe": 85,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/teddiursa.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/teddiursa.gif"
    },
    {
        "id": "ursaring",
        "name": "Ursaring",
        "types": [
            "Normal"
        ],
        "hp": 290,
        "atk": 265,
        "def": 155,
        "spa": 155,
        "spd": 155,
        "spe": 115,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ursaring.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ursaring.gif"
    },
    {
        "id": "slugma",
        "name": "Slugma",
        "types": [
            "Fire"
        ],
        "hp": 190,
        "atk": 85,
        "def": 85,
        "spa": 145,
        "spd": 85,
        "spe": 45,
        "moves": [
            "body-slam",
            "take-down",
            "double-edge",
            "flamethrower"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/slugma.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/slugma.gif"
    },
    {
        "id": "magcargo",
        "name": "Magcargo",
        "types": [
            "Fire",
            "Rock"
        ],
        "hp": 230,
        "atk": 105,
        "def": 245,
        "spa": 185,
        "spd": 165,
        "spe": 65,
        "moves": [
            "body-slam",
            "take-down",
            "double-edge",
            "flamethrower"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/magcargo.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/magcargo.gif"
    },
    {
        "id": "swinub",
        "name": "Swinub",
        "types": [
            "Ice",
            "Ground"
        ],
        "hp": 210,
        "atk": 105,
        "def": 85,
        "spa": 65,
        "spd": 65,
        "spe": 105,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/swinub.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/swinub.gif"
    },
    {
        "id": "piloswine",
        "name": "Piloswine",
        "types": [
            "Ice",
            "Ground"
        ],
        "hp": 310,
        "atk": 205,
        "def": 165,
        "spa": 125,
        "spd": 125,
        "spe": 105,
        "moves": [
            "headbutt",
            "horn-attack",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/piloswine.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/piloswine.gif"
    },
    {
        "id": "corsola",
        "name": "Corsola",
        "types": [
            "Water",
            "Rock"
        ],
        "hp": 240,
        "atk": 115,
        "def": 195,
        "spa": 135,
        "spd": 195,
        "spe": 75,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/corsola.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/corsola.gif"
    },
    {
        "id": "remoraid",
        "name": "Remoraid",
        "types": [
            "Water"
        ],
        "hp": 180,
        "atk": 135,
        "def": 75,
        "spa": 135,
        "spd": 75,
        "spe": 135,
        "moves": [
            "double-edge",
            "flamethrower",
            "hydro-pump",
            "surf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/remoraid.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/remoraid.gif"
    },
    {
        "id": "octillery",
        "name": "Octillery",
        "types": [
            "Water"
        ],
        "hp": 260,
        "atk": 215,
        "def": 155,
        "spa": 215,
        "spd": 155,
        "spe": 95,
        "moves": [
            "double-edge",
            "flamethrower",
            "hydro-pump",
            "surf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/octillery.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/octillery.gif"
    },
    {
        "id": "delibird",
        "name": "Delibird",
        "types": [
            "Ice",
            "Flying"
        ],
        "hp": 200,
        "atk": 115,
        "def": 95,
        "spa": 135,
        "spd": 95,
        "spe": 155,
        "moves": [
            "mega-punch",
            "ice-punch",
            "fly",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/delibird.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/delibird.gif"
    },
    {
        "id": "mantine",
        "name": "Mantine",
        "types": [
            "Water",
            "Flying"
        ],
        "hp": 280,
        "atk": 85,
        "def": 145,
        "spa": 165,
        "spd": 285,
        "spe": 145,
        "moves": [
            "wing-attack",
            "slam",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/mantine.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/mantine.gif"
    },
    {
        "id": "skarmory",
        "name": "Skarmory",
        "types": [
            "Steel",
            "Flying"
        ],
        "hp": 240,
        "atk": 165,
        "def": 285,
        "spa": 85,
        "spd": 145,
        "spe": 145,
        "moves": [
            "wing-attack",
            "fly",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/skarmory.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/skarmory.gif"
    },
    {
        "id": "houndour",
        "name": "Houndour",
        "types": [
            "Dark",
            "Fire"
        ],
        "hp": 200,
        "atk": 125,
        "def": 65,
        "spa": 165,
        "spd": 105,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/houndour.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/houndour.gif"
    },
    {
        "id": "houndoom",
        "name": "Houndoom",
        "types": [
            "Dark",
            "Fire"
        ],
        "hp": 260,
        "atk": 185,
        "def": 105,
        "spa": 225,
        "spd": 165,
        "spe": 195,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/houndoom.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/houndoom.gif"
    },
    {
        "id": "kingdra",
        "name": "Kingdra",
        "types": [
            "Water",
            "Dragon"
        ],
        "hp": 260,
        "atk": 195,
        "def": 195,
        "spa": 195,
        "spd": 195,
        "spe": 175,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/kingdra.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/kingdra.gif"
    },
    {
        "id": "phanpy",
        "name": "Phanpy",
        "types": [
            "Ground"
        ],
        "hp": 290,
        "atk": 125,
        "def": 125,
        "spa": 85,
        "spd": 85,
        "spe": 85,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/phanpy.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/phanpy.gif"
    },
    {
        "id": "donphan",
        "name": "Donphan",
        "types": [
            "Ground"
        ],
        "hp": 290,
        "atk": 245,
        "def": 245,
        "spa": 125,
        "spd": 125,
        "spe": 105,
        "moves": [
            "slam",
            "headbutt",
            "horn-attack",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/donphan.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/donphan.gif"
    },
    {
        "id": "porygon2",
        "name": "Porygon2",
        "types": [
            "Normal"
        ],
        "hp": 280,
        "atk": 165,
        "def": 185,
        "spa": 215,
        "spd": 195,
        "spe": 125,
        "moves": [
            "take-down",
            "double-edge",
            "ice-beam",
            "blizzard"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/porygon2.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/porygon2.gif"
    },
    {
        "id": "stantler",
        "name": "Stantler",
        "types": [
            "Normal"
        ],
        "hp": 256,
        "atk": 195,
        "def": 129,
        "spa": 175,
        "spd": 135,
        "spe": 175,
        "moves": [
            "stomp",
            "jump-kick",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/stantler.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/stantler.gif"
    },
    {
        "id": "smeargle",
        "name": "Smeargle",
        "types": [
            "Normal"
        ],
        "hp": 220,
        "atk": 45,
        "def": 75,
        "spa": 45,
        "spd": 95,
        "spe": 155,
        "moves": [
            "struggle",
            "struggle",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/smeargle.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/smeargle.gif"
    },
    {
        "id": "tyrogue",
        "name": "Tyrogue",
        "types": [
            "Fighting"
        ],
        "hp": 180,
        "atk": 75,
        "def": 75,
        "spa": 75,
        "spd": 75,
        "spe": 75,
        "moves": [
            "mega-punch",
            "mega-kick",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/tyrogue.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/tyrogue.gif"
    },
    {
        "id": "hitmontop",
        "name": "Hitmontop",
        "types": [
            "Fighting"
        ],
        "hp": 210,
        "atk": 195,
        "def": 195,
        "spa": 75,
        "spd": 225,
        "spe": 145,
        "moves": [
            "mega-punch",
            "mega-kick",
            "rolling-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/hitmontop.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/hitmontop.gif"
    },
    {
        "id": "smoochum",
        "name": "Smoochum",
        "types": [
            "Ice",
            "Psychic"
        ],
        "hp": 200,
        "atk": 65,
        "def": 35,
        "spa": 175,
        "spd": 135,
        "spe": 135,
        "moves": [
            "mega-punch",
            "ice-punch",
            "mega-kick",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/smoochum.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/smoochum.gif"
    },
    {
        "id": "elekid",
        "name": "Elekid",
        "types": [
            "Electric"
        ],
        "hp": 200,
        "atk": 131,
        "def": 79,
        "spa": 135,
        "spd": 115,
        "spe": 195,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/elekid.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/elekid.gif"
    },
    {
        "id": "magby",
        "name": "Magby",
        "types": [
            "Fire"
        ],
        "hp": 200,
        "atk": 155,
        "def": 79,
        "spa": 145,
        "spd": 115,
        "spe": 171,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/magby.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/magby.gif"
    },
    {
        "id": "miltank",
        "name": "Miltank",
        "types": [
            "Normal"
        ],
        "hp": 300,
        "atk": 165,
        "def": 215,
        "spa": 85,
        "spd": 145,
        "spe": 205,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/miltank.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/miltank.gif"
    },
    {
        "id": "blissey",
        "name": "Blissey",
        "types": [
            "Normal"
        ],
        "hp": 620,
        "atk": 25,
        "def": 25,
        "spa": 155,
        "spd": 275,
        "spe": 115,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/blissey.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/blissey.gif"
    },
    {
        "id": "raikou",
        "name": "Raikou",
        "types": [
            "Electric"
        ],
        "hp": 290,
        "atk": 175,
        "def": 155,
        "spa": 235,
        "spd": 205,
        "spe": 235,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/raikou.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/raikou.gif"
    },
    {
        "id": "entei",
        "name": "Entei",
        "types": [
            "Fire"
        ],
        "hp": 340,
        "atk": 235,
        "def": 175,
        "spa": 185,
        "spd": 155,
        "spe": 205,
        "moves": [
            "stomp",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/entei.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/entei.gif"
    },
    {
        "id": "suicune",
        "name": "Suicune",
        "types": [
            "Water"
        ],
        "hp": 310,
        "atk": 155,
        "def": 235,
        "spa": 185,
        "spd": 235,
        "spe": 175,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/suicune.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/suicune.gif"
    },
    {
        "id": "larvitar",
        "name": "Larvitar",
        "types": [
            "Rock",
            "Ground"
        ],
        "hp": 210,
        "atk": 133,
        "def": 105,
        "spa": 95,
        "spd": 105,
        "spe": 87,
        "moves": [
            "stomp",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/larvitar.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/larvitar.gif"
    },
    {
        "id": "pupitar",
        "name": "Pupitar",
        "types": [
            "Rock",
            "Ground"
        ],
        "hp": 250,
        "atk": 173,
        "def": 145,
        "spa": 135,
        "spd": 145,
        "spe": 107,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "thrash"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/pupitar.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/pupitar.gif"
    },
    {
        "id": "tyranitar",
        "name": "Tyranitar",
        "types": [
            "Rock",
            "Dark"
        ],
        "hp": 310,
        "atk": 273,
        "def": 225,
        "spa": 195,
        "spd": 205,
        "spe": 127,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/tyranitar.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/tyranitar.gif"
    },
    {
        "id": "lugia",
        "name": "Lugia",
        "types": [
            "Psychic",
            "Flying"
        ],
        "hp": 322,
        "atk": 185,
        "def": 265,
        "spa": 185,
        "spd": 313,
        "spe": 225,
        "moves": [
            "fly",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/lugia.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/lugia.gif"
    },
    {
        "id": "ho-oh",
        "name": "Ho-oh",
        "types": [
            "Fire",
            "Flying"
        ],
        "hp": 322,
        "atk": 265,
        "def": 185,
        "spa": 225,
        "spd": 313,
        "spe": 185,
        "moves": [
            "fly",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ho-oh.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ho-oh.gif"
    },
    {
        "id": "celebi",
        "name": "Celebi",
        "types": [
            "Psychic",
            "Grass"
        ],
        "hp": 310,
        "atk": 205,
        "def": 205,
        "spa": 205,
        "spd": 205,
        "spe": 205,
        "moves": [
            "double-edge",
            "hyper-beam",
            "solar-beam",
            "psychic"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/celebi.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/celebi.gif"
    },
    {
        "id": "treecko",
        "name": "Treecko",
        "types": [
            "Grass"
        ],
        "hp": 190,
        "atk": 95,
        "def": 75,
        "spa": 135,
        "spd": 115,
        "spe": 145,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "razor-wind",
            "slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/treecko.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/treecko.gif"
    },
    {
        "id": "grovyle",
        "name": "Grovyle",
        "types": [
            "Grass"
        ],
        "hp": 210,
        "atk": 135,
        "def": 95,
        "spa": 175,
        "spd": 135,
        "spe": 195,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "slam",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/grovyle.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/grovyle.gif"
    },
    {
        "id": "sceptile",
        "name": "Sceptile",
        "types": [
            "Grass"
        ],
        "hp": 250,
        "atk": 175,
        "def": 135,
        "spa": 215,
        "spd": 175,
        "spe": 245,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "slam",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sceptile.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sceptile.gif"
    },
    {
        "id": "torchic",
        "name": "Torchic",
        "types": [
            "Fire"
        ],
        "hp": 200,
        "atk": 125,
        "def": 85,
        "spa": 145,
        "spd": 105,
        "spe": 95,
        "moves": [
            "mega-punch",
            "mega-kick",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/torchic.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/torchic.gif"
    },
    {
        "id": "combusken",
        "name": "Combusken",
        "types": [
            "Fire",
            "Fighting"
        ],
        "hp": 230,
        "atk": 175,
        "def": 125,
        "spa": 175,
        "spd": 125,
        "spe": 115,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/combusken.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/combusken.gif"
    },
    {
        "id": "blaziken",
        "name": "Blaziken",
        "types": [
            "Fire",
            "Fighting"
        ],
        "hp": 270,
        "atk": 245,
        "def": 145,
        "spa": 225,
        "spd": 145,
        "spe": 165,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/blaziken.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/blaziken.gif"
    },
    {
        "id": "mudkip",
        "name": "Mudkip",
        "types": [
            "Water"
        ],
        "hp": 210,
        "atk": 145,
        "def": 105,
        "spa": 105,
        "spd": 105,
        "spe": 85,
        "moves": [
            "stomp",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/mudkip.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/mudkip.gif"
    },
    {
        "id": "marshtomp",
        "name": "Marshtomp",
        "types": [
            "Water",
            "Ground"
        ],
        "hp": 250,
        "atk": 175,
        "def": 145,
        "spa": 125,
        "spd": 145,
        "spe": 105,
        "moves": [
            "mega-punch",
            "ice-punch",
            "stomp",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/marshtomp.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/marshtomp.gif"
    },
    {
        "id": "swampert",
        "name": "Swampert",
        "types": [
            "Water",
            "Ground"
        ],
        "hp": 310,
        "atk": 225,
        "def": 185,
        "spa": 175,
        "spd": 185,
        "spe": 125,
        "moves": [
            "mega-punch",
            "ice-punch",
            "stomp",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/swampert.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/swampert.gif"
    },
    {
        "id": "poochyena",
        "name": "Poochyena",
        "types": [
            "Dark"
        ],
        "hp": 180,
        "atk": 115,
        "def": 75,
        "spa": 65,
        "spd": 65,
        "spe": 75,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/poochyena.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/poochyena.gif"
    },
    {
        "id": "mightyena",
        "name": "Mightyena",
        "types": [
            "Dark"
        ],
        "hp": 250,
        "atk": 185,
        "def": 145,
        "spa": 125,
        "spd": 125,
        "spe": 145,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/mightyena.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/mightyena.gif"
    },
    {
        "id": "zigzagoon",
        "name": "Zigzagoon",
        "types": [
            "Normal"
        ],
        "hp": 186,
        "atk": 65,
        "def": 87,
        "spa": 65,
        "spd": 87,
        "spe": 125,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/zigzagoon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/zigzagoon.gif"
    },
    {
        "id": "linoone",
        "name": "Linoone",
        "types": [
            "Normal"
        ],
        "hp": 266,
        "atk": 145,
        "def": 127,
        "spa": 105,
        "spd": 127,
        "spe": 205,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/linoone.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/linoone.gif"
    },
    {
        "id": "wurmple",
        "name": "Wurmple",
        "types": [
            "Bug"
        ],
        "hp": 200,
        "atk": 95,
        "def": 75,
        "spa": 45,
        "spd": 65,
        "spe": 45,
        "moves": [
            "bug-bite",
            "electroweb",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/wurmple.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/wurmple.gif"
    },
    {
        "id": "silcoon",
        "name": "Silcoon",
        "types": [
            "Bug"
        ],
        "hp": 210,
        "atk": 75,
        "def": 115,
        "spa": 55,
        "spd": 55,
        "spe": 35,
        "moves": [
            "bug-bite",
            "electroweb",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/silcoon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/silcoon.gif"
    },
    {
        "id": "beautifly",
        "name": "Beautifly",
        "types": [
            "Bug",
            "Flying"
        ],
        "hp": 230,
        "atk": 145,
        "def": 105,
        "spa": 205,
        "spd": 105,
        "spe": 135,
        "moves": [
            "double-edge",
            "hyper-beam",
            "solar-beam",
            "psychic"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/beautifly.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/beautifly.gif"
    },
    {
        "id": "cascoon",
        "name": "Cascoon",
        "types": [
            "Bug"
        ],
        "hp": 210,
        "atk": 75,
        "def": 115,
        "spa": 55,
        "spd": 55,
        "spe": 35,
        "moves": [
            "bug-bite",
            "electroweb",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/cascoon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/cascoon.gif"
    },
    {
        "id": "dustox",
        "name": "Dustox",
        "types": [
            "Bug",
            "Poison"
        ],
        "hp": 230,
        "atk": 105,
        "def": 145,
        "spa": 105,
        "spd": 185,
        "spe": 135,
        "moves": [
            "double-edge",
            "psybeam",
            "hyper-beam",
            "solar-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/dustox.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/dustox.gif"
    },
    {
        "id": "lotad",
        "name": "Lotad",
        "types": [
            "Water",
            "Grass"
        ],
        "hp": 190,
        "atk": 65,
        "def": 65,
        "spa": 85,
        "spd": 105,
        "spe": 65,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/lotad.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/lotad.gif"
    },
    {
        "id": "lombre",
        "name": "Lombre",
        "types": [
            "Water",
            "Grass"
        ],
        "hp": 230,
        "atk": 105,
        "def": 105,
        "spa": 125,
        "spd": 145,
        "spe": 105,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/lombre.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/lombre.gif"
    },
    {
        "id": "ludicolo",
        "name": "Ludicolo",
        "types": [
            "Water",
            "Grass"
        ],
        "hp": 270,
        "atk": 145,
        "def": 145,
        "spa": 185,
        "spd": 205,
        "spe": 145,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ludicolo.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ludicolo.gif"
    },
    {
        "id": "seedot",
        "name": "Seedot",
        "types": [
            "Grass"
        ],
        "hp": 190,
        "atk": 85,
        "def": 105,
        "spa": 65,
        "spd": 65,
        "spe": 65,
        "moves": [
            "razor-wind",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/seedot.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/seedot.gif"
    },
    {
        "id": "nuzleaf",
        "name": "Nuzleaf",
        "types": [
            "Grass",
            "Dark"
        ],
        "hp": 250,
        "atk": 145,
        "def": 85,
        "spa": 125,
        "spd": 85,
        "spe": 125,
        "moves": [
            "razor-wind",
            "mega-kick",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/nuzleaf.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/nuzleaf.gif"
    },
    {
        "id": "shiftry",
        "name": "Shiftry",
        "types": [
            "Grass",
            "Dark"
        ],
        "hp": 290,
        "atk": 205,
        "def": 125,
        "spa": 185,
        "spd": 125,
        "spe": 165,
        "moves": [
            "mega-kick",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/shiftry.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/shiftry.gif"
    },
    {
        "id": "taillow",
        "name": "Taillow",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 190,
        "atk": 115,
        "def": 65,
        "spa": 65,
        "spd": 65,
        "spe": 175,
        "moves": [
            "wing-attack",
            "fly",
            "double-edge",
            "quick-attack"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/taillow.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/taillow.gif"
    },
    {
        "id": "swellow",
        "name": "Swellow",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 230,
        "atk": 175,
        "def": 125,
        "spa": 155,
        "spd": 105,
        "spe": 255,
        "moves": [
            "wing-attack",
            "fly",
            "double-edge",
            "hyper-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/swellow.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/swellow.gif"
    },
    {
        "id": "wingull",
        "name": "Wingull",
        "types": [
            "Water",
            "Flying"
        ],
        "hp": 190,
        "atk": 65,
        "def": 65,
        "spa": 115,
        "spd": 65,
        "spe": 175,
        "moves": [
            "wing-attack",
            "fly",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/wingull.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/wingull.gif"
    },
    {
        "id": "pelipper",
        "name": "Pelipper",
        "types": [
            "Water",
            "Flying"
        ],
        "hp": 230,
        "atk": 105,
        "def": 205,
        "spa": 195,
        "spd": 145,
        "spe": 135,
        "moves": [
            "wing-attack",
            "fly",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/pelipper.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/pelipper.gif"
    },
    {
        "id": "ralts",
        "name": "Ralts",
        "types": [
            "Psychic",
            "Fairy"
        ],
        "hp": 166,
        "atk": 55,
        "def": 55,
        "spa": 95,
        "spd": 75,
        "spe": 85,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ralts.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ralts.gif"
    },
    {
        "id": "kirlia",
        "name": "Kirlia",
        "types": [
            "Psychic",
            "Fairy"
        ],
        "hp": 186,
        "atk": 75,
        "def": 75,
        "spa": 135,
        "spd": 115,
        "spe": 105,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/kirlia.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/kirlia.gif"
    },
    {
        "id": "gardevoir",
        "name": "Gardevoir",
        "types": [
            "Psychic",
            "Fairy"
        ],
        "hp": 246,
        "atk": 135,
        "def": 135,
        "spa": 255,
        "spd": 235,
        "spe": 165,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/gardevoir.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/gardevoir.gif"
    },
    {
        "id": "surskit",
        "name": "Surskit",
        "types": [
            "Bug",
            "Water"
        ],
        "hp": 190,
        "atk": 65,
        "def": 69,
        "spa": 105,
        "spd": 109,
        "spe": 135,
        "moves": [
            "take-down",
            "double-edge",
            "hydro-pump",
            "surf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/surskit.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/surskit.gif"
    },
    {
        "id": "masquerain",
        "name": "Masquerain",
        "types": [
            "Bug",
            "Flying"
        ],
        "hp": 250,
        "atk": 125,
        "def": 129,
        "spa": 205,
        "spd": 169,
        "spe": 165,
        "moves": [
            "take-down",
            "double-edge",
            "hydro-pump",
            "surf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/masquerain.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/masquerain.gif"
    },
    {
        "id": "shroomish",
        "name": "Shroomish",
        "types": [
            "Grass"
        ],
        "hp": 230,
        "atk": 85,
        "def": 125,
        "spa": 85,
        "spd": 125,
        "spe": 75,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/shroomish.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/shroomish.gif"
    },
    {
        "id": "breloom",
        "name": "Breloom",
        "types": [
            "Grass",
            "Fighting"
        ],
        "hp": 230,
        "atk": 265,
        "def": 165,
        "spa": 125,
        "spd": 125,
        "spe": 145,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/breloom.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/breloom.gif"
    },
    {
        "id": "slakoth",
        "name": "Slakoth",
        "types": [
            "Normal"
        ],
        "hp": 230,
        "atk": 125,
        "def": 125,
        "spa": 75,
        "spd": 75,
        "spe": 65,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/slakoth.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/slakoth.gif"
    },
    {
        "id": "vigoroth",
        "name": "Vigoroth",
        "types": [
            "Normal"
        ],
        "hp": 270,
        "atk": 165,
        "def": 165,
        "spa": 115,
        "spd": 115,
        "spe": 185,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/vigoroth.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/vigoroth.gif"
    },
    {
        "id": "slaking",
        "name": "Slaking",
        "types": [
            "Normal"
        ],
        "hp": 410,
        "atk": 325,
        "def": 205,
        "spa": 195,
        "spd": 135,
        "spe": 205,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/slaking.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/slaking.gif"
    },
    {
        "id": "nincada",
        "name": "Nincada",
        "types": [
            "Bug",
            "Ground"
        ],
        "hp": 172,
        "atk": 95,
        "def": 185,
        "spa": 65,
        "spd": 65,
        "spe": 85,
        "moves": [
            "double-edge",
            "solar-beam",
            "dig",
            "leech-life"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/nincada.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/nincada.gif"
    },
    {
        "id": "ninjask",
        "name": "Ninjask",
        "types": [
            "Bug",
            "Flying"
        ],
        "hp": 232,
        "atk": 185,
        "def": 95,
        "spa": 105,
        "spd": 105,
        "spe": 325,
        "moves": [
            "double-edge",
            "hyper-beam",
            "solar-beam",
            "dig"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/ninjask.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/ninjask.gif"
    },
    {
        "id": "shedinja",
        "name": "Shedinja",
        "types": [
            "Bug",
            "Ghost"
        ],
        "hp": 112,
        "atk": 185,
        "def": 95,
        "spa": 65,
        "spd": 65,
        "spe": 85,
        "moves": [
            "double-edge",
            "hyper-beam",
            "solar-beam",
            "dig"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/shedinja.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/shedinja.gif"
    },
    {
        "id": "whismur",
        "name": "Whismur",
        "types": [
            "Normal"
        ],
        "hp": 238,
        "atk": 107,
        "def": 51,
        "spa": 107,
        "spd": 51,
        "spe": 61,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/whismur.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/whismur.gif"
    },
    {
        "id": "loudred",
        "name": "Loudred",
        "types": [
            "Normal"
        ],
        "hp": 278,
        "atk": 147,
        "def": 91,
        "spa": 147,
        "spd": 91,
        "spe": 101,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/loudred.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/loudred.gif"
    },
    {
        "id": "exploud",
        "name": "Exploud",
        "types": [
            "Normal"
        ],
        "hp": 318,
        "atk": 187,
        "def": 131,
        "spa": 187,
        "spd": 151,
        "spe": 141,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/exploud.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/exploud.gif"
    },
    {
        "id": "makuhita",
        "name": "Makuhita",
        "types": [
            "Fighting"
        ],
        "hp": 254,
        "atk": 125,
        "def": 65,
        "spa": 45,
        "spd": 65,
        "spe": 55,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/makuhita.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/makuhita.gif"
    },
    {
        "id": "hariyama",
        "name": "Hariyama",
        "types": [
            "Fighting"
        ],
        "hp": 398,
        "atk": 245,
        "def": 125,
        "spa": 85,
        "spd": 125,
        "spe": 105,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/hariyama.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/hariyama.gif"
    },
    {
        "id": "azurill",
        "name": "Azurill",
        "types": [
            "Normal",
            "Fairy"
        ],
        "hp": 210,
        "atk": 45,
        "def": 85,
        "spa": 45,
        "spd": 85,
        "spe": 45,
        "moves": [
            "slam",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/azurill.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/azurill.gif"
    },
    {
        "id": "nosepass",
        "name": "Nosepass",
        "types": [
            "Rock"
        ],
        "hp": 170,
        "atk": 95,
        "def": 275,
        "spa": 95,
        "spd": 185,
        "spe": 65,
        "moves": [
            "fire-punch",
            "ice-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/nosepass.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/nosepass.gif"
    },
    {
        "id": "skitty",
        "name": "Skitty",
        "types": [
            "Normal"
        ],
        "hp": 210,
        "atk": 95,
        "def": 95,
        "spa": 75,
        "spd": 75,
        "spe": 105,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "ice-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/skitty.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/skitty.gif"
    },
    {
        "id": "delcatty",
        "name": "Delcatty",
        "types": [
            "Normal"
        ],
        "hp": 250,
        "atk": 135,
        "def": 135,
        "spa": 115,
        "spd": 115,
        "spe": 185,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "ice-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/delcatty.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/delcatty.gif"
    },
    {
        "id": "sableye",
        "name": "Sableye",
        "types": [
            "Dark",
            "Ghost"
        ],
        "hp": 210,
        "atk": 155,
        "def": 155,
        "spa": 135,
        "spd": 135,
        "spe": 105,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sableye.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sableye.gif"
    },
    {
        "id": "mawile",
        "name": "Mawile",
        "types": [
            "Steel",
            "Fairy"
        ],
        "hp": 210,
        "atk": 175,
        "def": 175,
        "spa": 115,
        "spd": 115,
        "spe": 105,
        "moves": [
            "mega-punch",
            "ice-punch",
            "thunder-punch",
            "vice-grip"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/mawile.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/mawile.gif"
    },
    {
        "id": "aron",
        "name": "Aron",
        "types": [
            "Steel",
            "Rock"
        ],
        "hp": 210,
        "atk": 145,
        "def": 205,
        "spa": 85,
        "spd": 85,
        "spe": 65,
        "moves": [
            "stomp",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/aron.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/aron.gif"
    },
    {
        "id": "lairon",
        "name": "Lairon",
        "types": [
            "Steel",
            "Rock"
        ],
        "hp": 230,
        "atk": 185,
        "def": 285,
        "spa": 105,
        "spd": 105,
        "spe": 85,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/lairon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/lairon.gif"
    },
    {
        "id": "aggron",
        "name": "Aggron",
        "types": [
            "Steel",
            "Rock"
        ],
        "hp": 250,
        "atk": 225,
        "def": 365,
        "spa": 125,
        "spd": 125,
        "spe": 105,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/aggron.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/aggron.gif"
    },
    {
        "id": "meditite",
        "name": "Meditite",
        "types": [
            "Fighting",
            "Psychic"
        ],
        "hp": 170,
        "atk": 85,
        "def": 115,
        "spa": 85,
        "spd": 115,
        "spe": 125,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/meditite.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/meditite.gif"
    },
    {
        "id": "medicham",
        "name": "Medicham",
        "types": [
            "Fighting",
            "Psychic"
        ],
        "hp": 230,
        "atk": 125,
        "def": 155,
        "spa": 125,
        "spd": 155,
        "spe": 165,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/medicham.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/medicham.gif"
    },
    {
        "id": "electrike",
        "name": "Electrike",
        "types": [
            "Electric"
        ],
        "hp": 190,
        "atk": 95,
        "def": 85,
        "spa": 135,
        "spd": 85,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "bite"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/electrike.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/electrike.gif"
    },
    {
        "id": "manectric",
        "name": "Manectric",
        "types": [
            "Electric"
        ],
        "hp": 250,
        "atk": 155,
        "def": 125,
        "spa": 215,
        "spd": 125,
        "spe": 215,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "bite"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/manectric.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/manectric.gif"
    },
    {
        "id": "plusle",
        "name": "Plusle",
        "types": [
            "Electric"
        ],
        "hp": 230,
        "atk": 105,
        "def": 85,
        "spa": 175,
        "spd": 155,
        "spe": 195,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/plusle.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/plusle.gif"
    },
    {
        "id": "minun",
        "name": "Minun",
        "types": [
            "Electric"
        ],
        "hp": 230,
        "atk": 85,
        "def": 105,
        "spa": 155,
        "spd": 175,
        "spe": 195,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/minun.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/minun.gif"
    },
    {
        "id": "volbeat",
        "name": "Volbeat",
        "types": [
            "Bug"
        ],
        "hp": 240,
        "atk": 151,
        "def": 155,
        "spa": 99,
        "spd": 175,
        "spe": 175,
        "moves": [
            "mega-punch",
            "ice-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/volbeat.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/volbeat.gif"
    },
    {
        "id": "illumise",
        "name": "Illumise",
        "types": [
            "Bug"
        ],
        "hp": 240,
        "atk": 99,
        "def": 155,
        "spa": 151,
        "spd": 175,
        "spe": 175,
        "moves": [
            "mega-punch",
            "ice-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/illumise.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/illumise.gif"
    },
    {
        "id": "roselia",
        "name": "Roselia",
        "types": [
            "Grass",
            "Poison"
        ],
        "hp": 210,
        "atk": 125,
        "def": 95,
        "spa": 205,
        "spd": 165,
        "spe": 135,
        "moves": [
            "body-slam",
            "double-edge",
            "razor-leaf",
            "solar-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/roselia.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/roselia.gif"
    },
    {
        "id": "gulpin",
        "name": "Gulpin",
        "types": [
            "Poison"
        ],
        "hp": 250,
        "atk": 91,
        "def": 111,
        "spa": 91,
        "spd": 111,
        "spe": 85,
        "moves": [
            "fire-punch",
            "ice-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/gulpin.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/gulpin.gif"
    },
    {
        "id": "swalot",
        "name": "Swalot",
        "types": [
            "Poison"
        ],
        "hp": 310,
        "atk": 151,
        "def": 171,
        "spa": 151,
        "spd": 171,
        "spe": 115,
        "moves": [
            "fire-punch",
            "ice-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/swalot.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/swalot.gif"
    },
    {
        "id": "carvanha",
        "name": "Carvanha",
        "types": [
            "Water",
            "Dark"
        ],
        "hp": 200,
        "atk": 185,
        "def": 45,
        "spa": 135,
        "spd": 45,
        "spe": 135,
        "moves": [
            "take-down",
            "thrash",
            "double-edge",
            "bite"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/carvanha.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/carvanha.gif"
    },
    {
        "id": "sharpedo",
        "name": "Sharpedo",
        "types": [
            "Water",
            "Dark"
        ],
        "hp": 250,
        "atk": 245,
        "def": 85,
        "spa": 195,
        "spd": 85,
        "spe": 195,
        "moves": [
            "take-down",
            "double-edge",
            "bite",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sharpedo.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sharpedo.gif"
    },
    {
        "id": "wailmer",
        "name": "Wailmer",
        "types": [
            "Water"
        ],
        "hp": 370,
        "atk": 145,
        "def": 75,
        "spa": 145,
        "spd": 75,
        "spe": 125,
        "moves": [
            "headbutt",
            "body-slam",
            "thrash",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/wailmer.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/wailmer.gif"
    },
    {
        "id": "wailord",
        "name": "Wailord",
        "types": [
            "Water"
        ],
        "hp": 450,
        "atk": 185,
        "def": 95,
        "spa": 185,
        "spd": 95,
        "spe": 125,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/wailord.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/wailord.gif"
    },
    {
        "id": "numel",
        "name": "Numel",
        "types": [
            "Fire",
            "Ground"
        ],
        "hp": 230,
        "atk": 125,
        "def": 85,
        "spa": 135,
        "spd": 95,
        "spe": 75,
        "moves": [
            "stomp",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/numel.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/numel.gif"
    },
    {
        "id": "camerupt",
        "name": "Camerupt",
        "types": [
            "Fire",
            "Ground"
        ],
        "hp": 250,
        "atk": 205,
        "def": 145,
        "spa": 215,
        "spd": 155,
        "spe": 85,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/camerupt.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/camerupt.gif"
    },
    {
        "id": "torkoal",
        "name": "Torkoal",
        "types": [
            "Fire"
        ],
        "hp": 250,
        "atk": 175,
        "def": 285,
        "spa": 175,
        "spd": 145,
        "spe": 45,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/torkoal.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/torkoal.gif"
    },
    {
        "id": "spoink",
        "name": "Spoink",
        "types": [
            "Psychic"
        ],
        "hp": 230,
        "atk": 55,
        "def": 75,
        "spa": 145,
        "spd": 165,
        "spe": 125,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/spoink.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/spoink.gif"
    },
    {
        "id": "grumpig",
        "name": "Grumpig",
        "types": [
            "Psychic"
        ],
        "hp": 270,
        "atk": 95,
        "def": 135,
        "spa": 185,
        "spd": 225,
        "spe": 165,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/grumpig.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/grumpig.gif"
    },
    {
        "id": "spinda",
        "name": "Spinda",
        "types": [
            "Normal"
        ],
        "hp": 230,
        "atk": 125,
        "def": 125,
        "spa": 125,
        "spd": 125,
        "spe": 125,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/spinda.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/spinda.gif"
    },
    {
        "id": "trapinch",
        "name": "Trapinch",
        "types": [
            "Ground"
        ],
        "hp": 200,
        "atk": 205,
        "def": 95,
        "spa": 95,
        "spd": 95,
        "spe": 25,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/trapinch.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/trapinch.gif"
    },
    {
        "id": "vibrava",
        "name": "Vibrava",
        "types": [
            "Ground",
            "Dragon"
        ],
        "hp": 210,
        "atk": 145,
        "def": 105,
        "spa": 105,
        "spd": 105,
        "spe": 145,
        "moves": [
            "fly",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/vibrava.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/vibrava.gif"
    },
    {
        "id": "flygon",
        "name": "Flygon",
        "types": [
            "Ground",
            "Dragon"
        ],
        "hp": 270,
        "atk": 205,
        "def": 165,
        "spa": 165,
        "spd": 165,
        "spe": 205,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "fly"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/flygon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/flygon.gif"
    },
    {
        "id": "cacnea",
        "name": "Cacnea",
        "types": [
            "Grass"
        ],
        "hp": 210,
        "atk": 175,
        "def": 85,
        "spa": 175,
        "spd": 85,
        "spe": 75,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/cacnea.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/cacnea.gif"
    },
    {
        "id": "cacturne",
        "name": "Cacturne",
        "types": [
            "Grass",
            "Dark"
        ],
        "hp": 250,
        "atk": 235,
        "def": 125,
        "spa": 235,
        "spd": 125,
        "spe": 115,
        "moves": [
            "mega-punch",
            "thunder-punch",
            "mega-kick",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/cacturne.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/cacturne.gif"
    },
    {
        "id": "swablu",
        "name": "Swablu",
        "types": [
            "Normal",
            "Flying"
        ],
        "hp": 200,
        "atk": 85,
        "def": 125,
        "spa": 85,
        "spd": 155,
        "spe": 105,
        "moves": [
            "fly",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/swablu.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/swablu.gif"
    },
    {
        "id": "altaria",
        "name": "Altaria",
        "types": [
            "Dragon",
            "Flying"
        ],
        "hp": 260,
        "atk": 145,
        "def": 185,
        "spa": 145,
        "spd": 215,
        "spe": 165,
        "moves": [
            "fly",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/altaria.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/altaria.gif"
    },
    {
        "id": "zangoose",
        "name": "Zangoose",
        "types": [
            "Normal"
        ],
        "hp": 256,
        "atk": 235,
        "def": 125,
        "spa": 125,
        "spd": 125,
        "spe": 185,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/zangoose.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/zangoose.gif"
    },
    {
        "id": "seviper",
        "name": "Seviper",
        "types": [
            "Poison"
        ],
        "hp": 256,
        "atk": 205,
        "def": 125,
        "spa": 205,
        "spd": 125,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/seviper.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/seviper.gif"
    },
    {
        "id": "lunatone",
        "name": "Lunatone",
        "types": [
            "Rock",
            "Psychic"
        ],
        "hp": 290,
        "atk": 115,
        "def": 135,
        "spa": 195,
        "spd": 175,
        "spe": 145,
        "moves": [
            "body-slam",
            "double-edge",
            "ice-beam",
            "blizzard"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/lunatone.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/lunatone.gif"
    },
    {
        "id": "solrock",
        "name": "Solrock",
        "types": [
            "Rock",
            "Psychic"
        ],
        "hp": 290,
        "atk": 195,
        "def": 175,
        "spa": 115,
        "spd": 135,
        "spe": 145,
        "moves": [
            "body-slam",
            "double-edge",
            "flamethrower",
            "hyper-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/solrock.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/solrock.gif"
    },
    {
        "id": "barboach",
        "name": "Barboach",
        "types": [
            "Water",
            "Ground"
        ],
        "hp": 210,
        "atk": 101,
        "def": 91,
        "spa": 97,
        "spd": 87,
        "spe": 125,
        "moves": [
            "headbutt",
            "take-down",
            "thrash",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/barboach.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/barboach.gif"
    },
    {
        "id": "whiscash",
        "name": "Whiscash",
        "types": [
            "Water",
            "Ground"
        ],
        "hp": 330,
        "atk": 161,
        "def": 151,
        "spa": 157,
        "spd": 147,
        "spe": 125,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "thrash"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/whiscash.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/whiscash.gif"
    },
    {
        "id": "corphish",
        "name": "Corphish",
        "types": [
            "Water"
        ],
        "hp": 196,
        "atk": 165,
        "def": 135,
        "spa": 105,
        "spd": 75,
        "spe": 75,
        "moves": [
            "vice-grip",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/corphish.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/corphish.gif"
    },
    {
        "id": "crawdaunt",
        "name": "Crawdaunt",
        "types": [
            "Water",
            "Dark"
        ],
        "hp": 236,
        "atk": 245,
        "def": 175,
        "spa": 185,
        "spd": 115,
        "spe": 115,
        "moves": [
            "vice-grip",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/crawdaunt.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/crawdaunt.gif"
    },
    {
        "id": "baltoy",
        "name": "Baltoy",
        "types": [
            "Ground",
            "Psychic"
        ],
        "hp": 190,
        "atk": 85,
        "def": 115,
        "spa": 85,
        "spd": 145,
        "spe": 115,
        "moves": [
            "headbutt",
            "double-edge",
            "ice-beam",
            "psybeam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/baltoy.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/baltoy.gif"
    },
    {
        "id": "claydol",
        "name": "Claydol",
        "types": [
            "Ground",
            "Psychic"
        ],
        "hp": 230,
        "atk": 145,
        "def": 215,
        "spa": 145,
        "spd": 245,
        "spe": 155,
        "moves": [
            "headbutt",
            "double-edge",
            "ice-beam",
            "psybeam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/claydol.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/claydol.gif"
    },
    {
        "id": "lileep",
        "name": "Lileep",
        "types": [
            "Rock",
            "Grass"
        ],
        "hp": 242,
        "atk": 87,
        "def": 159,
        "spa": 127,
        "spd": 179,
        "spe": 51,
        "moves": [
            "body-slam",
            "double-edge",
            "solar-beam",
            "rock-slide"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/lileep.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/lileep.gif"
    },
    {
        "id": "cradily",
        "name": "Cradily",
        "types": [
            "Rock",
            "Grass"
        ],
        "hp": 282,
        "atk": 167,
        "def": 199,
        "spa": 167,
        "spd": 219,
        "spe": 91,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "hyper-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/cradily.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/cradily.gif"
    },
    {
        "id": "anorith",
        "name": "Anorith",
        "types": [
            "Rock",
            "Bug"
        ],
        "hp": 200,
        "atk": 195,
        "def": 105,
        "spa": 85,
        "spd": 105,
        "spe": 155,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "dig"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/anorith.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/anorith.gif"
    },
    {
        "id": "armaldo",
        "name": "Armaldo",
        "types": [
            "Rock",
            "Bug"
        ],
        "hp": 260,
        "atk": 255,
        "def": 205,
        "spa": 145,
        "spd": 165,
        "spe": 95,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "hyper-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/armaldo.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/armaldo.gif"
    },
    {
        "id": "feebas",
        "name": "Feebas",
        "types": [
            "Water"
        ],
        "hp": 150,
        "atk": 35,
        "def": 45,
        "spa": 25,
        "spd": 115,
        "spe": 165,
        "moves": [
            "double-edge",
            "surf",
            "ice-beam",
            "blizzard"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/feebas.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/feebas.gif"
    },
    {
        "id": "milotic",
        "name": "Milotic",
        "types": [
            "Water"
        ],
        "hp": 300,
        "atk": 125,
        "def": 163,
        "spa": 205,
        "spd": 255,
        "spe": 167,
        "moves": [
            "body-slam",
            "take-down",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/milotic.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/milotic.gif"
    },
    {
        "id": "castform",
        "name": "Castform",
        "types": [
            "Normal"
        ],
        "hp": 250,
        "atk": 145,
        "def": 145,
        "spa": 145,
        "spd": 145,
        "spe": 145,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "flamethrower"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/castform.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/castform.gif"
    },
    {
        "id": "kecleon",
        "name": "Kecleon",
        "types": [
            "Normal"
        ],
        "hp": 230,
        "atk": 185,
        "def": 145,
        "spa": 125,
        "spd": 245,
        "spe": 85,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/kecleon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/kecleon.gif"
    },
    {
        "id": "shuppet",
        "name": "Shuppet",
        "types": [
            "Ghost"
        ],
        "hp": 198,
        "atk": 155,
        "def": 75,
        "spa": 131,
        "spd": 71,
        "spe": 95,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "psybeam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/shuppet.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/shuppet.gif"
    },
    {
        "id": "banette",
        "name": "Banette",
        "types": [
            "Ghost"
        ],
        "hp": 238,
        "atk": 235,
        "def": 135,
        "spa": 171,
        "spd": 131,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "psybeam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/banette.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/banette.gif"
    },
    {
        "id": "duskull",
        "name": "Duskull",
        "types": [
            "Ghost"
        ],
        "hp": 150,
        "atk": 85,
        "def": 185,
        "spa": 65,
        "spd": 185,
        "spe": 55,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "ice-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/duskull.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/duskull.gif"
    },
    {
        "id": "dusclops",
        "name": "Dusclops",
        "types": [
            "Ghost"
        ],
        "hp": 190,
        "atk": 145,
        "def": 265,
        "spa": 125,
        "spd": 265,
        "spe": 55,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/dusclops.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/dusclops.gif"
    },
    {
        "id": "tropius",
        "name": "Tropius",
        "types": [
            "Grass",
            "Flying"
        ],
        "hp": 308,
        "atk": 141,
        "def": 171,
        "spa": 149,
        "spd": 179,
        "spe": 107,
        "moves": [
            "razor-wind",
            "fly",
            "slam",
            "stomp"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/tropius.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/tropius.gif"
    },
    {
        "id": "chimecho",
        "name": "Chimecho",
        "types": [
            "Psychic"
        ],
        "hp": 260,
        "atk": 105,
        "def": 165,
        "spa": 195,
        "spd": 185,
        "spe": 135,
        "moves": [
            "take-down",
            "double-edge",
            "psybeam",
            "psychic"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/chimecho.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/chimecho.gif"
    },
    {
        "id": "absol",
        "name": "Absol",
        "types": [
            "Dark"
        ],
        "hp": 240,
        "atk": 265,
        "def": 125,
        "spa": 155,
        "spd": 125,
        "spe": 155,
        "moves": [
            "razor-wind",
            "headbutt",
            "body-slam",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/absol.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/absol.gif"
    },
    {
        "id": "wynaut",
        "name": "Wynaut",
        "types": [
            "Psychic"
        ],
        "hp": 300,
        "atk": 51,
        "def": 101,
        "spa": 51,
        "spd": 101,
        "spe": 51,
        "moves": [
            "struggle",
            "struggle",
            "struggle",
            "struggle"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/wynaut.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/wynaut.gif"
    },
    {
        "id": "snorunt",
        "name": "Snorunt",
        "types": [
            "Ice"
        ],
        "hp": 210,
        "atk": 105,
        "def": 105,
        "spa": 105,
        "spd": 105,
        "spe": 105,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/snorunt.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/snorunt.gif"
    },
    {
        "id": "glalie",
        "name": "Glalie",
        "types": [
            "Ice"
        ],
        "hp": 270,
        "atk": 165,
        "def": 165,
        "spa": 165,
        "spd": 165,
        "spe": 165,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/glalie.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/glalie.gif"
    },
    {
        "id": "spheal",
        "name": "Spheal",
        "types": [
            "Ice",
            "Water"
        ],
        "hp": 250,
        "atk": 85,
        "def": 105,
        "spa": 115,
        "spd": 105,
        "spe": 55,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "surf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/spheal.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/spheal.gif"
    },
    {
        "id": "sealeo",
        "name": "Sealeo",
        "types": [
            "Ice",
            "Water"
        ],
        "hp": 290,
        "atk": 125,
        "def": 145,
        "spa": 155,
        "spd": 145,
        "spe": 95,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "surf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/sealeo.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/sealeo.gif"
    },
    {
        "id": "walrein",
        "name": "Walrein",
        "types": [
            "Ice",
            "Water"
        ],
        "hp": 330,
        "atk": 165,
        "def": 185,
        "spa": 195,
        "spd": 185,
        "spe": 135,
        "moves": [
            "headbutt",
            "body-slam",
            "double-edge",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/walrein.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/walrein.gif"
    },
    {
        "id": "clamperl",
        "name": "Clamperl",
        "types": [
            "Water"
        ],
        "hp": 180,
        "atk": 133,
        "def": 175,
        "spa": 153,
        "spd": 115,
        "spe": 69,
        "moves": [
            "body-slam",
            "double-edge",
            "surf",
            "ice-beam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/clamperl.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/clamperl.gif"
    },
    {
        "id": "huntail",
        "name": "Huntail",
        "types": [
            "Water"
        ],
        "hp": 220,
        "atk": 213,
        "def": 215,
        "spa": 193,
        "spd": 155,
        "spe": 109,
        "moves": [
            "body-slam",
            "double-edge",
            "bite",
            "hydro-pump"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/huntail.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/huntail.gif"
    },
    {
        "id": "gorebyss",
        "name": "Gorebyss",
        "types": [
            "Water"
        ],
        "hp": 220,
        "atk": 173,
        "def": 215,
        "spa": 233,
        "spd": 155,
        "spe": 109,
        "moves": [
            "body-slam",
            "double-edge",
            "hydro-pump",
            "surf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/gorebyss.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/gorebyss.gif"
    },
    {
        "id": "relicanth",
        "name": "Relicanth",
        "types": [
            "Water",
            "Rock"
        ],
        "hp": 310,
        "atk": 185,
        "def": 265,
        "spa": 95,
        "spd": 135,
        "spe": 115,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/relicanth.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/relicanth.gif"
    },
    {
        "id": "luvdisc",
        "name": "Luvdisc",
        "types": [
            "Water"
        ],
        "hp": 196,
        "atk": 65,
        "def": 115,
        "spa": 85,
        "spd": 135,
        "spe": 199,
        "moves": [
            "take-down",
            "double-edge",
            "hydro-pump",
            "surf"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/luvdisc.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/luvdisc.gif"
    },
    {
        "id": "bagon",
        "name": "Bagon",
        "types": [
            "Dragon"
        ],
        "hp": 200,
        "atk": 155,
        "def": 125,
        "spa": 85,
        "spd": 65,
        "spe": 105,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "thrash"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/bagon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/bagon.gif"
    },
    {
        "id": "shelgon",
        "name": "Shelgon",
        "types": [
            "Dragon"
        ],
        "hp": 240,
        "atk": 195,
        "def": 205,
        "spa": 125,
        "spd": 105,
        "spe": 105,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/shelgon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/shelgon.gif"
    },
    {
        "id": "salamence",
        "name": "Salamence",
        "types": [
            "Dragon",
            "Flying"
        ],
        "hp": 300,
        "atk": 275,
        "def": 165,
        "spa": 225,
        "spd": 165,
        "spe": 205,
        "moves": [
            "fly",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/salamence.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/salamence.gif"
    },
    {
        "id": "beldum",
        "name": "Beldum",
        "types": [
            "Steel",
            "Psychic"
        ],
        "hp": 190,
        "atk": 115,
        "def": 165,
        "spa": 75,
        "spd": 125,
        "spe": 65,
        "moves": [
            "headbutt",
            "take-down",
            "zen-headbutt",
            "iron-head"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/beldum.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/beldum.gif"
    },
    {
        "id": "metang",
        "name": "Metang",
        "types": [
            "Steel",
            "Psychic"
        ],
        "hp": 230,
        "atk": 155,
        "def": 205,
        "spa": 115,
        "spd": 165,
        "spe": 105,
        "moves": [
            "ice-punch",
            "thunder-punch",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/metang.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/metang.gif"
    },
    {
        "id": "metagross",
        "name": "Metagross",
        "types": [
            "Steel",
            "Psychic"
        ],
        "hp": 270,
        "atk": 275,
        "def": 265,
        "spa": 195,
        "spd": 185,
        "spe": 145,
        "moves": [
            "ice-punch",
            "thunder-punch",
            "headbutt",
            "body-slam"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/metagross.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/metagross.gif"
    },
    {
        "id": "regirock",
        "name": "Regirock",
        "types": [
            "Rock"
        ],
        "hp": 270,
        "atk": 205,
        "def": 405,
        "spa": 105,
        "spd": 205,
        "spe": 105,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/regirock.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/regirock.gif"
    },
    {
        "id": "regice",
        "name": "Regice",
        "types": [
            "Ice"
        ],
        "hp": 270,
        "atk": 105,
        "def": 205,
        "spa": 205,
        "spd": 405,
        "spe": 105,
        "moves": [
            "mega-punch",
            "ice-punch",
            "thunder-punch",
            "stomp"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/regice.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/regice.gif"
    },
    {
        "id": "registeel",
        "name": "Registeel",
        "types": [
            "Steel"
        ],
        "hp": 270,
        "atk": 155,
        "def": 305,
        "spa": 155,
        "spd": 305,
        "spe": 105,
        "moves": [
            "mega-punch",
            "ice-punch",
            "thunder-punch",
            "stomp"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/registeel.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/registeel.gif"
    },
    {
        "id": "latias",
        "name": "Latias",
        "types": [
            "Dragon",
            "Psychic"
        ],
        "hp": 270,
        "atk": 165,
        "def": 185,
        "spa": 225,
        "spd": 265,
        "spe": 225,
        "moves": [
            "fly",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/latias.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/latias.gif"
    },
    {
        "id": "latios",
        "name": "Latios",
        "types": [
            "Dragon",
            "Psychic"
        ],
        "hp": 270,
        "atk": 185,
        "def": 165,
        "spa": 265,
        "spd": 225,
        "spe": 225,
        "moves": [
            "fly",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/latios.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/latios.gif"
    },
    {
        "id": "kyogre",
        "name": "Kyogre",
        "types": [
            "Water"
        ],
        "hp": 310,
        "atk": 205,
        "def": 185,
        "spa": 305,
        "spd": 285,
        "spe": 185,
        "moves": [
            "headbutt",
            "body-slam",
            "take-down",
            "double-edge"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/kyogre.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/kyogre.gif"
    },
    {
        "id": "groudon",
        "name": "Groudon",
        "types": [
            "Ground"
        ],
        "hp": 310,
        "atk": 305,
        "def": 285,
        "spa": 205,
        "spd": 185,
        "spe": 185,
        "moves": [
            "mega-punch",
            "fire-punch",
            "thunder-punch",
            "mega-kick"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/groudon.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/groudon.gif"
    },
    {
        "id": "rayquaza",
        "name": "Rayquaza",
        "types": [
            "Dragon",
            "Flying"
        ],
        "hp": 320,
        "atk": 305,
        "def": 185,
        "spa": 305,
        "spd": 185,
        "spe": 195,
        "moves": [
            "fly",
            "headbutt",
            "body-slam",
            "take-down"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/rayquaza.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/rayquaza.gif"
    },
    {
        "id": "jirachi",
        "name": "Jirachi",
        "types": [
            "Steel",
            "Psychic"
        ],
        "hp": 310,
        "atk": 205,
        "def": 205,
        "spa": 205,
        "spd": 205,
        "spe": 205,
        "moves": [
            "mega-punch",
            "fire-punch",
            "ice-punch",
            "thunder-punch"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/jirachi.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/jirachi.gif"
    },
    {
        "id": "deoxys-normal",
        "name": "Deoxys-normal",
        "types": [
            "Psychic"
        ],
        "hp": 210,
        "atk": 305,
        "def": 105,
        "spa": 305,
        "spd": 105,
        "spe": 305,
        "moves": [
            "fire-punch",
            "ice-punch",
            "thunder-punch",
            "headbutt"
        ],
        "sprite": "https://play.pokemonshowdown.com/sprites/ani/deoxys-normal.gif",
        "spriteBack": "https://play.pokemonshowdown.com/sprites/ani-back/deoxys-normal.gif"
    }
];

export const FORMATS = [
    { id: 'gen9ou', name: '[Gen 9] OU', warning: '' },
    { id: 'gen9anythinggoes', name: '[Gen 9] Anything Goes', warning: 'WARNING: Anything Goes format allows teams of identical Pokémon.' },
    { id: 'gen9hackmons', name: '[Gen 9] Unlimited Hackmons', warning: 'WARNING: Pure Chaos!' }
];