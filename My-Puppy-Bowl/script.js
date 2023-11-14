const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2308-FTB-MT-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const playersAPI = `${APIURL}/players`;
/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */

const fetchAllPlayers = async () => {
  try {
    const res = await fetch(`${playersAPI}`);
    const json = await res.json();
    console.log(json);
    return json.data.players;
  } catch (err) {
    console.error('Uh oh, trouble fetching players!', err);
  }
};

const createDetailedPlayerCard = (player) => {
  try {
    const rootElement = document.createElement('div');
    rootElement.classList.add('player-card');
    rootElement.innerHTML = `
    <div class='player-detail-header'>
      <h2>${player.name}</h2>
      <p><strong>#${player.id}</strong></p>
    </div>
    <h4>${player.breed}</h4>
    <img src='${player.imageUrl}' class='player-image' />
    <button class="back-btn">Back to All Players</button>`;

    const backBtn = rootElement.querySelector('.back-btn');
    backBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      init();
    });
    return rootElement;
  } catch (error) {
    console.error('');
  }
};

const createPlayerCard = (player) => {
  try {
    const rootElement = document.createElement('div');
    rootElement.classList.add('player-card');
    rootElement.innerHTML = `
    <h2>${player.name}</h2>
    <img src='${player.imageUrl}' class='player-image' />
    <button class="details-btn" data-id="${player.id}">See Details</button>
    <button class="rmv-btn" data-id="${player.id}">Remove Player</button>`;

    const detailsBtn = rootElement.querySelector('.details-btn');
    detailsBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      const playerId = event.target.dataset.id;
      await renderSinglePlayer(playerId);
    });

    const removeBtn = rootElement.querySelector('.rmv-btn');
    removeBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      const playerId = event.target.dataset.id;
      await removePlayer(playerId);
      init();
    });
    return rootElement;
  } catch (error) {
    console.error(error);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const resp = await fetch(`${playersAPI}/${playerId}`);
    const json = await resp.json();
    return json.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${playersAPI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerObj),
    });
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error('Oops, something went wrong with adding that player!', err);
  }
};

const removePlayer = async (playerId) => {
  try {
    const resp = await fetch(`${playersAPI}/${playerId}`, {
      method: 'DELETE',
    });
    const result = await resp.json();
    console.log(result);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.*
 * It also adds event listeners to the buttons in each player card.*
 * The event listeners are for the "See details" and "Remove from roster" buttons.*
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.*
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.*
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */

const renderAllPlayers = async (playerList) => {
  playerContainer.innerHTML = '';
  try {
    playerList.forEach((player) => {
      // console.log(player);
      const playerCardElement = createPlayerCard(player);
      playerContainer.appendChild(playerCardElement);
    });
  } catch (err) {
    console.error('Uh oh, trouble rendering players!', err);
  }
};

const renderSinglePlayer = async (playerId) => {
  playerContainer.innerHTML = '';
  try {
    const player = await fetchSinglePlayer(playerId);
    console.log(player);
    playerContainer.innerHTML = '';
    const playerCardElement = createDetailedPlayerCard(player);
    playerContainer.appendChild(playerCardElement);
  } catch (error) {
    console.error(error);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = async () => {
  newPlayerFormContainer.innerHTML = '';
  try {
    const newPlayerFormElement = document.createElement('form');
    newPlayerFormElement.innerHTML = `
    <h2>Register a Puppy</h2>
    <br/>
      <div>
        <label for="puppy-name">Name</label>
        <input type="text" id="puppy-name">
        <label for="puppy-breed">Breed</label>
        <input type="text" id="puppy-breed">
        <button class="add-btn" type="submit">Add Player</button>
      </div>`;
    newPlayerFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.querySelector('#puppy-name').value;
      const breed = document.querySelector('#puppy-breed').value;

      const playerData = {
        name,
        breed,
      };
      await addNewPlayer(playerData);
      init();
    });

    newPlayerFormContainer.appendChild(newPlayerFormElement);
  } catch (err) {
    console.error('Uh oh, trouble rendering the new player form!', err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
