import RLookup from 'rlookup';

// Separate the app's name from the path to the panel. Strip out the schema from the URI.
const APP_PATH = /^https?:\/\/([^/]+)(.+)/;

export function find(state, uri) {
  const [_, appName, path] = uri.match(APP_PATH);
  const app = state[appName];
  let panel = app.panels[path];

  if (typeof panel === 'undefined') {
    const { pattern, params } = new RLookup({patterns: app.lookup}).match(path);
    const { data: baseData, title: baseTitle, path: basePath, ...base } = app.panels[pattern];

    function parseParams(text='') {
      Object.keys(params).forEach(param => text = text.replace(new RegExp(`(.*):(${param})(.*)`), `$1${params[param]}$3`));
      return text;
    }

    panel = {
      ...base,
      data: Object.keys(baseData).map(k => ({[k]: parseParams(baseData[k])})).reduce((r,c) => ({...r, ...c}), {}),
      path,
      title: parseParams(baseTitle)
    }
  }

  return panel;
}
