import { List, Map as ImmutableMap } from 'immutable';
import PanelRecord from './panel-record';
import { Store } from 'flummox';

export default class PanelsStore extends Store {
  static assignState(oldState, newState) { return newState }

  constructor(flux) {
    super();

    const actionIds = flux.getActionIds('panels');
    this.register(actionIds.load, this.load);

    this.state = ImmutableMap();
  }

  load(panels) {
    let obj = {};

    panels.forEach(panel => {
      let { blocks, title, uri } = panel;
      blocks = List.isList(blocks) ? blocks : List(blocks);

      obj[panel.uri] = new PanelRecord({blocks, title, uri});
    });

    this.setState(this.state.merge(obj));
  }

  getByUri(uri) { return this.state.get(uri) }
}
