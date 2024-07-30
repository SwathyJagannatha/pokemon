// GOAL: Load pikachu's information when we load the page (DOMContentLoaded)

// Fetch the pokemon data from the server 
// Pokemon URL = https://pokeapi.co/api/v2/pokemon/pikachu
// Convert to json 
// Return the pokemon data 

async function myFunction(event){

}

async function fetchPokemonData(pokemonName){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const pokemonData = await response.json(); 
    return pokemonData; 
  }

    document.addEventListener("DOMContentLoaded", async () => {

        const style = document.createElement('style');
        style.textContent = `
          #pokemon-info {
            font-family: Times New Roman;
            max-width: 1400px;
            height:500 px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(lightcoral,lightyellow);
            border-radius: 10px;
            box-shadow: 5px 0 10px rgba(0,0,0,0.1);
          }
          #pokemon-info h2 {
            color: pink;
            text-transform:inherit;
            text-decoration:underline;
          }
          #pokemon-info img {
            display: block;
            margin: 0 auto;
          }
          #pokemon-info h3 {
            color: #cc3366;
          }
          #pokemon-info ul {
            list-style-type: none;
            padding: 0;
          }
          #pokemon-info li {
            margin-bottom: 5px;
            padding 5px;
          }
        `;
        document.head.appendChild(style);
        
    const pikachuData = await fetchPokemonData('pikachu'); 
    console.log(pikachuData); 
  
    const pokemonInfoElement = document.getElementById('pokemon-info');
    const pokemonDataName = pikachuData.name; 
  
    pokemonInfoElement.innerHTML = `
      <h2>${pokemonDataName}<h2> 
      <img src="${pikachuData.sprites.front_default}"> 
      <h3>Abilities: </h3>
      <ul>
        ${pikachuData.abilities.map(arrayItem => `<li>${arrayItem.ability.name}</li>`).join('')}
      </ul>
      <h3>Base Experience: </h3>
      <p>${pikachuData.base_experience}</p> 
      <h3>First Pikachu Move</h3>
      <p>${pikachuData.moves[0].move.name}</p>
  
      <h3>ALL Pikachu Move</h3>
      <ul>${pikachuData.moves.map(moveItem => `<li>${moveItem.move.name}</li>`).join('')}</ul>
    `
  })

// Call the renderData function to display data
//renderData();
