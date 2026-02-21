import axios from 'axios';
import fs from 'fs';

const QUERY = `
query fetchPokemon {
  pokemon_v2_pokemon(limit: 386) {
    name
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonstats {
      base_stat
      pokemon_v2_stat {
        name
      }
    }
    pokemon_v2_pokemonmoves(where: {pokemon_v2_move: {power: {_gt: 0}}}, distinct_on: move_id, limit: 12) {
      pokemon_v2_move {
        name
        power
        accuracy
        priority
        pokemon_v2_type {
          name
        }
        pokemon_v2_movedamageclass {
          name
        }
      }
    }
  }
}
`;

async function buildData() {
    console.log("Fetching Pokemon via PokeAPI GraphQL...");
    const res = await axios.post('https://beta.pokeapi.co/graphql/v1beta', { query: QUERY });
    const pokemons = res.data.data.pokemon_v2_pokemon;

    const MOVES_DB = {};
    const POKEMON_DB = [];

    MOVES_DB['struggle'] = { name: 'Struggle', type: 'Normal', power: 50, accuracy: 100, category: 'Physical', priority: 0 };

    for (const p of pokemons) {
        // Types
        const types = p.pokemon_v2_pokemontypes.map(t => {
            const n = t.pokemon_v2_type.name;
            return n.charAt(0).toUpperCase() + n.slice(1);
        });

        // Stats
        const base = {};
        p.pokemon_v2_pokemonstats.forEach(s => {
            let n = s.pokemon_v2_stat.name;
            if (n === 'special-attack') n = 'spa';
            else if (n === 'special-defense') n = 'spd';
            else if (n === 'speed') n = 'spe';
            else if (n === 'attack') n = 'atk';
            else if (n === 'defense') n = 'def';
            base[n] = s.base_stat;
        });

        // Moves
        const moves = [];
        p.pokemon_v2_pokemonmoves.forEach(m => {
            const md = m.pokemon_v2_move;
            if (!md || !md.power) return;
            const mName = md.name;
            // Only add strongly damaging moves (power > 50)
            if (md.power > 50 || md.priority > 0) {
                moves.push(mName);
                if (!MOVES_DB[mName]) {
                    const typeName = md.pokemon_v2_type?.name || 'normal';
                    const catName = md.pokemon_v2_movedamageclass?.name || 'physical';
                    MOVES_DB[mName] = {
                        name: mName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                        type: typeName.charAt(0).toUpperCase() + typeName.slice(1),
                        power: md.power,
                        accuracy: md.accuracy || 100,
                        category: catName.charAt(0).toUpperCase() + catName.slice(1),
                        priority: md.priority || 0
                    };
                }
            }
        });

        const uniqueMoves = [...new Set(moves)].slice(0, 4);
        while (uniqueMoves.length < 4) uniqueMoves.push('struggle');

        const pName = p.name;
        const capName = pName.charAt(0).toUpperCase() + pName.slice(1);

        POKEMON_DB.push({
            id: pName,
            name: capName,
            types,
            hp: base.hp * 2 + 110,
            atk: base.atk * 2 + 5,
            def: base.def * 2 + 5,
            spa: base.spa * 2 + 5,
            spd: base.spd * 2 + 5,
            spe: base.spe * 2 + 5,
            moves: uniqueMoves,
            sprite: `https://play.pokemonshowdown.com/sprites/ani/${pName}.gif`,
            spriteBack: `https://play.pokemonshowdown.com/sprites/ani-back/${pName}.gif`
        });
    }

    console.log(`Successfully parsed ${POKEMON_DB.length} Pokemon and ${Object.keys(MOVES_DB).length} distinct moves.`);

    // Write to JS file
    const output = `
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

export const MOVES = ${JSON.stringify(MOVES_DB, null, 4)};

export const POKEMON_DB = ${JSON.stringify(POKEMON_DB, null, 4)};

export const FORMATS = [
    { id: 'gen9ou', name: '[Gen 9] OU', warning: '' },
    { id: 'gen9anythinggoes', name: '[Gen 9] Anything Goes', warning: 'WARNING: Anything Goes format allows teams of identical Pokémon.' },
    { id: 'gen9hackmons', name: '[Gen 9] Unlimited Hackmons', warning: 'WARNING: Pure Chaos!' }
];
`;

    fs.writeFileSync('data.js', output.trim());
    console.log("Successfully wrote data.js");
}

buildData().catch(console.error);
