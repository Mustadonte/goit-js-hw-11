// import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
// let query = '';
// let page = 1;

// export default async function getImages(query, page) {
//   const searchParams = new URLSearchParams({
//     per_page: 40,
//     q: query,
//     image_type: 'photo',
//     key: '28183118-48feee04d7eb975b8c223533e',
//     orientation: 'horizontal',
//     safesearch: true,
//     page,
//   });

//   try {
//     const response = await axios.get(`${BASE_URL}?${searchParams}`);
//     page += 1;
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }
