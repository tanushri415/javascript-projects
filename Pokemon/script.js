const imgContainer = document.querySelector('#poke-con img');
const pokeName = document.getElementById('name');
const pokeWeight = document.getElementById('weight');
const pokeHeight = document.getElementById('height');
const pokeSpecies = document.getElementById('species');
const abilitiesList = document.getElementById('abilities-list');
const getPokeBtn = document.getElementById('get-poke-button');

// utility functions

function setImgSrcAndAlt(imgEL, imgSrc, imgAlt) {
  imgEL.src = imgSrc;
  imgEL.alt = imgAlt;
}

// pageor app-specific functions

function createBasicInfoUI(pokemon) {
  pokeName.innerText = `Name: ${pokemon.name}`;
  pokeWeight.innerText = `Weight: ${pokemon.weight}`;
  pokeHeight.innerText = `Height: ${pokemon.height}`;
  pokeSpecies.innerText = `Species: ${pokemon.species.name}`;
}

function createAbilitiesUI(abilitiesArr) {
  let abilitiesString = '';
  abilitiesArr.forEach(
    (ability) => (abilitiesString += `<li>${ability.ability.name}</li>`)
  );
  abilitiesList.innerHTML = abilitiesString;
}

function createBasicPokeProfile(pokemon) {
  setImgSrcAndAlt(
    imgContainer,
    pokemon.sprites.other['official-artwork'].front_default,
    pokemon.name
  );
  createBasicInfoUI(pokemon);
  createAbilitiesUI(pokemon.abilities);
}

function getRandomPokeAndCreateProfile() {
  const randomPokeIndex = Math.floor(Math.random() * 1000 + 1);

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeIndex}`)
    .then((res) => res.json())
    .then((json) => {
      const pokemon = json;
      createBasicPokeProfile(pokemon);
    })
    .catch((err) => console.log(err));
}

getRandomPokeAndCreateProfile();

getPokeBtn.addEventListener('click', getRandomPokeAndCreateProfile);
