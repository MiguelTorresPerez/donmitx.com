import axios from 'axios';
import fs from 'fs';

const QUERY = `
query fetchPokemon {
  pokemon_v2_pokemon(limit: 1025) {
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
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
    pokemon_v2_pokemonmoves(where: {pokemon_v2_move: {power: {_gt: 0}}}, distinct_on: move_id) {
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

  const MOVE_EFFECTS = {
    // RECHARGE
    'Hyper Beam': { recharge: true, desc: 'User must recharge next turn.' },
    'Giga Impact': { recharge: true, desc: 'User must recharge next turn.' },
    'Frenzy Plant': { recharge: true, desc: 'User must recharge next turn.' },
    'Blast Burn': { recharge: true, desc: 'User must recharge next turn.' },
    'Hydro Cannon': { recharge: true, desc: 'User must recharge next turn.' },
    'Roar Of Time': { recharge: true, desc: 'User must recharge next turn.' },
    'Meteor Assault': { recharge: true, desc: 'User must recharge next turn.' },

    // RECOIL
    'Brave Bird': { recoilPerc: 0.33, desc: 'User takes 33% recoil damage.' },
    'Flare Blitz': { recoilPerc: 0.33, statusRate: 10, status: 'BRN', desc: 'User takes 33% recoil damage. 10% Burn.' },
    'Wood Hammer': { recoilPerc: 0.33, desc: 'User takes 33% recoil damage.' },
    'Double Edge': { recoilPerc: 0.33, desc: 'User takes 33% recoil damage.' },
    'Volt Tackle': { recoilPerc: 0.33, statusRate: 10, status: 'PAR', desc: 'User takes 33% recoil damage. 10% Paralyze.' },
    'Chloroblast': { recoilPerc: 0.5, desc: 'User takes 50% max HP recoil damage.' },

    // STAT BOOSTS (SELF)
    'Swords Dance': { selfBoost: { atk: 2 }, desc: 'Raises Attack by 2.' },
    'Dragon Dance': { selfBoost: { atk: 1, spe: 1 }, desc: 'Raises Attack and Speed by 1.' },
    'Nasty Plot': { selfBoost: { spa: 2 }, desc: 'Raises Sp. Atk by 2.' },
    'Agility': { selfBoost: { spe: 2 }, desc: 'Raises Speed by 2.' },
    'Calm Mind': { selfBoost: { spa: 1, spd: 1 }, desc: 'Raises Sp. Atk and Sp. Def by 1.' },
    'Bulk Up': { selfBoost: { atk: 1, def: 1 }, desc: 'Raises Attack and Defense by 1.' },
    'Shell Smash': { selfBoost: { atk: 2, spa: 2, spe: 2 }, selfDrop: { def: -1, spd: -1 }, desc: 'Raises Atk, SpA, Spe by 2. Lowers Def, SpD by 1.' },
    'Quiver Dance': { selfBoost: { spa: 1, spd: 1, spe: 1 }, desc: 'Raises Sp. Atk, Sp. Def, Speed by 1.' },
    'Geomancy': { selfBoost: { spa: 2, spd: 2, spe: 2 }, desc: 'Raises Sp. Atk, Sp. Def, Speed by 2.' }, // Assume herb active for simplicity

    // STAT DROPS (SELF - NASTY MOVES)
    'Superpower': { selfDrop: { atk: -1, def: -1 }, desc: 'Lowers Attack and Defense by 1.' },
    'Close Combat': { selfDrop: { def: -1, spd: -1 }, desc: 'Lowers Defense and Sp. Def by 1.' },
    'Overheat': { selfDrop: { spa: -2 }, desc: 'Lowers Sp. Atk by 2.' },
    'Draco Meteor': { selfDrop: { spa: -2 }, desc: 'Lowers Sp. Atk by 2.' },
    'Leaf Storm': { selfDrop: { spa: -2 }, desc: 'Lowers Sp. Atk by 2.' },
    'Fleur Cannon': { selfDrop: { spa: -2 }, desc: 'Lowers Sp. Atk by 2.' },
    'Make It Rain': { selfDrop: { spa: -1 }, desc: 'Lowers Sp. Atk by 1.' },

    // STAT BOOSTS (EFFECTIVE)
    'Meteor Mash': { boostRate: 20, selfBoost: { atk: 1 }, desc: '20% chance to raise Attack.' },
    'Power Up Punch': { boostRate: 100, selfBoost: { atk: 1 }, desc: '100% chance to raise Attack.' },
    'Trailblaze': { boostRate: 100, selfBoost: { spe: 1 }, desc: '100% chance to raise Speed.' },
    'Flame Charge': { boostRate: 100, selfBoost: { spe: 1 }, desc: '100% chance to raise Speed.' },

    // STAT DROPS (ENEMY)
    'Shadow Ball': { dropRate: 20, enemyDrop: { spd: -1 }, desc: '20% chance to lower target Sp. Def.' },
    'Psychic': { dropRate: 10, enemyDrop: { spd: -1 }, desc: '10% chance to lower target Sp. Def.' },
    'Earth Power': { dropRate: 10, enemyDrop: { spd: -1 }, desc: '10% chance to lower target Sp. Def.' },
    'Crunch': { dropRate: 20, enemyDrop: { def: -1 }, desc: '20% chance to lower target Defense.' },
    'Play Rough': { dropRate: 10, enemyDrop: { atk: -1 }, desc: '10% chance to lower target Attack.' },
    'Moonblast': { dropRate: 30, enemyDrop: { spa: -1 }, desc: '30% chance to lower target Sp. Atk.' },

    // HEALING
    'Roost': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Recover': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Soft Boiled': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Synthesis': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Morning Sun': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Moonlight': { healPerc: 0.5, desc: 'Heals 50% max HP.' },

    // STATUS (PRIMARY)
    'Spore': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Sleep Powder': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Hypnosis': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Yawn': { status: 'SLP', desc: 'Puts target to sleep.' }, // simplified to instasleep for engine simplicity
    'Will O Wisp': { status: 'BRN', desc: 'Burns the target.' },
    'Toxic': { status: 'TOX', desc: 'Badly poisons the target.' },
    'Thunder Wave': { status: 'PAR', desc: 'Paralyzes the target.' },

    // STATUS (SECONDARY)
    'Thunderbolt': { statusRate: 10, status: 'PAR', desc: '10% chance to Paralyze.' },
    'Flamethrower': { statusRate: 10, status: 'BRN', desc: '10% chance to Burn.' },
    'Ice Beam': { statusRate: 10, status: 'FRZ', desc: '10% chance to Freeze.' },
    'Sludge Bomb': { statusRate: 30, status: 'PSN', desc: '30% chance to Poison.' },
    'Scald': { statusRate: 30, status: 'BRN', desc: '30% chance to Burn.' },
    'Discharge': { statusRate: 30, status: 'PAR', desc: '30% chance to Paralyze.' },
    'Lava Plume': { statusRate: 30, status: 'BRN', desc: '30% chance to Burn.' },
    'Body Slam': { statusRate: 30, status: 'PAR', desc: '30% chance to Paralyze.' },
    'Tri Attack': { statusRate: 20, status: 'rnd', desc: '20% chance to Burn/Par/Frz.' }, // Note: Needs custom logic in engine if wanted

    // DRAIN
    'Giga Drain': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },
    'Drain Punch': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },
    'Horn Leech': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },
    'Bitter Blade': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },

    // MULTI-HIT
    'Bullet Seed': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Icicle Spear': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Rock Blast': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Tail Slap': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Pin Missile': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Dual Chop': { multiHit: [2, 2], desc: 'Hits 2 times.' },
    'Double Hit': { multiHit: [2, 2], desc: 'Hits 2 times.' },
    'Twin Beam': { multiHit: [2, 2], desc: 'Hits 2 times.' },
    'Gear Grind': { multiHit: [2, 2], desc: 'Hits 2 times.' },
    'Dragon Darts': { multiHit: [2, 2], desc: 'Hits 2 times.' },

    // PROTECTION
    'Protect': { protect: true, priority: 4, desc: 'Prevents moves from affecting the user this turn.' },
    'Detect': { protect: true, priority: 4, desc: 'Prevents moves from affecting the user this turn.' },
    'Spiky Shield': { protect: true, priority: 4, protectDamage: 0.125, desc: 'Protects user. Damages attackers.' },
    'Baneful Bunker': { protect: true, priority: 4, protectStatus: 'PSN', desc: 'Protects user. Poisons attackers.' },
    'King\'s Shield': { protect: true, priority: 4, protectDrop: { atk: -1 }, desc: 'Protects user. Lowers attacker Atk.' },
    'Silk Trap': { protect: true, priority: 4, protectDrop: { spe: -1 }, desc: 'Protects user. Lowers attacker Spe.' },

    // WEATHER
    'Sunny Day': { weather: 'Sun', desc: 'Sets Sunny weather for 5 turns.' },
    'Rain Dance': { weather: 'Rain', desc: 'Sets Rainy weather for 5 turns.' },
    'Sandstorm': { weather: 'Sand', desc: 'Sets Sandstorm weather for 5 turns.' },
    'Snowscape': { weather: 'Snow', desc: 'Sets Snow weather for 5 turns.' },
    'Hail': { weather: 'Snow', desc: 'Sets Snow weather for 5 turns.' },

    // PRIORITY
    'Extreme Speed': { priority: 2, desc: 'Strikes first.' },
    'Sucker Punch': { priority: 1, desc: 'Strikes first (fails if target status moves).' },
    'Aqua Jet': { priority: 1, desc: 'Strikes first.' },
    'Mach Punch': { priority: 1, desc: 'Strikes first.' },
    'Bullet Punch': { priority: 1, desc: 'Strikes first.' },
    'Ice Shard': { priority: 1, desc: 'Strikes first.' },
    'Fake Out': { priority: 3, flinchRate: 100, desc: 'Strikes first and flinches. Only works first turn.' }
  };

  MOVES_DB['struggle'] = { name: 'Struggle', type: 'Normal', power: 50, accuracy: 100, category: 'Physical', priority: 0, recoilPerc: 0.25, desc: 'User takes 25% recoil damage.' };

  // Pre-register all status moves from MOVE_EFFECTS so they appear in movepools
  const statusMoveEntries = {
    'swords-dance': { name: 'Swords Dance', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'dragon-dance': { name: 'Dragon Dance', type: 'Dragon', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'nasty-plot': { name: 'Nasty Plot', type: 'Dark', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'agility': { name: 'Agility', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'calm-mind': { name: 'Calm Mind', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'bulk-up': { name: 'Bulk Up', type: 'Fighting', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'shell-smash': { name: 'Shell Smash', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'quiver-dance': { name: 'Quiver Dance', type: 'Bug', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'geomancy': { name: 'Geomancy', type: 'Fairy', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'roost': { name: 'Roost', type: 'Flying', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'recover': { name: 'Recover', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'soft-boiled': { name: 'Soft Boiled', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'synthesis': { name: 'Synthesis', type: 'Grass', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'morning-sun': { name: 'Morning Sun', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'moonlight': { name: 'Moonlight', type: 'Fairy', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'spore': { name: 'Spore', type: 'Grass', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'sleep-powder': { name: 'Sleep Powder', type: 'Grass', power: 0, accuracy: 75, category: 'Status', priority: 0 },
    'hypnosis': { name: 'Hypnosis', type: 'Psychic', power: 0, accuracy: 60, category: 'Status', priority: 0 },
    'yawn': { name: 'Yawn', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'will-o-wisp': { name: 'Will O Wisp', type: 'Fire', power: 0, accuracy: 85, category: 'Status', priority: 0 },
    'toxic': { name: 'Toxic', type: 'Poison', power: 0, accuracy: 90, category: 'Status', priority: 0 },
    'thunder-wave': { name: 'Thunder Wave', type: 'Electric', power: 0, accuracy: 90, category: 'Status', priority: 0 },
    'protect': { name: 'Protect', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 4 },
    'detect': { name: 'Detect', type: 'Fighting', power: 0, accuracy: 100, category: 'Status', priority: 4 },
    'sunny-day': { name: 'Sunny Day', type: 'Fire', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'rain-dance': { name: 'Rain Dance', type: 'Water', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'sandstorm': { name: 'Sandstorm', type: 'Rock', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'snowscape': { name: 'Snowscape', type: 'Ice', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'hail': { name: 'Hail', type: 'Ice', power: 0, accuracy: 100, category: 'Status', priority: 0 },
  };
  for (const [id, entry] of Object.entries(statusMoveEntries)) {
    entry.effects = MOVE_EFFECTS[entry.name] || null;
    MOVES_DB[id] = entry;
  }

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

    // Abilities
    const abilities = p.pokemon_v2_pokemonabilities.map(a => {
      const n = a.pokemon_v2_ability.name;
      return n.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
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
          const formalName = mName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

          MOVES_DB[mName] = {
            name: formalName,
            type: typeName.charAt(0).toUpperCase() + typeName.slice(1),
            power: md.power,
            accuracy: md.accuracy || 100,
            category: catName.charAt(0).toUpperCase() + catName.slice(1),
            priority: md.priority || 0,
            effects: MOVE_EFFECTS[formalName] || null
          };
        }
      }
    });

    const uniqueMoves = [...new Set(moves)];
    while (uniqueMoves.length < 4) uniqueMoves.push('struggle');

    const pName = p.name;
    const capName = pName.charAt(0).toUpperCase() + pName.slice(1);

    POKEMON_DB.push({
      id: pName,
      name: capName,
      types,
      abilities: [...new Set(abilities)],
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

export const ITEMS = {
    'Leftovers': { name: 'Leftovers', desc: 'Heals 1/16 of max HP at the end of each turn.' },
    'Life Orb': { name: 'Life Orb', desc: 'Attacks deal 1.3x damage but user loses 1/10 max HP.' },
    'Choice Band': { name: 'Choice Band', desc: 'Attack is 1.5x, but only first selected move can be used.' },
    'Choice Specs': { name: 'Choice Specs', desc: 'Sp. Atk is 1.5x, but only first selected move can be used.' },
    'Choice Scarf': { name: 'Choice Scarf', desc: 'Speed is 1.5x, but only first selected move can be used.' },
    'Focus Sash': { name: 'Focus Sash', desc: 'If at full HP, survives one hit that would KO with 1 HP.' },
    'None': { name: 'None', desc: 'No item.' }
};

export const FORMATS = [
    { id: 'gen9random', name: '[Gen 9] Random Battle', clauses: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'], warning: 'Pokemon, moves, and items are completely randomized.' },
    { id: 'gen9ou', name: '[Gen 9] OU', clauses: ['Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'], warning: '' },
    { id: 'gen9anythinggoes', name: '[Gen 9] Anything Goes', clauses: ['Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'], warning: 'WARNING: Anything Goes format allows teams of identical Pokémon.' },
    { id: 'gen9hackmons', name: '[Gen 9] Unlimited Hackmons', clauses: ['HP Percentage Mod', 'Cancel Mod'], warning: 'WARNING: Pure Chaos!' }
];
`;

  fs.writeFileSync('data.js', output.trim());
  console.log("Successfully wrote data.js");
}

buildData().catch(console.error);
