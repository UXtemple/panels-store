import { Actions } from 'flummox';

export default class PanelsActions extends Actions {
  load(panels) {
    return Array.isArray(panels) ? panels : [panels];
  }
}
