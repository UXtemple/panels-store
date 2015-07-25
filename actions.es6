import * as t from './action-types';

export function add({app, data={}, path, title, type}) {
  return {
    type: t.ADD,
    payload: {
      app,
      data,
      path,
      title,
      type
    }
  }
}

export function remove({app, path}) {
  return {
    type: t.REMOVE,
    payload: {
      app,
      path
    }
  }
}

export function removeAll(app) {
  return {
    type: t.REMOVE_ALL,
    payload: {
      app
    }
  }
}
