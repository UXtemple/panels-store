import { ADD, REMOVE, REMOVE_ALL } from '../action-types';
import * as PANEL from './panel';
import * as PANEL2 from './panel2';
import assert from 'assert';
import eq from 'lodash/lang/eq';
import i from 'seamless-immutable';
import reducer from '../reducer';

describe('reducer', () => {
  it('handles ADD', () => {
    const newState = reducer(i({}), {type: ADD, ...PANEL});
    assert(newState.hasOwnProperty(PANEL.app), 'has app');
    assert(Array.isArray(newState[PANEL.app].lookup), 'has lookup array');
    assert(newState[PANEL.app].hasOwnProperty('panels'), 'has panels object');
    assert(newState[PANEL.app].panels.hasOwnProperty(PANEL.path), 'has path');
    assert(eq(newState[PANEL.app].panels[PANEL.path], PANEL), 'has panel');
  });

  it('handles REMOVE', () => {
    const iState = i({
      [PANEL.app]: {
        lookup: [],
        panels: {
          [PANEL.path]: PANEL,
          [PANEL2.path]: PANEL2
        }
      }
    });
    const newState = reducer(iState, {type: REMOVE, app: PANEL.app, path: PANEL.path});
    assert(newState.hasOwnProperty(PANEL.app), 'has app');
    assert(!newState[PANEL.app].panels.hasOwnProperty(PANEL.path), 'doesn\'t have PANEL.path');
    assert(newState[PANEL2.app].panels.hasOwnProperty(PANEL2.path), 'has PANEL2.path');
  });

  it('handles REMOVE_ALL', () => {
    const iState = i({
      [PANEL.app]: {
        [PANEL.name]: PANEL.component
      }
    });
    const newState = reducer(iState, {type: REMOVE_ALL, app: PANEL.app});
    assert(!newState.hasOwnProperty(PANEL.app), 'doesn\'t have app');
  });
});
