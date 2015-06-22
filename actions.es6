import { ADD, REMOVE_ALL, REMOVE } from './action-types';

export function add({app, path, data={}, style={}, title, typeName}) {
  return {
    type: ADD,
    app,
    data,
    path,
    style,
    title,
    typeName
  }
}

export function remove({app, path}) {
  return {
    type: REMOVE,
    app,
    path
  }
}

export function removeAll(app) {
  return {
    type: REMOVE_ALL,
    app
  }
}
