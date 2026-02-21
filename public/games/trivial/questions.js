// donmitx Trivial — Massive Decoupled Question Bank
// Categories: Lady Gaga, Egyptian beetles, paleontology, technology, astrophysics, Dr. House, new metal, Pedro Sánchez, (bingus, floppa, and soba), piercings, lore pokemon mundo misterioso, festividades, genetica, cultura asiatica, epstein; paco leon, physics, quantum physics, psychology, philosophy, entertainment

// Each question object has:
// q: The question string
// a: Array of 4 answer strings (the first answer, a[0], is ALWAYS the correct one in this database).
//    The game engine will shuffle the 'a' array dynamically before showing it to players.
// cat: Category string
// type: 'standard' or 'comparative'

export const TRIVIAL_CATEGORIES = [
    { id: "lady_gaga", name: "Lady Gaga" },
    { id: "egyptian_beetles", name: "Egyptian Beetles" },
    { id: "paleontology", name: "Paleontology" },
    { id: "technology", name: "Technology" },
    { id: "astrophysics", name: "Astrophysics" },
    { id: "dr_house", name: "Dr. House" },
    { id: "new_metal", name: "Nu Metal" },
    { id: "pedro_sanchez", name: "Pedro Sánchez" },
    { id: "cats", name: "Bingus, Floppa & Soba" },
    { id: "piercings", name: "Piercings" },
    { id: "pokemon_misterioso", name: "Lore Pokémon Mundo Misterioso" },
    { id: "festividades", name: "Festividades" },
    { id: "genetica", name: "Genética" },
    { id: "cultura_asiatica", name: "Cultura Asiática" },
    { id: "epstein", name: "Jeffrey Epstein" },
    { id: "paco_leon", name: "Paco León" },
    { id: "physics", name: "Physics" },
    { id: "quantum_physics", name: "Quantum Physics" },
    { id: "psychology", name: "Psychology" },
    { id: "philosophy", name: "Philosophy" },
    { id: "entertainment", name: "Entertainment" }
];

