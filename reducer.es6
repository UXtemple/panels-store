import { ADD, REMOVE, REMOVE_ALL } from './action-types';
import i from 'seamless-immutable';

const DYNAMIC_PATH = /:.+/;

export default function(state=i({}), {type, payload}) {
  switch (type) {
    case ADD: return add(state, payload);
    case REMOVE: return remove(state, payload);
    case REMOVE_ALL: return removeAll(state, payload);
    default: return state;
  }
}

function add(state, {app, data, path, title, type}) {
  const {
    [app]: {
      lookup = [],
      panels
    } = {},
    ...rest
  } = state;

  const newApp = {
    [app]: {
      lookup: DYNAMIC_PATH.test(path) ? lookup.concat(path) : lookup,
      panels: {
        ...panels,
        [path]: {app, data, path, title, type}
      }
    }
  }
  return i(rest).merge(newApp);
}

function remove(state, {app, path}) {
  const {
    [app]: {
      lookup = [],
      panels
    } = {},
    ...rest
  } = state;

  const {
    [path]: panel,
    ...newPanels
  } = panels;

  const newApp = {
    [app]: {
      lookup: lookup.filter(lpath => lpath !== path),
      panels: newPanels
    }
  }

  return i(rest).merge(newApp);
}

function removeAll(state, {app}) {
  const {[app]: removedApp, ...rest} = state;
  return i(rest);
}
