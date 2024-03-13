let card;


function renderPokemonCard(data) {
  let pokedexElement = document.getElementById('pokedex');
 let type = data['types'][0]['type']['name'];
  let typeClass = `type-${type.toLowerCase()}`;
  card = document.createElement('div');
  card.classList.add('card');
  card.addEventListener('click', function () { openCard(data.id); });
 card.innerHTML = `
 <h1 class="pokemonName">${capitalizeFirstLetter(data['name'])}</h1>
 <div class="box" >
 <img class="moves" src="${data['sprites']['other']['official-artwork']['front_default']}" alt="Pokémon">
 </div>
 <div class="pokemonInfo"> 
 <p class="ability">Ability: ${data['abilities'][0]['ability']['name']}</p>
 <p class="type  ${typeClass}">Type: ${data['types'][0]['type']['name']}</p>
 <p class="baseExperience">Base Experience: ${data['base_experience']}</p>
 <p class="weight">Weight: ${data['weight']}</p>
 </div>
 `;

  pokedexElement.appendChild(card);
}




function openCard(id) {
  let pokemon = pokemonData.find(p => p.id === id);
  if (pokemon) {
    modalContent.innerHTML = `
      <div class="card-details">
  <div class="card-image">
    <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="Pokémon">
  </div>
  <div class="card-info">
    <h1 class="pokemonName">${capitalizeFirstLetter(pokemon.name)}</h1>
    <p class="pokemonOrder">Order: ${pokemon['order']}</p>
    <p class="pokemonHeight">Height: ${pokemon['height']}</p>
    <p class="pokemonWeight">Weight: ${pokemon['weight']}</p>
    <p class="pokemonAbility">Ability: ${pokemon['abilities'][0]['ability']['name']}</p>
    <p class="pokemonType">Type: ${pokemon['types'][0]['type']['name']}</p>
    <div class="pokemonNav">
      <button class="navButton" onclick="switchTab('baseStats')">Base Stats</button>
      <button class="navButton" onclick="switchTab('moves')">Moves</button>
      <button class="navButton" onclick="switchTab('types')">Types</button>
    </div>
    <div id="baseStatsTab" class="pokemonTab baseStatsTab active">
      <h3>Base Stats:</h3>
      <ul class="baseStatsList">
        ${renderBaseStats(pokemon['stats'])}
      </ul>
    </div>
    <div id="movesTab" class="pokemonTab movesTab">
      <h3>Moves:</h3>
      <div class="moveListContainer">
        ${renderMoves(pokemon['moves'])}
      </div>
    </div>
    <div id="typesTab" class="pokemonTab typesTab">
      <h3>Types:</h3>
      <p class="pokemonTypes">${renderTypes(pokemon['types'])}</p>
    </div>
  </div>
</div>
      `;

    let overlay = document.getElementById('overlay');
    let modal = document.getElementById('modal');
    overlay.style.display = 'block';
    modal.style.display = 'block';
  } else {
    modalContent.innerHTML = `
        <div class="card-details">
          <p class="info-text">Es tut uns leid, aber wir konnten keine Daten für dieses Pokemon finden.</p>
        </div>
      `;
  }
}
