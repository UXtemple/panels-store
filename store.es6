import { List, Map as IMap } from 'immutable';
import { Store } from 'flummox';
import Lookup from './lookup';
import PanelRecord from './panel-record';

const DYNAMIC_REGEX = /:.+/;
const SCHEMA_REGEX = /https?:\/\//;

export default class PanelsStore extends Store {
  static assignState(oldState, newState) { return newState }

  constructor(flux) {
    super();

    const actionIds = flux.getActionIds('panels');
    this.register(actionIds.load, this.load);

    this.dynamic = IMap();
    this.state = IMap();
  }

  load(panels) {
    let obj = {};

    panels.forEach(panel => {
      obj[`${panel.app}${panel.uri}`] = PanelRecord.from(panel);

      if (DYNAMIC_REGEX.test(panel.uri)) {
        if (typeof this.dynamic[panel.app] === 'undefined') {
          this.dynamic[panel.app] = new Lookup();
        }
        this.dynamic[panel.app].add(panel.uri);
      }
    });

    this.setState(this.state.merge(obj));
  }

  getByUri(uri) {
    const key = uri.replace(SCHEMA_REGEX, '');

    let panel = this.state.get(key);

    // No match?
    if (!panel) {
      const [app, ...path] = key.split('/');

      // Maybe it's dynamic
      if (typeof this.dynamic[app] !== 'undefined') {
        uri = `/${path.join('/')}`;
        const { pattern, params } = this.dynamic[app].match(uri);

        // TODO The regex can probably improved
        function parseParams(text) {
          Object.keys(params).forEach(param => text = text.replace(new RegExp(`(.*):(${param})(.*)`), `$1${params[param]}$3`));
          return text;
        }

        // Get the base "pattern" panel
        panel = this.state.get(`${app}${pattern}`);

        // Create a new one that contains the static data
        panel = panel.merge({
          title: parseParams(panel.title),
          uri,
          blocks: panel.blocks.map(block => block.set('data', block.data.map(parseParams)))
        });

        // Memoise. TODO Review. This is probably anti-flux? :/
        this.setState(this.state.set(key, panel));
      }
    }

    return panel.toJS();
  }
}
