import { find } from '../getters';
import * as PANEL from './panel';
import * as PANEL2 from './panel2';
import assert from 'assert';
import eq from 'lodash/lang/eq';

const state = {
  [PANEL.app]: {
    lookup: [PANEL2.path],
    panels: {
      [PANEL.path]: PANEL,
      [PANEL2.path]: PANEL2
    }
  }
}

describe('getters', () => {
  describe('#find', () => {
    it('a static panel', () => assert(eq(find(state, `https://${PANEL.app}${PANEL.path}`), PANEL)));
    it('a dynamic panel', () => {
      const PANEL2_INSTANCE = {
        ...PANEL2,
        data: {
          id: '1'
        },
        path: '/1',
        title: 'title 1'
      }

      assert(eq(find(state, `https://${PANEL.app}${PANEL2_INSTANCE.path}`), PANEL2_INSTANCE));
    });
  });
});
