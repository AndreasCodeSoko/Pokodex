let pokemonData = [];
let currentCardIndex = 0;

async function loadPokemon() {
    try {
        let startingId = 1;
        let numberOfPokemon = 20;
        for (let i = startingId; i < startingId + numberOfPokemon; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            let data = await response.json();
            pokemonData.push(data);
            renderPokemonCard(data, i);
        }
    } catch (error) {
        console.log('Error loading pokemon', error);
    }
}



function searchPokemon() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let matches = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));
    let pokedexElement = document.getElementById('pokedex');
    pokedexElement.innerHTML = '';
    matches.forEach(pokemon => {
        renderPokemonCard(pokemon);
    });
}


function switchTab(tabName) {
    let tabs = {
        'baseStats': ['block', 'none', 'none'],
        'moves': ['none', 'block', 'none'],
        'types': ['none', 'none', 'block']
    };
    let [baseStatsDisplay, movesDisplay, typesDisplay] = tabs[tabName];
    let baseStatsTab = document.getElementById('baseStatsTab');
    let movesTab = document.getElementById('movesTab');
    let typesTab = document.getElementById('typesTab');
    baseStatsTab.style.display = baseStatsDisplay;
    movesTab.style.display = movesDisplay;
    typesTab.style.display = typesDisplay;
}


function renderTypes(types) {
    let typesHTML = '';
    types.forEach(type => {
        typesHTML += `<span class="pokemonType">${type['type']['name']}</span>`;
    });
    return typesHTML;
}


function renderBaseStats(stats) {
    let baseStatsHTML = '';
    stats.forEach(stat => {
        baseStatsHTML += `<li>${stat['stat']['name']}: ${stat['base_stat']}</li>`;
    });
    return baseStatsHTML;
}

function renderMoves(moves) {
    let movesHTML = '';
    for (let i = 0; i < Math.min(moves.length,); i++) {
        movesHTML += `<div class="move">${moves[i]['move']['name']}</div>`;
    }
    return movesHTML;
}


function closeCard() {
    let overlay = document.getElementById('overlay');
    let modal = document.getElementById('modal');
    overlay.style.display = 'none';
    modal.style.display = 'none';
}

function showPreviousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        openCard(currentCardIndex);
    }
}

function showNextCard() {
    if (currentCardIndex < pokemonData.length - 1) {
        currentCardIndex++;
        openCard(currentCardIndex);
    }
}

function capitalizeFirstLetter(string) {
    return (typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : '');
}

function searchPokemon() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let matches = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));
    let pokedexElement = document.getElementById('pokedex');
    pokedexElement.innerHTML = '';
    matches.forEach(pokemon => {
        renderPokemonCard(pokemon);
    });
}

function loadMorePokemon() {
    let startingId = pokemonData.length + 1;
    let numberOfPokemon = 10;
    loadPokemonRange(startingId, startingId + numberOfPokemon);
}

async function loadPokemonRange(start, end) {
    try {
        for (let i = start; i < end; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            let data = await response.json();
            pokemonData.push(data);
            console.log('Loaded pokemon', data);
            renderPokemonCard(data, i);
        }
    } catch (error) {
        console.log('Error loading pokemon', error);
    }
}

document.getElementById('searchInput').addEventListener('input', searchPokemon);

function reloadPage() {
    location.reload();
}