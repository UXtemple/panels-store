import * as PanelsStore from '../index';
import DUMMY_DATA from './dummy-data';
import { createRedux } from 'redux';

const redux = createRedux({store: PanelsStore.reducer});

const { add } = PanelsStore.Actions;
DUMMY_DATA.forEach(context => redux.dispatch(add(context)));

function find(uri) {
  return PanelsStore.getters.find(redux.getState('store').store, uri);
}

window.Playground = {
  find,
  redux,
  PanelsStore
};

console.log('Welcome to panels-store playground.');
console.log('https://store.usepanels.com');
console.log('Playground module', Playground);

console.log('store:', redux.getState().store);
console.log('find("https://uxtemple.com/the-team/dario")', find("https://uxtemple.com/the-team/dario"));
console.log('find("https://uxtemple.com/the-team/tom")', find("https://uxtemple.com/the-team/tom"));
