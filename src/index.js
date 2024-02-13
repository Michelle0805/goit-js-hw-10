// import axios from "axios";
// import slimSelect from 'slim-select';
// import Notiflix from 'notiflix';

//     document.addEventListener("DOMContentLoaded", async () => {
//         const breedSelect = new slimSelect({
//             select: '#breed-select',
//             placeholder: 'Select Breed',
//             hideSelectedOption: true, 
//         });
        
//         try {
//             const breeds = fetchBreeds();
//             breeds.forEach(breed => {
//             breedSelect.addData({
//                 text: breed.name,
//                 value: breed.id
//             });
//             });
//         } catch (error) {
//             console.error('Oops! Something went wrong! Try reloading the page!', error);
//           }
//         });


//   function displayCatInfo(catData) {
//     const catInfoDiv = document.querySelector('.cat-info');
//     const loader = document.querySelector('.loader');
//     const catImage = document.getElementById('cat-image');
//     const breedName = document.getElementById('breed-name');
//     const description = document.getElementById('description');
//     const temperament = document.getElementById('temperament');
  
//     catImage.src = catData[0].url;
//     breedName.textContent = catData[0].breeds[0].name;
//     description.textContent = catData[0].breeds[0].description;
//     temperament.textContent = catData[0].breeds[0].temperament;
  
//     catInfoDiv.style.display = 'block';
//     loader.style.display = 'none';
//     breedSelect.style.display = 'none';
//   }
  
//   document.addEventListener("DOMContentLoaded", () => {
//     const loader = document.querySelector('.loader');
//     const errorElement = document.querySelector('.error');
  
//     loader.style.display = 'block';
//     errorElement.style.display = 'none';
  
//   });

// import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

// fetchBreeds(); 
// fetchCatByBreed();
  
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelectCard = document.querySelector('.breed-select');
const catInfoCard = document.querySelector('.cat-info');
const loaderCard = document.querySelector('.loader');
const errorCard = document.querySelector('.error');

function chooseBreed(data) {
    fetchBreeds(data)
      .then(data => {
        //   console.log(data);
        loaderCard.classList.replace('loader', 'is-hidden');
  
        let optionsMarkup = data.map(({ name, id }) => {
          return `<option value ='${id}'>${name}</option>`;
        });
  
        breedSelectCard.insertAdjacentHTML('beforeend', optionsMarkup);
  
        // to define css style from slim-select
        new SlimSelect({
          select: breedSelectCard,
        });
        breedSelectCard.classList.remove('is-hidden'); // Show select element after options are added
  
      })
  
      .catch(onError);
  }
  
  chooseBreed();

  function createMarkup(event) {
      // Show loader while loading
      loaderCard.classList.replace('is-hidden', 'loader');
      // Hide select element and cat info markup while loading
      breedSelectCard.classList.add('is-hidden');
      catInfoCard.classList.add('is-hidden');
    
      const breedId = event.target.value;
      //   get the option value using event.target.value
        console.log(event.target);
        console.log(event.target.value);
    

      fetchCatByBreed(breedId)
        .then(data => {
          loaderCard.classList.replace('loader', 'is-hidden');
          breedSelectCard.classList.remove('is-hidden');
    
          const { url, breeds } = data[0];
          const { name, description, temperament } = breeds[0];
    
          catInfoCard.innerHTML = `
          <img src="${url}" alt="${name}" width="400"/>
          <div class="box">
            <h2>${name}</h2>
            <p>${description}</p>
            <p><strong>Temperament:</strong> ${temperament}</p>
          </div>
          `;
          catInfoCard.classList.remove('is-hidden');
        })
        .catch(onError);
    }

    breedSelectCard.addEventListener('change', createMarkup);

    function onError() {
        breedSelectCard.classList.remove('is-hidden');
        errorCard.classList.replace('loader', 'is-hidden');
      
         Notify.failure(
          'Oops! Something went wrong! Try reloading the page or select another cat breed!'
        );
    }