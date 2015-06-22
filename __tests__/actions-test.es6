import { add, remove, removeAll } from '../actions';
import { ADD, REMOVE, REMOVE_ALL } from '../action-types';
import * as PANEL from './panel';
import assert from 'assert';

describe('actions', () => {
  it('#add', () => {
    const {type, app, data, path, style, title, typeName} = add(PANEL);
    assert(type === ADD, 'type');
    assert(app === PANEL.app, 'payload: app');
    assert(data === PANEL.data, 'payload: data');
    assert(path === PANEL.path, 'payload: path');
    assert(style === PANEL.style, 'payload: style');
    assert(title === PANEL.title, 'payload: title');
    assert(typeName === PANEL.typeName, 'payload: typeName');
  });

  it('#remove', () => {
    const {type, app, path} = remove({app: PANEL.app, path: PANEL.path});
    assert(type === REMOVE, 'type');
    assert(app === PANEL.app, 'payload: app');
    assert(path === PANEL.path, 'payload: path');
  });

  it('#removeAll', () => {
    const {type, app} = removeAll(PANEL.app);
    assert(type === REMOVE_ALL, 'type');
    assert(app === PANEL.app, 'payload: app');
  });
});
