import Route from 'houkou';

export default class Lookup {
  constructor(patterns=[]) {
    this.patterns = {};
    patterns.forEach(pattern => this.patterns[pattern] = new Route(pattern));
  }

  add(pattern) {
    this.patterns[pattern] = new Route(pattern);
  }

  remove(pattern) {
    delete this.patterns[pattern];
  }

  match(path) {
    return toArray(this.patterns)
      .filter(({route}) => route.match(path))
      .sort(compare)
      .map(({pattern, route}) => ({pattern, params: route.match(path)}))[0];
  }
}

function compare({pattern: patternA}, {pattern: patternB}) {
  return complexity(patternB) - complexity(patternA);
}

function complexity(pattern) {
  return pattern.match(FORWARD_SLASHES_REGEX).length;
}

function toArray(obj) {
  return Object.keys(obj).map(pattern => ({pattern, route: obj[pattern]}));
}

const FORWARD_SLASHES_REGEX = /\//g;

// Keep an eye on this to bring back immutables
// https://github.com/rtfeldman/seamless-immutable/issues/25#issuecomment-111308104
