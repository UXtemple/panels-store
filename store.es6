import { Store } from 'flummox';
import I from 'seamless-immutable';
import Lookup from './lookup';

const Panel = ({app, data, style, title, type, uri}) => ({app, data, style, title, type, uri});

export function load(state, rawPanels) {
  const panels = I(rawPanels.map(Panel));
  panels.filter(({uri}) => DYNAMIC_REGEX.test(uri)).forEach(this::addDynamic);
  return state.merge(panels.asObject(panel => [`${panel.app}${panel.uri}`, panel]));
}

// TODO This isn't in the spirit of a stateless store. Perhaps dynamic should be state here?
// I think it shouldn't because it's a runtime internal.
export function addDynamic({app, uri}) {
  if (typeof this.dynamic[app] === 'undefined') {
    this.dynamic[app] = new Lookup();
  }
  this.dynamic[app].add(uri);
}

export function getDynamicPanel(state, dynamic, uri) {
  const [app, ...path] = uri.split('/');

  // Maybe it's dynamic
  if (typeof dynamic[app] !== 'undefined') {
    uri = `/${path.join('/')}`;
    const { pattern, params } = dynamic[app].match(uri);

    // TODO The regex can probably improved
    function parseParams(text='') {
      Object.keys(params).forEach(param => text = text.replace(new RegExp(`(.*):(${param})(.*)`), `$1${params[param]}$3`));
      return text;
    }

    const basePanel = state[`${app}${pattern}`];
    let data;
    if (basePanel.data) {
      data = {};
      Object.keys(basePanel.data).forEach(k => data[k] = parseParams(basePanel.data[k]));
    }
    // Get the base "pattern" panel and return a new one that contains the static data
    return basePanel.merge({
      data,
      title: parseParams(basePanel.title),
      uri
    });
  }
}

export default class PanelsStore extends Store {
  static assignState(oldState, newState) { return newState }

  constructor(flux) {
    super();
    this.dynamic = {};
    this.state = I({});
    this.register(flux.getActionIds('panels').load, panels => this.setState(this::load(this.state, panels)));
  }

  // TODO Memoise dynamic hits. Would it be anti-flux to do it somewhere around here? :/
  getByUri(uri) {
    uri = uri.replace(SCHEMA_REGEX, '');
    return this.state[uri] || getDynamicPanel(this.state, this.dynamic, uri);
  }
}

const DYNAMIC_REGEX = /:.+/;
const SCHEMA_REGEX = /https?:\/\//;
