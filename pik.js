async function handleSubmit(event) {
    event.preventDefault();
    let member_info = event.target.Search_Character.value;
    console.log(member_info);
    
    if (member_info) {
      try {
        const pokemonData = await fetchPokemonData(member_info);
        console.log(pokemonData);
        // Process and display the fetched data as needed
        displayPokemonData(event,pokemonData);

        const pokeinfo = await addPokemonInfo(event);
        console.log(pokeinfo);

      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }
  }

  async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const pokemonData = await response.json();
    return pokemonData;
}

let pokemonTeam=[]
  
function addPokemon(pokemon) {
  pokemonTeam.push(pokemon);
  //displayPokemonData();
}

function removePokemon(pokemonId) {
  pokemonTeam = pokemonTeam.filter(pokemon => pokemon.id !== pokemonId);
  displayPokemonData();
}

  function displayPokemonData(event,data) {
    event.preventDefault();
    const displayInfo = document.getElementById('pokemon-team');
    const addinfo = document.createElement("div");
    addinfo.innerHTML = `
      <h2>${data.name}</h2>

       <div class="card new-card-background border rounded shadow text-dark p-4 mx-auto">
            <div id="new-style" class="d-md-flex">
                 <div class="border rounded bg-danger-subtle center-image">
                    <img src="${data.sprites.other["official-artwork"].front_default}" class="img-fluid" alt="${data.name}">
                    <img src="${data.sprites.other["dream_world"].front_default}" class="img-fluid" alt="${data.name}">
                    </div>
                <div class="border rounded p-4 bg-dark" style="background : linear-gradient(green,orange);">
                 <img src="${data.sprites.other["showdown"].front_shiny}" class="img-fluid" alt="${data.name}">
                    <img src="${data.sprites.other["showdown"].back_shiny}" class="img-fluid" alt="${data.name}">
                    <h5 class="card-title">${data.name}</h5>
                    <div class="border rounded-4 bg-warning p-4" style="background : lightteal">
                        <p class = "card-text">Game Indices: ${data.game_indices.slice(0,10).map(gameidx => gameidx.game_index)}</p>
                        <p class = "card-text">Version Name: ${data.game_indices.slice(0,4).map(gameidx => gameidx.version.name)}</p>
                        <p class="border rounded bg-success card-text">Height: ${data.height} dm</p>
                        <p class="card-text bg-success">Weight: ${data.weight / 10} kg</p>
                    </div>
                     <div class="border rounded-4 bg-secondary p-4">
                        <p class="card-text">Moves: ${data.moves.slice(0, 10).map(moveObj => moveObj.move.name).join(', ')}</p>
                    </div>
                    <div class="border rounded-4 bg-secondary p-4">
                        <p class="card-text">Type(s): ${data.types.map(typeObj => typeObj.type.name).join(', ')}</p>
                    </div>
                    <div class="border rounded-4 bg-warning p-4">
                        <p class="card-text">Abilities: ${data.abilities.map(abilityObj => abilityObj.ability.name).join(', ')}</p>
                    </div>
                     <button onclick='removePokemon(${data.id})' class="btn btn-outline-danger">Remove</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('pokemon-team').appendChild(addinfo);
    document.getElementById("myForm").reset();
  }


  async function addPokemonInfo(event) {

    event.preventDefault();
    let member_info = event.target.Search_Character.value;
    console.log(member_info);

    try {
      const data = await fetchPokemonData(member_info);

      const pokemon = {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
        game_indices: data.game_indices,
        height: data.height,
        weight: data.weight,
        types: data.types,
        abilities: data.abilities,
        moves: data.moves
      };

      addPokemon(pokemon);
      document.getElementById("myForm").reset();
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }
