import * as PanelsStore from '../index';
import DUMMY_DATA from './dummy-data';
import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({store: PanelsStore.reducer});
const store = createStore(reducers);

const { add } = PanelsStore.actions;
DUMMY_DATA.forEach(context => store.dispatch(add(context)));

function find(uri) {
  return PanelsStore.getters.find(store.getState('store').store, uri);
}

window.Playground = {
  find,
  store,
  PanelsStore
};

console.log('Welcome to panels-store playground.');
console.log('https://store.usepanels.com');
console.log('Playground module', Playground);

console.log('store:', store.getState().store);
console.log('find("https://uxtemple.com/the-team/dario")', find("https://uxtemple.com/the-team/dario"));
console.log('find("https://uxtemple.com/the-team/tom")', find("https://uxtemple.com/the-team/tom"));
