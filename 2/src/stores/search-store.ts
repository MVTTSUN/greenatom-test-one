import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { Results } from '../types';

class SearchStore {
  results: Results = ['', [], [], []];

  constructor() {
    makeAutoObservable(this);
  }

  getResults = async (search: string, limit: number) => {
    try {
      const response = (
        await axios.get<Results>(
          `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search=${search}&limit=${limit}`
        )
      ).data;
      this.results = response;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
}

const searchStore = new SearchStore();

export { searchStore };
