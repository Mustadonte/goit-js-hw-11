import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
let query = '';

const searchParams = new URLSearchParams({
  per_page: 40,
  q: query,
  image_type: 'photo',
  key: '28183118-48feee04d7eb975b8c223533e',
  orientation: 'horizontal',
  safesearch: true,
});

export default async function getImages(query) {
  const searchParams = new URLSearchParams({
    per_page: 40,
    q: query,
    image_type: 'photo',
    key: '28183118-48feee04d7eb975b8c223533e',
    orientation: 'horizontal',
    safesearch: true,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
