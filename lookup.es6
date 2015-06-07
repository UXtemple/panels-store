import { Map as IMap } from 'immutable';
import Route from 'houkou';

export default class Lookup {
  constructor(patterns=[]) {
    this.patterns = IMap(patterns.map(pattern => [pattern, new Route(pattern)]));
  }

  add(pattern) {
    this.patterns = this.patterns.set(pattern, new Route(pattern));
  }

  remove(pattern) {
    this.patterns = this.patterns.delete(pattern);
  }

  match(path) {
    return this.patterns.
      filter(route => route.match(path)).
      sortBy((v, k) => k, compare).
      map((v, k) => ({pattern: k, params: v.match(path)})).
      first();
  }
}

const FORWARD_SLASHES_REGEX = /\//g;

function complexity(path) {
  return path.match(FORWARD_SLASHES_REGEX).length;
}

function compare(pathA, pathB) {
  return complexity(pathB) - complexity(pathA);
}
