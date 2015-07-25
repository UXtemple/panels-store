import { add, remove, removeAll } from '../actions';
import { ADD, REMOVE, REMOVE_ALL } from '../action-types';
import * as PANEL from './panel';
import assert from 'assert';

describe('actions', () => {
  it('#add', () => {
    const {type, payload: {app, data, path, title, type: typeName}} = add(PANEL);
    assert(type === ADD, 'type');
    assert(app === PANEL.app, 'payload: app');
    assert(data === PANEL.data, 'payload: data');
    assert(path === PANEL.path, 'payload: path');
    assert(title === PANEL.title, 'payload: title');
    assert(typeName === PANEL.type, 'payload: type');
  });

  it('#remove', () => {
    const {type, payload: {app, path}} = remove({app: PANEL.app, path: PANEL.path});
    assert(type === REMOVE, 'type');
    assert(app === PANEL.app, 'payload: app');
    assert(path === PANEL.path, 'payload: path');
  });

  it('#removeAll', () => {
    const {type, payload: {app}} = removeAll(PANEL.app);
    assert(type === REMOVE_ALL, 'type');
    assert(app === PANEL.app, 'payload: app');
  });
});
