import Notiflix from "notiflix";
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_wQ6zKqW4xLdmiSOAOnksWBFRuoDhl8Kigsple5smLKaGN6zFiomdv9HJpNMvd43A";

export function fetchBreeds() {
    
    return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data())
    .catch(() => {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'); 
    });    
 
}

export function fetchCatByBreed(breedId) {
 axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
 .then(response => response.json())
 .then(breeds => {
    breeds.forEach(breed => {
        select.innerHTML += `<option value="${breed.id}">${breed.name}</option>`;
    });
    select.style.display = 'block';
    loader.style.display = 'none';
    displayCatInfo.innerHTML = `
    </div>
  <div class="cat-info" style="display: none;">
    <img id="cat-image" src="" alt="Cat Image">
    <div id="cat-details">
      <h2>Breed: <span id="breed-name"></span></h2>
      <p><strong>Description:</strong> <span id="description"></span></p>
      <p><strong>Temperament:</strong> <span id="temperament"></span></p>
    </div>
  </div>`;
  catInfoDiv.appendChild(displayCatInfo)
  })

  .catch(() => {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });
}