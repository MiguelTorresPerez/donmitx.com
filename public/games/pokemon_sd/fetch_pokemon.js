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

    // STAT BOOSTS (SELF) - +2
    'Swords Dance': { selfBoost: { atk: 2 }, desc: 'Raises Attack by 2.' },
    'Nasty Plot': { selfBoost: { spa: 2 }, desc: 'Raises Sp. Atk by 2.' },
    'Agility': { selfBoost: { spe: 2 }, desc: 'Raises Speed by 2.' },
    'Iron Defense': { selfBoost: { def: 2 }, desc: 'Raises Defense by 2.' },
    'Amnesia': { selfBoost: { spd: 2 }, desc: 'Raises Sp. Def by 2.' },
    'Acid Armor': { selfBoost: { def: 2 }, desc: 'Raises Defense by 2.' },
    'Barrier': { selfBoost: { def: 2 }, desc: 'Raises Defense by 2.' },
    'Rock Polish': { selfBoost: { spe: 2 }, desc: 'Raises Speed by 2.' },
    'Autotomize': { selfBoost: { spe: 2 }, desc: 'Raises Speed by 2.' },
    'Cotton Guard': { selfBoost: { def: 3 }, desc: 'Raises Defense by 3.' },
    'Tail Glow': { selfBoost: { spa: 3 }, desc: 'Raises Sp. Atk by 3.' },
    'Belly Drum': { selfBoost: { atk: 6 }, healPerc: -0.5, desc: 'Maxes Attack but cuts HP by 50%.' },
    'Minimize': { selfBoost: { evasion: 2 }, desc: 'Raises Evasion by 2.' },
    'Double Team': { selfBoost: { evasion: 1 }, desc: 'Raises Evasion by 1.' },

    // STAT BOOSTS (SELF) - +1 multi
    'Dragon Dance': { selfBoost: { atk: 1, spe: 1 }, desc: 'Raises Attack and Speed by 1.' },
    'Calm Mind': { selfBoost: { spa: 1, spd: 1 }, desc: 'Raises Sp. Atk and Sp. Def by 1.' },
    'Bulk Up': { selfBoost: { atk: 1, def: 1 }, desc: 'Raises Attack and Defense by 1.' },
    'Quiver Dance': { selfBoost: { spa: 1, spd: 1, spe: 1 }, desc: 'Raises Sp. Atk, Sp. Def, Speed by 1.' },
    'Coil': { selfBoost: { atk: 1, def: 1 }, desc: 'Raises Attack, Defense, Accuracy by 1.' },
    'Cosmic Power': { selfBoost: { def: 1, spd: 1 }, desc: 'Raises Defense and Sp. Def by 1.' },
    'Hone Claws': { selfBoost: { atk: 1 }, desc: 'Raises Attack and Accuracy by 1.' },
    'Work Up': { selfBoost: { atk: 1, spa: 1 }, desc: 'Raises Attack and Sp. Atk by 1.' },
    'Growth': { selfBoost: { atk: 1, spa: 1 }, desc: 'Raises Attack and Sp. Atk by 1.' },
    'Shift Gear': { selfBoost: { atk: 1, spe: 2 }, desc: 'Raises Attack by 1, Speed by 2.' },
    'No Retreat': { selfBoost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }, desc: 'Raises all stats by 1. Cannot flee.' },
    'Victory Dance': { selfBoost: { atk: 1, def: 1, spe: 1 }, desc: 'Raises Atk, Def, Speed by 1.' },
    'Clangorous Soul': { selfBoost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }, healPerc: -0.33, desc: 'Raises all stats by 1. Costs 33% HP.' },
    'Charge Beam': { boostRate: 70, selfBoost: { spa: 1 }, desc: '70% chance to raise Sp. Atk.' },
    'Fiery Dance': { boostRate: 50, selfBoost: { spa: 1 }, desc: '50% chance to raise Sp. Atk.' },

    // STAT BOOSTS - big combos
    'Shell Smash': { selfBoost: { atk: 2, spa: 2, spe: 2 }, selfDrop: { def: -1, spd: -1 }, desc: 'Raises Atk, SpA, Spe by 2. Lowers Def, SpD by 1.' },
    'Geomancy': { selfBoost: { spa: 2, spd: 2, spe: 2 }, desc: 'Raises Sp. Atk, Sp. Def, Speed by 2.' },

    // STAT DROPS (SELF after attacking)
    'Superpower': { selfDrop: { atk: -1, def: -1 }, desc: 'Lowers Attack and Defense by 1.' },
    'Close Combat': { selfDrop: { def: -1, spd: -1 }, desc: 'Lowers Defense and Sp. Def by 1.' },
    'Overheat': { selfDrop: { spa: -2 }, desc: 'Lowers Sp. Atk by 2.' },
    'Draco Meteor': { selfDrop: { spa: -2 }, desc: 'Lowers Sp. Atk by 2.' },
    'Leaf Storm': { selfDrop: { spa: -2 }, desc: 'Lowers Sp. Atk by 2.' },
    'Fleur Cannon': { selfDrop: { spa: -2 }, desc: 'Lowers Sp. Atk by 2.' },
    'Psycho Boost': { selfDrop: { spa: -2 }, desc: 'Lowers Sp. Atk by 2.' },
    'Make It Rain': { selfDrop: { spa: -1 }, desc: 'Lowers Sp. Atk by 1.' },
    'V Create': { selfDrop: { def: -1, spd: -1, spe: -1 }, desc: 'Lowers Def, SpD, Spe by 1.' },
    'Hammer Arm': { selfDrop: { spe: -1 }, desc: 'Lowers Speed by 1.' },
    'Ice Hammer': { selfDrop: { spe: -1 }, desc: 'Lowers Speed by 1.' },

    // STAT BOOSTS (AFTER DAMAGE on self)
    'Meteor Mash': { boostRate: 20, selfBoost: { atk: 1 }, desc: '20% chance to raise Attack.' },
    'Power Up Punch': { boostRate: 100, selfBoost: { atk: 1 }, desc: '100% chance to raise Attack.' },
    'Trailblaze': { boostRate: 100, selfBoost: { spe: 1 }, desc: '100% chance to raise Speed.' },
    'Flame Charge': { boostRate: 100, selfBoost: { spe: 1 }, desc: '100% chance to raise Speed.' },
    'Rapid Spin': { boostRate: 100, selfBoost: { spe: 1 }, clearMyHazards: true, desc: 'Clears hazards. Raises Speed.' },
    'Scale Shot': { multiHit: [2, 5], selfBoost: { spe: 1 }, selfDrop: { def: -1 }, desc: 'Hits 2-5 times. +1 Spe, -1 Def.' },

    // STAT DROPS (ENEMY) - secondary after damage
    'Shadow Ball': { dropRate: 20, enemyDrop: { spd: -1 }, desc: '20% chance to lower target Sp. Def.' },
    'Psychic': { dropRate: 10, enemyDrop: { spd: -1 }, desc: '10% chance to lower target Sp. Def.' },
    'Earth Power': { dropRate: 10, enemyDrop: { spd: -1 }, desc: '10% chance to lower target Sp. Def.' },
    'Energy Ball': { dropRate: 10, enemyDrop: { spd: -1 }, desc: '10% chance to lower target Sp. Def.' },
    'Focus Blast': { dropRate: 10, enemyDrop: { spd: -1 }, desc: '10% chance to lower target Sp. Def.' },
    'Flash Cannon': { dropRate: 10, enemyDrop: { spd: -1 }, desc: '10% chance to lower target Sp. Def.' },
    'Bug Buzz': { dropRate: 10, enemyDrop: { spd: -1 }, desc: '10% chance to lower target Sp. Def.' },
    'Crunch': { dropRate: 20, enemyDrop: { def: -1 }, desc: '20% chance to lower target Defense.' },
    'Liquidation': { dropRate: 20, enemyDrop: { def: -1 }, desc: '20% chance to lower target Defense.' },
    'Razor Shell': { dropRate: 50, enemyDrop: { def: -1 }, desc: '50% chance to lower target Defense.' },
    'Play Rough': { dropRate: 10, enemyDrop: { atk: -1 }, desc: '10% chance to lower target Attack.' },
    'Moonblast': { dropRate: 30, enemyDrop: { spa: -1 }, desc: '30% chance to lower target Sp. Atk.' },
    'Mystical Fire': { dropRate: 100, enemyDrop: { spa: -1 }, desc: '100% chance to lower target Sp. Atk.' },
    'Snarl': { dropRate: 100, enemyDrop: { spa: -1 }, desc: '100% chance to lower target Sp. Atk.' },
    'Struggle Bug': { dropRate: 100, enemyDrop: { spa: -1 }, desc: '100% chance to lower target Sp. Atk.' },
    'Icy Wind': { dropRate: 100, enemyDrop: { spe: -1 }, desc: '100% chance to lower target Speed.' },
    'Mud Shot': { dropRate: 100, enemyDrop: { spe: -1 }, desc: '100% chance to lower target Speed.' },
    'Rock Tomb': { dropRate: 100, enemyDrop: { spe: -1 }, desc: '100% chance to lower target Speed.' },
    'Electroweb': { dropRate: 100, enemyDrop: { spe: -1 }, desc: '100% chance to lower target Speed.' },
    'Acid Spray': { dropRate: 100, enemyDrop: { spd: -2 }, desc: '100% chance to lower target Sp. Def by 2.' },
    'Seed Flare': { dropRate: 40, enemyDrop: { spd: -2 }, desc: '40% chance to lower target Sp. Def by 2.' },

    // STAT DROPS (ENEMY) - Status moves
    'Charm': { enemyDrop: { atk: -2 }, desc: 'Lowers target Attack by 2.' },
    'Fake Tears': { enemyDrop: { spd: -2 }, desc: 'Lowers target Sp. Def by 2.' },
    'Screech': { enemyDrop: { def: -2 }, desc: 'Lowers target Defense by 2.' },
    'Metal Sound': { enemyDrop: { spd: -2 }, desc: 'Lowers target Sp. Def by 2.' },
    'Scary Face': { enemyDrop: { spe: -2 }, desc: 'Lowers target Speed by 2.' },
    'Sweet Scent': { enemyDrop: { evasion: -2 }, desc: 'Lowers target Evasion by 2.' },
    'Growl': { enemyDrop: { atk: -1 }, desc: 'Lowers target Attack by 1.' },
    'Leer': { enemyDrop: { def: -1 }, desc: 'Lowers target Defense by 1.' },
    'Tail Whip': { enemyDrop: { def: -1 }, desc: 'Lowers target Defense by 1.' },
    'String Shot': { enemyDrop: { spe: -2 }, desc: 'Lowers target Speed by 2.' },
    'Memento': { enemyDrop: { atk: -2, spa: -2 }, healPerc: -1, desc: 'User faints. Lowers target Atk/SpA by 2.' },
    'Parting Shot': { enemyDrop: { atk: -1, spa: -1 }, pivot: true, desc: 'Lowers Atk/SpA by 1 and switches out.' },
    'Defog': { enemyDrop: { evasion: -1 }, clearHazards: true, desc: 'Clears hazards/screens from the field.' },

    // HEALING
    'Roost': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Recover': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Soft Boiled': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Synthesis': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Morning Sun': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Moonlight': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Slack Off': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Milk Drink': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Shore Up': { healPerc: 0.5, desc: 'Heals 50% max HP.' },
    'Strength Sap': { healPerc: 0.5, enemyDrop: { atk: -1 }, desc: 'Heals 50% HP. Lowers target Atk by 1.' },
    'Rest': { healPerc: 1, status: 'SLP', statusSelf: true, desc: 'Fully heals HP. User falls asleep 2 turns.' },

    // STATUS (PRIMARY)
    'Spore': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Sleep Powder': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Hypnosis': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Yawn': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Sing': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Dark Void': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Lovely Kiss': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Grass Whistle': { status: 'SLP', desc: 'Puts target to sleep.' },
    'Will O Wisp': { status: 'BRN', desc: 'Burns the target.' },
    'Toxic': { status: 'TOX', desc: 'Badly poisons the target.' },
    'Poison Powder': { status: 'PSN', desc: 'Poisons the target.' },
    'Poison Gas': { status: 'PSN', desc: 'Poisons the target.' },
    'Thunder Wave': { status: 'PAR', desc: 'Paralyzes the target.' },
    'Stun Spore': { status: 'PAR', desc: 'Paralyzes the target.' },
    'Glare': { status: 'PAR', desc: 'Paralyzes the target.' },
    'Nuzzle': { statusRate: 100, status: 'PAR', desc: '100% chance to Paralyze.' },

    // STATUS (SECONDARY)
    'Thunderbolt': { statusRate: 10, status: 'PAR', desc: '10% chance to Paralyze.' },
    'Thunder': { statusRate: 30, status: 'PAR', desc: '30% chance to Paralyze.' },
    'Flamethrower': { statusRate: 10, status: 'BRN', desc: '10% chance to Burn.' },
    'Fire Blast': { statusRate: 10, status: 'BRN', desc: '10% chance to Burn.' },
    'Ice Beam': { statusRate: 10, status: 'FRZ', desc: '10% chance to Freeze.' },
    'Blizzard': { statusRate: 10, status: 'FRZ', desc: '10% chance to Freeze.' },
    'Sludge Bomb': { statusRate: 30, status: 'PSN', desc: '30% chance to Poison.' },
    'Sludge Wave': { statusRate: 10, status: 'PSN', desc: '10% chance to Poison.' },
    'Poison Jab': { statusRate: 30, status: 'PSN', desc: '30% chance to Poison.' },
    'Scald': { statusRate: 30, status: 'BRN', desc: '30% chance to Burn.' },
    'Steam Eruption': { statusRate: 30, status: 'BRN', desc: '30% chance to Burn.' },
    'Discharge': { statusRate: 30, status: 'PAR', desc: '30% chance to Paralyze.' },
    'Lava Plume': { statusRate: 30, status: 'BRN', desc: '30% chance to Burn.' },
    'Body Slam': { statusRate: 30, status: 'PAR', desc: '30% chance to Paralyze.' },
    'Tri Attack': { statusRate: 20, status: 'rnd', desc: '20% chance to Burn/Par/Frz.' },
    'Sacred Fire': { statusRate: 50, status: 'BRN', desc: '50% chance to Burn.' },
    'Blue Flare': { statusRate: 20, status: 'BRN', desc: '20% chance to Burn.' },
    'Bolt Strike': { statusRate: 20, status: 'PAR', desc: '20% chance to Paralyze.' },
    'Freeze Dry': { statusRate: 10, status: 'FRZ', desc: '10% FRZ. Super effective on Water.' },

    // DRAIN
    'Giga Drain': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },
    'Drain Punch': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },
    'Horn Leech': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },
    'Bitter Blade': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },
    'Parabolic Charge': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },
    'Oblivion Wing': { drainPerc: 0.75, desc: 'Recovers 75% of damage dealt.' },
    'Leech Life': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },
    'Draining Kiss': { drainPerc: 0.75, desc: 'Recovers 75% of damage dealt.' },
    'Absorb': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },
    'Mega Drain': { drainPerc: 0.5, desc: 'Recovers 50% of damage dealt.' },

    // MULTI-HIT
    'Bullet Seed': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Icicle Spear': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Rock Blast': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Tail Slap': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Pin Missile': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Bone Rush': { multiHit: [2, 5], desc: 'Hits 2-5 times.' },
    'Water Shuriken': { multiHit: [2, 5], priority: 1, desc: 'Hits 2-5 times. Priority +1.' },
    'Population Bomb': { multiHit: [1, 10], desc: 'Hits 1-10 times.' },
    'Surging Strikes': { multiHit: [3, 3], critRate: true, desc: 'Hits 3 times. Always crits.' },
    'Triple Axel': { multiHit: [3, 3], desc: 'Hits 3 times. Power increases per hit.' },
    'Dual Chop': { multiHit: [2, 2], desc: 'Hits 2 times.' },
    'Double Hit': { multiHit: [2, 2], desc: 'Hits 2 times.' },
    'Twin Beam': { multiHit: [2, 2], desc: 'Hits 2 times.' },
    'Gear Grind': { multiHit: [2, 2], desc: 'Hits 2 times.' },
    'Dragon Darts': { multiHit: [2, 2], desc: 'Hits 2 times.' },
    'Double Iron Bash': { multiHit: [2, 2], statusRate: 30, status: 'flinch', desc: 'Hits 2 times. 30% flinch per hit.' },

    // PROTECTION
    'Protect': { protect: true, priority: 4, desc: 'Prevents moves from affecting the user this turn.' },
    'Detect': { protect: true, priority: 4, desc: 'Prevents moves from affecting the user this turn.' },
    'Spiky Shield': { protect: true, priority: 4, protectDamage: 0.125, desc: 'Protects user. Damages attackers.' },
    'Baneful Bunker': { protect: true, priority: 4, protectStatus: 'PSN', desc: 'Protects user. Poisons attackers.' },
    'King\'s Shield': { protect: true, priority: 4, protectDrop: { atk: -1 }, desc: 'Protects user. Lowers attacker Atk.' },
    'Silk Trap': { protect: true, priority: 4, protectDrop: { spe: -1 }, desc: 'Protects user. Lowers attacker Spe.' },
    'Obstruct': { protect: true, priority: 4, protectDrop: { def: -2 }, desc: 'Protects user. Lowers attacker Def by 2.' },

    // WEATHER
    'Sunny Day': { weather: 'Sun', desc: 'Sets Sunny weather for 5 turns.' },
    'Rain Dance': { weather: 'Rain', desc: 'Sets Rainy weather for 5 turns.' },
    'Sandstorm': { weather: 'Sand', desc: 'Sets Sandstorm weather for 5 turns.' },
    'Snowscape': { weather: 'Snow', desc: 'Sets Snow weather for 5 turns.' },
    'Hail': { weather: 'Snow', desc: 'Sets Snow weather for 5 turns.' },

    // HAZARDS / FIELD
    'Stealth Rock': { hazards: 'stealth-rock', desc: 'Sets rocks that damage on switch-in.' },
    'Spikes': { hazards: 'spikes', desc: 'Sets spikes (up to 3 layers).' },
    'Toxic Spikes': { hazards: 'toxic-spikes', desc: 'Sets toxic spikes (up to 2 layers).' },
    'Sticky Web': { hazards: 'sticky-web', desc: 'Lowers Speed of opponents switching in.' },

    // SCREENS
    'Reflect': { screen: 'reflect', desc: 'Halves physical damage for 5 turns.' },
    'Light Screen': { screen: 'light-screen', desc: 'Halves special damage for 5 turns.' },
    'Aurora Veil': { screen: 'aurora-veil', desc: 'Halves all damage for 5 turns. Requires Snow.' },

    // UTILITY STATUS
    'Substitute': { substitute: true, desc: 'Creates a Substitute at 25% HP.' },
    'Leech Seed': { leechSeed: true, desc: 'Drains 1/8 of target HP each turn.' },
    'Taunt': { taunt: 3, desc: 'Prevents target from using status moves for 3 turns.' },
    'Encore': { encore: 3, desc: 'Forces target to repeat last move for 3 turns.' },
    'Trick': { trick: true, desc: 'Swaps held items with the target.' },
    'Switcheroo': { trick: true, desc: 'Swaps held items with the target.' },
    'Knock Off': { removeTargetItem: true, desc: 'Removes the target item. 1.5x power if target has item.' },
    'Haze': { haze: true, desc: 'Resets all stat changes.' },
    'Clear Smog': { hazeTarget: true, desc: 'Resets target stat changes.' },
    'Whirlwind': { forceSwitch: true, priority: -6, desc: 'Forces target to switch out.' },
    'Roar': { forceSwitch: true, priority: -6, desc: 'Forces target to switch out.' },
    'Dragon Tail': { forceSwitch: true, desc: 'Forces target to switch out after damage.' },
    'Circle Throw': { forceSwitch: true, desc: 'Forces target to switch out after damage.' },
    'Wish': { wish: true, desc: 'Heals 50% HP at the end of next turn.' },
    'Healing Wish': { healingWish: true, desc: 'User faints. Fully heals the switch-in.' },
    'Lunar Dance': { healingWish: true, desc: 'User faints. Fully heals the switch-in.' },
    'Pain Split': { painSplit: true, desc: 'Averages HP with the target.' },
    'Destiny Bond': { destinyBond: true, desc: 'If user faints, so does the attacker.' },
    'Perish Song': { perishSong: true, desc: 'All Pokémon faint in 3 turns unless switched.' },
    'Curse': { curse: true, desc: 'Ghost: lose 50% HP, target loses 25%/turn. Other: +Atk, +Def, -Spe.' },
    'Teleport': { pivot: true, priority: -6, desc: 'Switches the user out.' },

    // PIVOT MOVES
    'U Turn': { pivot: true, desc: 'Deals damage then switches out.' },
    'Volt Switch': { pivot: true, desc: 'Deals damage then switches out.' },
    'Flip Turn': { pivot: true, desc: 'Deals damage then switches out.' },

    // PRIORITY
    'Extreme Speed': { priority: 2, desc: 'Strikes first.' },
    'Sucker Punch': { priority: 1, desc: 'Strikes first (fails if target uses status).' },
    'Aqua Jet': { priority: 1, desc: 'Strikes first.' },
    'Mach Punch': { priority: 1, desc: 'Strikes first.' },
    'Bullet Punch': { priority: 1, desc: 'Strikes first.' },
    'Ice Shard': { priority: 1, desc: 'Strikes first.' },
    'Shadow Sneak': { priority: 1, desc: 'Strikes first.' },
    'Quick Attack': { priority: 1, desc: 'Strikes first.' },
    'Accelerock': { priority: 1, desc: 'Strikes first.' },
    'Grassy Glide': { priority: 1, desc: 'Strikes first in Grassy Terrain.' },
    'Jet Punch': { priority: 1, desc: 'Strikes first.' },
    'First Impression': { priority: 2, desc: 'Strikes first. Only works first turn.' },
    'Fake Out': { priority: 3, flinchRate: 100, desc: 'Strikes first and flinches. Only works first turn.' },

    // HIGH CRIT RATE
    'Stone Edge': { critRate: true, desc: 'High critical hit ratio.' },
    'Cross Chop': { critRate: true, desc: 'High critical hit ratio.' },
    'Night Slash': { critRate: true, desc: 'High critical hit ratio.' },
    'Leaf Blade': { critRate: true, desc: 'High critical hit ratio.' },
    'Psycho Cut': { critRate: true, desc: 'High critical hit ratio.' },
    'Slash': { critRate: true, desc: 'High critical hit ratio.' },
    'Dire Claw': { critRate: true, statusRate: 50, status: 'rnd', desc: 'High crit. 50% status.' },
    'Wicked Blow': { critRate: true, desc: 'Always crits.' }
  };

  MOVES_DB['struggle'] = { name: 'Struggle', type: 'Normal', power: 50, accuracy: 100, category: 'Physical', priority: 0, recoilPerc: 0.25, desc: 'User takes 25% recoil damage.' };

  // Pre-register all status moves from MOVE_EFFECTS so they appear in movepools
  const statusMoveEntries = {
    // Stat boosts
    'swords-dance': { name: 'Swords Dance', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'dragon-dance': { name: 'Dragon Dance', type: 'Dragon', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'nasty-plot': { name: 'Nasty Plot', type: 'Dark', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'agility': { name: 'Agility', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'calm-mind': { name: 'Calm Mind', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'bulk-up': { name: 'Bulk Up', type: 'Fighting', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'shell-smash': { name: 'Shell Smash', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'quiver-dance': { name: 'Quiver Dance', type: 'Bug', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'geomancy': { name: 'Geomancy', type: 'Fairy', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'iron-defense': { name: 'Iron Defense', type: 'Steel', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'amnesia': { name: 'Amnesia', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'acid-armor': { name: 'Acid Armor', type: 'Poison', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'barrier': { name: 'Barrier', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'rock-polish': { name: 'Rock Polish', type: 'Rock', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'autotomize': { name: 'Autotomize', type: 'Steel', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'cotton-guard': { name: 'Cotton Guard', type: 'Grass', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'tail-glow': { name: 'Tail Glow', type: 'Bug', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'belly-drum': { name: 'Belly Drum', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'coil': { name: 'Coil', type: 'Poison', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'cosmic-power': { name: 'Cosmic Power', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'hone-claws': { name: 'Hone Claws', type: 'Dark', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'work-up': { name: 'Work Up', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'growth': { name: 'Growth', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'shift-gear': { name: 'Shift Gear', type: 'Steel', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'no-retreat': { name: 'No Retreat', type: 'Fighting', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'victory-dance': { name: 'Victory Dance', type: 'Fighting', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'clangorous-soul': { name: 'Clangorous Soul', type: 'Dragon', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'minimize': { name: 'Minimize', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'double-team': { name: 'Double Team', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    // Healing
    'roost': { name: 'Roost', type: 'Flying', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'recover': { name: 'Recover', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'soft-boiled': { name: 'Soft Boiled', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'synthesis': { name: 'Synthesis', type: 'Grass', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'morning-sun': { name: 'Morning Sun', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'moonlight': { name: 'Moonlight', type: 'Fairy', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'slack-off': { name: 'Slack Off', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'milk-drink': { name: 'Milk Drink', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'shore-up': { name: 'Shore Up', type: 'Ground', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'rest': { name: 'Rest', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'strength-sap': { name: 'Strength Sap', type: 'Grass', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    // Status
    'spore': { name: 'Spore', type: 'Grass', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'sleep-powder': { name: 'Sleep Powder', type: 'Grass', power: 0, accuracy: 75, category: 'Status', priority: 0 },
    'hypnosis': { name: 'Hypnosis', type: 'Psychic', power: 0, accuracy: 60, category: 'Status', priority: 0 },
    'yawn': { name: 'Yawn', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'sing': { name: 'Sing', type: 'Normal', power: 0, accuracy: 55, category: 'Status', priority: 0 },
    'dark-void': { name: 'Dark Void', type: 'Dark', power: 0, accuracy: 50, category: 'Status', priority: 0 },
    'lovely-kiss': { name: 'Lovely Kiss', type: 'Normal', power: 0, accuracy: 75, category: 'Status', priority: 0 },
    'grass-whistle': { name: 'Grass Whistle', type: 'Grass', power: 0, accuracy: 55, category: 'Status', priority: 0 },
    'will-o-wisp': { name: 'Will O Wisp', type: 'Fire', power: 0, accuracy: 85, category: 'Status', priority: 0 },
    'toxic': { name: 'Toxic', type: 'Poison', power: 0, accuracy: 90, category: 'Status', priority: 0 },
    'poison-powder': { name: 'Poison Powder', type: 'Poison', power: 0, accuracy: 75, category: 'Status', priority: 0 },
    'poison-gas': { name: 'Poison Gas', type: 'Poison', power: 0, accuracy: 90, category: 'Status', priority: 0 },
    'thunder-wave': { name: 'Thunder Wave', type: 'Electric', power: 0, accuracy: 90, category: 'Status', priority: 0 },
    'stun-spore': { name: 'Stun Spore', type: 'Grass', power: 0, accuracy: 75, category: 'Status', priority: 0 },
    'glare': { name: 'Glare', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    // Protection
    'protect': { name: 'Protect', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 4 },
    'detect': { name: 'Detect', type: 'Fighting', power: 0, accuracy: 100, category: 'Status', priority: 4 },
    // Weather
    'sunny-day': { name: 'Sunny Day', type: 'Fire', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'rain-dance': { name: 'Rain Dance', type: 'Water', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'sandstorm': { name: 'Sandstorm', type: 'Rock', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'snowscape': { name: 'Snowscape', type: 'Ice', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'hail': { name: 'Hail', type: 'Ice', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    // Hazards
    'stealth-rock': { name: 'Stealth Rock', type: 'Rock', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'spikes': { name: 'Spikes', type: 'Ground', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'toxic-spikes': { name: 'Toxic Spikes', type: 'Poison', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'sticky-web': { name: 'Sticky Web', type: 'Bug', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    // Screens
    'reflect': { name: 'Reflect', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'light-screen': { name: 'Light Screen', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'aurora-veil': { name: 'Aurora Veil', type: 'Ice', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    // Utility
    'substitute': { name: 'Substitute', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'leech-seed': { name: 'Leech Seed', type: 'Grass', power: 0, accuracy: 90, category: 'Status', priority: 0 },
    'taunt': { name: 'Taunt', type: 'Dark', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'encore': { name: 'Encore', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'trick': { name: 'Trick', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'switcheroo': { name: 'Switcheroo', type: 'Dark', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'haze': { name: 'Haze', type: 'Ice', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'whirlwind': { name: 'Whirlwind', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: -6 },
    'roar': { name: 'Roar', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: -6 },
    'wish': { name: 'Wish', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'healing-wish': { name: 'Healing Wish', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'lunar-dance': { name: 'Lunar Dance', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'pain-split': { name: 'Pain Split', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'destiny-bond': { name: 'Destiny Bond', type: 'Ghost', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'perish-song': { name: 'Perish Song', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'curse': { name: 'Curse', type: 'Ghost', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'teleport': { name: 'Teleport', type: 'Psychic', power: 0, accuracy: 100, category: 'Status', priority: -6 },
    'defog': { name: 'Defog', type: 'Flying', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'memento': { name: 'Memento', type: 'Dark', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    // Stat drops (status)
    'charm': { name: 'Charm', type: 'Fairy', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'fake-tears': { name: 'Fake Tears', type: 'Dark', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'screech': { name: 'Screech', type: 'Normal', power: 0, accuracy: 85, category: 'Status', priority: 0 },
    'metal-sound': { name: 'Metal Sound', type: 'Steel', power: 0, accuracy: 85, category: 'Status', priority: 0 },
    'scary-face': { name: 'Scary Face', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'growl': { name: 'Growl', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'leer': { name: 'Leer', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'tail-whip': { name: 'Tail Whip', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'string-shot': { name: 'String Shot', type: 'Bug', power: 0, accuracy: 95, category: 'Status', priority: 0 },
    'sweet-scent': { name: 'Sweet Scent', type: 'Normal', power: 0, accuracy: 100, category: 'Status', priority: 0 },
    'parting-shot': { name: 'Parting Shot', type: 'Dark', power: 0, accuracy: 100, category: 'Status', priority: 0 },
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
    'Focus Sash': { name: 'Focus Sash', desc: 'If at full HP, survives one hit with 1 HP. Single use.' },
    'Heavy-Duty Boots': { name: 'Heavy-Duty Boots', desc: 'Holder bypasses entry hazards on switch-in.' },
    'Assault Vest': { name: 'Assault Vest', desc: '1.5x Sp. Def but cannot use Status moves.' },
    'Eviolite': { name: 'Eviolite', desc: '1.5x Def and Sp. Def for not-fully-evolved Pokémon.' },
    'Rocky Helmet': { name: 'Rocky Helmet', desc: 'Contact moves deal 1/6 max HP to the attacker.' },
    'Air Balloon': { name: 'Air Balloon', desc: 'Immune to Ground-type moves. Pops when hit.' },
    'Expert Belt': { name: 'Expert Belt', desc: '1.2x damage on super effective hits.' },
    'Black Sludge': { name: 'Black Sludge', desc: 'Poison types heal 1/16 HP per turn. Others lose 1/8.' },
    'Toxic Orb': { name: 'Toxic Orb', desc: 'Badly poisons the holder at end of turn.' },
    'Flame Orb': { name: 'Flame Orb', desc: 'Burns the holder at end of turn.' },
    'Sitrus Berry': { name: 'Sitrus Berry', desc: 'Heals 25% HP when falling below 50%. Single use.' },
    'Lum Berry': { name: 'Lum Berry', desc: 'Cures any status condition. Single use.' },
    'White Herb': { name: 'White Herb', desc: 'Restores negative stat drops. Single use.' },
    'Light Clay': { name: 'Light Clay', desc: 'Extends Reflect/Light Screen/Aurora Veil to 8 turns.' },
    'Mental Herb': { name: 'Mental Herb', desc: 'Cures Encore/Taunt/Disable. Single use.' },
    'Weakness Policy': { name: 'Weakness Policy', desc: 'When hit super effectively, raises Atk and SpA by 2. Single use.' },
    'Booster Energy': { name: 'Booster Energy', desc: 'Raises highest stat for Paradox Pokémon.' },
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
