import axios from 'axios';
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async getImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
      per_page: this.perPage,
      q: this.searchQuery,
      image_type: 'photo',
      key: '28183118-48feee04d7eb975b8c223533e',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
    });

    try {
      const response = await axios.get(`${BASE_URL}?${searchParams}`);
      this.page += 1;
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
