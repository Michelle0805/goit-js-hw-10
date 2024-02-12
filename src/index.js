import axios from "axios";
import slimSelect from 'slim-select';
import Notiflix from 'notiflix';

    document.addEventListener("DOMContentLoaded", async () => {
        const breedSelect = new slimSelect({
            select: '#breed-select',
            placeholder: 'Select Breed',
            hideSelectedOption: true, 
        });
        
        try {
            const breeds = fetchBreeds();
            breeds.forEach(breed => {
            breedSelect.addData({
                text: breed.name,
                value: breed.id
            });
            });
        } catch (error) {
            console.error('Oops! Something went wrong! Try reloading the page!', error);
          }
        });


  function displayCatInfo(catData) {
    const catInfoDiv = document.querySelector('.cat-info');
    const loader = document.querySelector('.loader');
    const catImage = document.getElementById('cat-image');
    const breedName = document.getElementById('breed-name');
    const description = document.getElementById('description');
    const temperament = document.getElementById('temperament');
  
    catImage.src = catData[0].url;
    breedName.textContent = catData[0].breeds[0].name;
    description.textContent = catData[0].breeds[0].description;
    temperament.textContent = catData[0].breeds[0].temperament;
  
    catInfoDiv.style.display = 'block';
    loader.style.display = 'none';
    breedSelect.style.display = 'none';
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector('.loader');
    const errorElement = document.querySelector('.error');
  
    loader.style.display = 'block';
    errorElement.style.display = 'none';
  
  });

import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

fetchBreeds(); 
fetchCatByBreed();
  

  