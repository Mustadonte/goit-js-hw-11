import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import Notiflix from 'notiflix';

import getImages from './js/fetch';
import createCards from './js/create_cards';

const refs = {
  formElement: document.querySelector('#search-form'),
  galleryElement: document.querySelector('.gallery'),
};

refs.formElement.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  refs.galleryElement.innerHTML = '';
  const query = e.target.elements.searchQuery.value;

  async function renderImages() {
    try {
      const { hits, totalHits } = await getImages(query);
      refs.galleryElement.insertAdjacentHTML('beforeend', createCards(hits));
    } catch (error) {
      console.log(error);
    }
  }

  renderImages();
}
var lightbox = new SimpleLightbox('.gallery  a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});