export const ALL_QUESTIONS = [
    // --- Lady Gaga ---
    { q: "What is Lady Gaga's real birth name?", a: ["Stefani Joanne Angelina Germanotta", "Robyn Fenty", "Elizabeth Grant", "Ashley Nicolette Frangipane"], cat: "lady_gaga", type: "standard" },
    { q: "Which Lady Gaga album features the song 'Bad Romance'?", a: ["The Fame Monster", "Born This Way", "Artpop", "Chromatica"], cat: "lady_gaga", type: "standard" },
    { q: "In what year did Lady Gaga wear her infamous 'meat dress' to the MTV Video Music Awards?", a: ["2010", "2008", "2012", "2015"], cat: "lady_gaga", type: "standard" },
    { q: "Which character did Lady Gaga play in 'American Horror Story: Hotel'?", a: ["The Countess", "Scáthach", "Madison Montgomery", "Sister Jude"], cat: "lady_gaga", type: "standard" },
    { q: "What was Lady Gaga's first number-one single on the Billboard Hot 100?", a: ["Just Dance", "Poker Face", "Born This Way", "Applause"], cat: "lady_gaga", type: "standard" },

    // --- Egyptian Beetles ---
    { q: "Which beetle was heavily revered in ancient Egypt as a symbol of the sun god Ra?", a: ["Scarabaeus sacer (Dung beetle)", "Stag beetle", "Goliath beetle", "Ladybug"], cat: "egyptian_beetles", type: "standard" },
    { q: "What action of the dung beetle did ancient Egyptians associate with the sun moving across the sky?", a: ["Rolling balls of dung", "Flying towards the sun", "Digging deep burrows", "Shedding its exoskeleton"], cat: "egyptian_beetles", type: "standard" },
    { q: "The Egyptian god often depicted with the head of a scarab beetle is named...", a: ["Khepri", "Anubis", "Osiris", "Thoth"], cat: "egyptian_beetles", type: "standard" },
    { q: "What material were ancient Egyptian 'heart scarabs', placed on mummies, most commonly carved from?", a: ["Green stone (like green jasper)", "Lapis lazuli", "Pure gold", "Obsidian"], cat: "egyptian_beetles", type: "standard" },
    { q: "In Egyptian mythology, what is the scarab beetle primarily a symbol of?", a: ["Rebirth and regeneration", "Death and decay", "War and destruction", "Love and fertility"], cat: "egyptian_beetles", type: "standard" },

    // --- Paleontology ---
    { q: "During which geological period did the Tyrannosaurus Rex actually live?", a: ["Cretaceous", "Jurassic", "Triassic", "Permian"], cat: "paleontology", type: "standard" },
    { q: "Which of these came first in the fossil record?", a: ["Trilobites", "Dinosaurs", "Mammals", "Flowering plants"], cat: "paleontology", type: "comparative" },
    { q: "What is the famous transitional fossil often cited as a link between dinosaurs and modern birds?", a: ["Archaeopteryx", "Pteranodon", "Dimetrodon", "Smilodon"], cat: "paleontology", type: "standard" },
    { q: "Which mass extinction event wiped out the non-avian dinosaurs?", a: ["The K-T (or K-Pg) extinction", "The Permian-Triassic extinction", "The Late Devonian extinction", "The Ordovician-Silurian extinction"], cat: "paleontology", type: "standard" },
    { q: "What is Coprolite?", a: ["Fossilized feces", "Fossilized tree sap", "A type of dinosaur egg", "A mineralized bone structure"], cat: "paleontology", type: "standard" },

    // --- Technology ---
    { q: "Who is generally credited as the inventor of the World Wide Web?", a: ["Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Al Gore"], cat: "technology", type: "standard" },
    { q: "What does 'CPU' stand for in computing?", a: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing Unit"], cat: "technology", type: "standard" },
    { q: "Which company acquired GitHub in 2018?", a: ["Microsoft", "Google", "Amazon", "Facebook"], cat: "technology", type: "standard" },
    { q: "What is the primary function of a Motherboard?", a: ["To connect and allow communication between electronic components", "To process graphical calculations exclusively", "To store permanent user files", "To provide physical power from the wall"], cat: "technology", type: "standard" },
    { q: "Which programming language was created by Brendan Eich in just 10 days in 1995?", a: ["JavaScript", "Python", "Java", "C++"], cat: "technology", type: "standard" },

    // --- Astrophysics ---
    { q: "What is the boundary around a black hole beyond which nothing can escape called?", a: ["Event Horizon", "Schwarzschild Radius", "Singularity", "Accretion Disk"], cat: "astrophysics", type: "standard" },
    { q: "Which is older?", a: ["The Universe", "The Earth", "The Sun", "The Milky Way galaxy"], cat: "astrophysics", type: "comparative" },
    { q: "Which is bigger in physical volume?", a: ["A Red Supergiant star", "A White Dwarf", "A Neutron Star", "Earth"], cat: "astrophysics", type: "comparative" },
    { q: "What phenomenon theoretically connects two disparate points in spacetime?", a: ["A Wormhole", "A Supernova", "A Pulsar", "A Quasar"], cat: "astrophysics", type: "standard" },
    { q: "What hypothetical energy is believed to be causing the universe's expansion to accelerate?", a: ["Dark Energy", "Dark Matter", "Antimatter", "Zero-point energy"], cat: "astrophysics", type: "standard" },

    // --- Dr. House ---
    { q: "What is Dr. Gregory House's medical specialty?", a: ["Infectious Disease and Nephrology", "Cardiology and Oncology", "Neurology and Surgery", "Pediatrics and Immunology"], cat: "dr_house", type: "standard" },
    { q: "What is House's famous mantra regarding patients?", a: ["Everybody lies", "Do no harm", "Trust your gut", "Patients are idiots"], cat: "dr_house", type: "standard" },
    { q: "Which hospital does Dr. House work at during the majority of the series?", a: ["Princeton-Plainsboro Teaching Hospital", "Seattle Grace Hospital", "County General Hospital", "Sacred Heart Hospital"], cat: "dr_house", type: "standard" },
    { q: "What pill is Dr. House famously addicted to?", a: ["Vicodin", "Adderall", "OxyContin", "Xanax"], cat: "dr_house", type: "standard" },
    { q: "Who is Dr. House's best (and arguably only) real friend?", a: ["Dr. James Wilson", "Dr. Lisa Cuddy", "Dr. Eric Foreman", "Dr. Robert Chase"], cat: "dr_house", type: "standard" },

    // --- Nu Metal ---
    { q: "Which band is widely considered to have released the first foundational Nu Metal album in 1994?", a: ["Korn (with 'Korn')", "Limp Bizkit (with 'Three Dollar Bill, Y'all')", "Linkin Park (with 'Hybrid Theory')", "Slipknot (with 'Slipknot')"], cat: "new_metal", type: "standard" },
    { q: "What is the name of Linkin Park's highly successful debut album?", a: ["Hybrid Theory", "Meteora", "Minutes to Midnight", "Living Things"], cat: "new_metal", type: "standard" },
    { q: "Which of these Nu Metal bands famously wears masks on stage?", a: ["Slipknot", "System of a Down", "Mudvayne", "Deftones"], cat: "new_metal", type: "standard" },
    { q: "Who is the lead vocalist of Limp Bizkit?", a: ["Fred Durst", "Jonathan Davis", "Corey Taylor", "Chino Moreno"], cat: "new_metal", type: "standard" },
    { q: "System of a Down's breakthrough hit 'Chop Suey!' is on which album?", a: ["Toxicity", "Steal This Album!", "Mezmerize", "System of a Down"], cat: "new_metal", type: "standard" },

    // --- Pedro Sánchez ---
    { q: "Which political party does Pedro Sánchez belong to?", a: ["PSOE (Spanish Socialist Workers' Party)", "PP (People's Party)", "Vox", "Podemos"], cat: "pedro_sanchez", type: "standard" },
    { q: "In what year did Pedro Sánchez successfully lead a vote of no confidence to become Prime Minister of Spain?", a: ["2018", "2015", "2019", "2020"], cat: "pedro_sanchez", type: "standard" },
    { q: "What is Pedro Sánchez's academic background?", a: ["Doctorate in Economics", "Law Degree", "Medical Degree", "Engineering Degree"], cat: "pedro_sanchez", type: "standard" },
    { q: "Who did Pedro Sánchez replace as Prime Minister in 2018?", a: ["Mariano Rajoy", "José Luis Rodríguez Zapatero", "José María Aznar", "Pablo Iglesias"], cat: "pedro_sanchez", type: "standard" },
    { q: "Pedro Sánchez wrote a book published in 2019. What is its title?", a: ["Manual de resistencia", "Mi visión para España", "El camino socialista", "Diario de un presidente"], cat: "pedro_sanchez", type: "standard" },

    // --- Bingus, Floppa & Soba ---
    { q: "What breed of hairless cat is the famous internet meme 'Bingus'?", a: ["Sphynx", "Peterbald", "Bambino", "Donskoy"], cat: "cats", type: "standard" },
    { q: "What specific type of wild cat is 'Big Floppa' (whose real name is Gregory)?", a: ["Caracal", "Serval", "Bobcat", "Ocelot"], cat: "cats", type: "standard" },
    { q: "Which feline internet phenomenon usually features a cat with highly saturated, contrasting ears?", a: ["Bingus", "Floppa", "Soba", "Sogga"], cat: "cats", type: "standard" },
    { q: "In meme culture, Floppa is often associated with liking which food?", a: ["Dumplings", "Lasagna", "Fish sticks", "Cheeseburgers"], cat: "cats", type: "standard" },
    { q: "Which is physically larger?", a: ["A Caracal (Floppa)", "A Sphynx cat (Bingus)", "A standard house cat (Soba)", "A Chihuahua"], cat: "cats", type: "comparative" },

    // --- Piercings ---
    { q: "A 'Septum' piercing goes through what part of the body?", a: ["The cartilage dividing the nostrils", "The belly button", "The upper ear cartilage", "The tongue"], cat: "piercings", type: "standard" },
    { q: "Which piercing involves placing a bar straight through the top cartilage of the ear in two places?", a: ["Industrial", "Daith", "Tragus", "Helix"], cat: "piercings", type: "standard" },
    { q: "What is a 'Prince Albert' piercing?", a: ["A male genital piercing", "A type of eyebrow piercing", "A double lip piercing", "A piercing on the back of the neck"], cat: "piercings", type: "standard" },
    { q: "A 'Medusa' piercing is located where?", a: ["In the philtrum, centrally above the upper lip", "On the side of the nose", "Below the bottom lip", "On the tragus of the ear"], cat: "piercings", type: "standard" },
    { q: "Which of these ear piercings is known in anecdotal folklore to help relieve migraines?", a: ["Daith", "Lobe", "Rook", "Conch"], cat: "piercings", type: "standard" },

    // --- Lore Pokémon Mundo Misterioso ---
    { q: "In Pokémon Mystery Dungeon: Explorers of Time/Darkness, who actually caused the paralysis of the planet?", a: ["Darkrai", "Dialga", "Grovyle", "Dusknoir"], cat: "pokemon_misterioso", type: "standard" },
    { q: "Who is the human-turned-Pokémon's long lost partner from the future in Explorers of Sky?", a: ["Grovyle", "Celebi", "Dusknoir", "Lucario"], cat: "pokemon_misterioso", type: "standard" },
    { q: "In the original Rescue Team games, what disaster are you blamed for causing?", a: ["The curse of Ninetales upsetting the world's balance", "Stealing the Time Gears", "Destroying the Meteor", "Awakening Rayquaza"], cat: "pokemon_misterioso", type: "standard" },
    { q: "What is the name of the guild you join in Explorers of Time/Darkness/Sky?", a: ["Wigglytuff's Guild", "Alakazam's Team ACT", "The Expedition Society", "Team Skull"], cat: "pokemon_misterioso", type: "standard" },
    { q: "In Super Pokémon Mystery Dungeon, what is turning Pokémon into stone?", a: ["Dark Matter", "The Bittercold", "Yveltal", "Hoopa"], cat: "pokemon_misterioso", type: "standard" },

    // --- Festividades ---
    { q: "Which of these came first historically?", a: ["Saturnalia", "Christmas", "Halloween", "Valentine's Day"], cat: "festividades", type: "comparative" },
    { q: "La Tomatina, a massive tomato fight festival, is held in which country?", a: ["Spain", "Italy", "Mexico", "Portugal"], cat: "festividades", type: "standard" },
    { q: "Día de los Muertos is primarily celebrated in which country?", a: ["Mexico", "Brazil", "Spain", "Colombia"], cat: "festividades", type: "standard" },
    { q: "What does the Jewish holiday of Hanukkah commemorate?", a: ["The rededication of the Second Temple in Jerusalem", "The exodus from Egypt", "The creation of the world", "The giving of the Torah"], cat: "festividades", type: "standard" },
    { q: "The spectacular Carnival of Venice is famous for what specific attire?", a: ["Elaborate masks", "Feathered headdresses", "Body painting", "Flower crowns"], cat: "festividades", type: "standard" },

    // --- Genética ---
    { q: "Who is known as the 'father of modern genetics' for his work with pea plants?", a: ["Gregor Mendel", "Charles Darwin", "James Watson", "Francis Crick"], cat: "genetica", type: "standard" },
    { q: "What does DNA stand for?", a: ["Deoxyribonucleic Acid", "Dynamic Nuclear Assembly", "Deoxygenated Ribosome Acid", "Di-Nucleic Ammonia"], cat: "genetica", type: "standard" },
    { q: "How many pairs of chromosomes does a typical human cell have?", a: ["23", "46", "21", "24"], cat: "genetica", type: "standard" },
    { q: "CRISPR-Cas9 is a revolutionary technology for what purpose?", a: ["Gene editing", "Cloning whole organisms", "Sequencing extinct DNA", "Synthesizing artificial proteins"], cat: "genetica", type: "standard" },
    { q: "If a person has two identical alleles for a particular trait, they are...", a: ["Homozygous", "Heterozygous", "Polyploid", "Mutated"], cat: "genetica", type: "standard" },

    // --- Cultura Asiática ---
    { q: "Which philosophy deeply influenced traditional Chinese society and emphasizes filial piety?", a: ["Confucianism", "Zen Buddhism", "Shinto", "Daoism"], cat: "cultura_asiatica", type: "standard" },
    { q: "What is the traditional Japanese garment worn during summer festivals, known to be a casual cotton kimono?", a: ["Yukata", "Hanbok", "Cheongsam", "Sari"], cat: "cultura_asiatica", type: "standard" },
    { q: "Which Asian country is the origin of the martial art Taekwondo?", a: ["South Korea", "Japan", "China", "Thailand"], cat: "cultura_asiatica", type: "standard" },
    { q: "What is the largest religious monument in the world, located in Cambodia?", a: ["Angkor Wat", "The Taj Mahal", "The Great Wall", "Borobudur"], cat: "cultura_asiatica", type: "standard" },
    { q: "Bollywood is the informal term for the film industry of which country?", a: ["India", "Pakistan", "Bangladesh", "Nepal"], cat: "cultura_asiatica", type: "standard" },

    // --- Jeffrey Epstein ---
    { q: "What island did Jeffrey Epstein own in the US Virgin Islands, infamously dubbed 'Little St. James'?", a: ["Little St. James", "Epstein Island", "St. Thomas", "St. John"], cat: "epstein", type: "standard" },
    { q: "Who was Jeffrey Epstein's associate who was convicted of sex trafficking in 2021?", a: ["Ghislaine Maxwell", "Virginia Giuffre", "Sarah Kellen", "Nadia Marcinkova"], cat: "epstein", type: "standard" },
    { q: "In what year did Jeffrey Epstein die in a Manhattan jail cell?", a: ["2019", "2018", "2020", "2017"], cat: "epstein", type: "standard" },
    { q: "What was Jeffrey Epstein's primary professional occupation earlier in his career?", a: ["Financier / Hedge Fund Manager", "Tech CEO", "Real Estate Developer", "Hollywood Producer"], cat: "epstein", type: "standard" },
    { q: "Which prominent British royal was heavily implicated in the Epstein scandal?", a: ["Prince Andrew", "Prince Charles", "Prince Harry", "Prince William"], cat: "epstein", type: "standard" },

    // --- Paco León ---
    { q: "In the famous Spanish series 'Aída', what character did Paco León play?", a: ["El Luisma", "Chema", "Mauricio Colmenero", "Jonathan"], cat: "paco_leon", type: "standard" },
    { q: "Paco León directed the highly successful film 'Carmina o revienta', which stars his real-life mother. What is her name?", a: ["Carmina Barrios", "María León", "Carmen Machi", "Ana Polvorosa"], cat: "paco_leon", type: "standard" },
    { q: "Which of these TV series did Paco León create and direct?", a: ["Arde Madrid", "La casa de papel", "Élite", "El ministerio del tiempo"], cat: "paco_leon", type: "standard" },
    { q: "Who is Paco León's sister, also a highly famous Spanish actress?", a: ["María León", "Blanca Suárez", "Ursula Corberó", "Penélope Cruz"], cat: "paco_leon", type: "standard" },
    { q: "What controversial Netflix film did Paco León direct in 2022, inspired by The Wizard of Oz?", a: ["Rainbow", "Kiki, el amor se hace", "Toc Toc", "Embarazados"], cat: "paco_leon", type: "standard" },

    // --- Physics ---
    { q: "Who developed the three laws of motion?", a: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Johannes Kepler"], cat: "physics", type: "standard" },
    { q: "Which of these is fundamental force of nature is the weakest?", a: ["Gravity", "Electromagnetism", "The strong nuclear force", "The weak nuclear force"], cat: "physics", type: "comparative" },
    { q: "The equation E=mc² asserts that energy and mass are interchangeable. What does 'c' stand for?", a: ["The speed of light in a vacuum", "Cosmological constant", "Carbon content", "Centrifugal force"], cat: "physics", type: "standard" },
    { q: "What is the term for a theoretical state of matter reached at temperatures close to absolute zero?", a: ["Bose-Einstein condensate", "Plasma", "Superfluidity", "Neutronium"], cat: "physics", type: "standard" },
    { q: "What is the SI unit of Force?", a: ["Newton", "Joule", "Watt", "Pascal"], cat: "physics", type: "standard" },

    // --- Quantum Physics ---
    { q: "Schrödinger's cat is a thought experiment utilized to illustrate what quantum concept?", a: ["Superposition", "Quantum Entanglement", "The Uncertainty Principle", "Wave-particle duality"], cat: "quantum_physics", type: "standard" },
    { q: "Which principle states that you cannot simultaneously know the exact position and momentum of a particle?", a: ["Heisenberg's Uncertainty Principle", "Pauli Exclusion Principle", "Bohr's Complementarity Principle", "Planck's Law"], cat: "quantum_physics", type: "standard" },
    { q: "What do physicists call the fundamental particle of light?", a: ["Photon", "Gluon", "Boson", "Tachyon"], cat: "quantum_physics", type: "standard" },
    { q: "What phenomenon occurs when pairs of particles interact in such a way that the quantum state of each particle cannot be described independently of the state of the others?", a: ["Quantum Entanglement", "Quantum Tunneling", "Superposition", "Decoherence"], cat: "quantum_physics", type: "standard" },
    { q: "Which subatomic particle is the famous 'God particle' referring to?", a: ["The Higgs Boson", "The Quark", "The Neutrino", "The Muon"], cat: "quantum_physics", type: "standard" },

    // --- Psychology ---
    { q: "Who is the founder of classical psychoanalysis?", a: ["Sigmund Freud", "Carl Jung", "B.F. Skinner", "John B. Watson"], cat: "psychology", type: "standard" },
    { q: "In Maslow's hierarchy of needs, what is the highest level of psychological development?", a: ["Self-actualization", "Self-esteem", "Belongingness", "Safety needs"], cat: "psychology", type: "standard" },
    { q: "The famous 'Stanford prison experiment', illustrating the power of roles, was conducted by whom?", a: ["Philip Zimbardo", "Stanley Milgram", "Solomon Asch", "Albert Bandura"], cat: "psychology", type: "standard" },
    { q: "What psychological concept describes the phenomenon where people adopt the behavior of others to fit in?", a: ["Conformity", "Cognitive Dissonance", "Confirmation Bias", "Groupthink"], cat: "psychology", type: "standard" },
    { q: "Ivan Pavlov is famous for his experiments on classical conditioning involving what animal?", a: ["Dogs", "Rats", "Pigeons", "Monkeys"], cat: "psychology", type: "standard" },

    // --- Philosophy ---
    { q: "Who is often considered the founder of Western philosophy and famously drank hemlock?", a: ["Socrates", "Plato", "Aristotle", "Pythagoras"], cat: "philosophy", type: "standard" },
    { q: "Which philosopher authored the text 'Beyond Good and Evil' and famously declared 'God is dead'?", a: ["Friedrich Nietzsche", "Immanuel Kant", "René Descartes", "Jean-Paul Sartre"], cat: "philosophy", type: "standard" },
    { q: "The Allegory of the Cave is a philosophical concept presented by...", a: ["Plato", "Socrates", "Aristotle", "Epicurus"], cat: "philosophy", type: "standard" },
    { q: "René Descartes is famous for the statement 'Cogito, ergo sum', which translates to what?", a: ["I think, therefore I am", "Knowledge is power", "Seize the day", "To be or not to be"], cat: "philosophy", type: "standard" },
    { q: "Which philosophical school of thought, popularized by Marcus Aurelius, emphasizes rationality and self-control to achieve inner peace?", a: ["Stoicism", "Nihilism", "Existentialism", "Hedonism"], cat: "philosophy", type: "standard" },

    // --- Entertainment ---
    { q: "Which film holds the record for the highest-grossing movie of all time (unadjusted for inflation)?", a: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], cat: "entertainment", type: "standard" },
    { q: "What is the name of the fictional continent where most of 'Game of Thrones' takes place?", a: ["Westeros", "Middle-earth", "Narnia", "Essos"], cat: "entertainment", type: "standard" },
    { q: "Which video game console is the best-selling of all time?", a: ["PlayStation 2", "Nintendo DS", "PlayStation 4", "Nintendo Switch"], cat: "entertainment", type: "standard" },
    { q: "Who holds the record for the most Grammy Awards won in history?", a: ["Beyoncé", "Michael Jackson", "The Beatles", "Stevie Wonder"], cat: "entertainment", type: "standard" },
    { q: "Which animated television show features the characters Homer, Marge, Bart, Lisa, and Maggie?", a: ["The Simpsons", "Family Guy", "South Park", "Futurama"], cat: "entertainment", type: "standard" }
];
