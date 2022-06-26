import Notiflix from 'notiflix';

import createCards from './js/create_cards';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ApiService from './js/api-service';
import LoadMoreBtn from './js/load-more-button';

const refs = {
  formElement: document.querySelector('#search-form'),
  galleryElement: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
refs.formElement.addEventListener('submit', onSubmit);
loadMoreBtn.refs.button.addEventListener('click', renderImages);

const apiService = new ApiService();

function onSubmit(e) {
  e.preventDefault();
  loadMoreBtn.show();
  loadMoreBtn.disable();
  clearContainer();
  apiService.query = e.target.elements.searchQuery.value;
  apiService.resetPage();
  apiService
    .getImages()
    .then(res => {
      if (res.totalHits > 0) {
        Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`);
        renderImages();
      } else if (res.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadMoreBtn.hide();
      }
    })
    .catch(error => {
      console.log(error);
    });
}

async function renderImages() {
  loadMoreBtn.disable();
  try {
    const { hits, totalHits } = await apiService.getImages();

    if (apiService.page >= totalHits / apiService.perPage) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
    }
    refs.galleryElement.insertAdjacentHTML('beforeend', createCards(hits));
    var lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 150,
    });

    loadMoreBtn.enable();
    lightbox.refresh();
    apiService.incrementPage();
    scroll();
  } catch (error) {
    console.log(error);
  }
}

// function onLoadMore() {
//   renderImages();
// }

function clearContainer() {
  refs.galleryElement.innerHTML = '';
}

function scroll() {
  const { height: cardHeight } =
    refs.galleryElement.firstElementChild.getBoundingClientRect();
  console.log(cardHeight);

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
