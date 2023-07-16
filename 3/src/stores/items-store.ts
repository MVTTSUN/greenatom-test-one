import { makeAutoObservable } from 'mobx';
import { Item } from '../types';
import { nanoid } from 'nanoid';

class ItemsStore {
  items: Item[] = [];
  private _activeOdd = false;
  private _activeEven = false;

  constructor() {
    makeAutoObservable(this);
  }

  addTodoItem = (text: string) => {
    this.items.push({ id: nanoid(), text, isDone: false, isActive: false });
    this._sortDoneItems();
    this._restartActionItems();
  };

  removeTodoItem = (id: string) => {
    this.items = this.items.filter((item) => item.id !== id);
    this._restartActionItems();
  };

  removeFirstTodoItem = () => {
    this.items = this.items.slice(1);
    this._restartActionItems();
  };

  removeLastTodoItem = () => {
    this.items = this.items.slice(0, -1);
    this._restartActionItems();
  };

  completeTodoItem = (id: string) => {
    this.items = this.items.map((item) => {
      if (item.id === id) {
        item.isDone = true;
      }
      return item;
    });
    this._sortDoneItems();
    this._restartActionItems();
  };

  private _sortDoneItems = () => {
    this.items = this.items.sort((a, b) => +a.isDone - +b.isDone);
  };

  private _restartActionItems = () => {
    if (this._activeOdd) {
      this._clearActiveItems();
      this.updateActiveItemOdd();
    } else if (this._activeEven) {
      this._clearActiveItems();
      this.updateActiveItemEven();
    }
  };

  private _clearActiveItems = () => {
    this.items = this.items.map((item) => {
      item.isActive = false;
      return item;
    });
    this._activeOdd = false;
    this._activeEven = false;
  };

  updateActiveItemOdd = () => {
    this.items = this.items.map((item, id) => {
      if (id % 2 === 0) {
        item.isActive = !item.isActive;
      }
      return item;
    });
    this._activeOdd = !this._activeOdd;
  };

  updateActiveItemEven = () => {
    this.items = this.items.map((item, id) => {
      if (id % 2 !== 0) {
        item.isActive = !item.isActive;
      }
      return item;
    });
    this._activeEven = !this._activeEven;
  };
}

const itemsStore = new ItemsStore();

export { itemsStore };
