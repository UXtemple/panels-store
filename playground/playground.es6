import * as PanelsStore from '../index';
import DUMMY_DATA from './dummy-data';
import { Flux } from 'flummox';

class AppFlux extends Flux {
  constructor() {
    super();

    this.createActions('panels', PanelsStore.Actions);
    this.createStore('panels', PanelsStore.Store, this);
  }
}

const flux = new AppFlux();
flux.getActions('panels').load(DUMMY_DATA);

window.Playground = {
  flux,
  PanelsStore,
  getStore() { return flux.getStore('panels') }
};

console.log('Welcome to panels-store playground.');
console.log('https://store.usepanels.com');
console.log('Playground module', Playground);
