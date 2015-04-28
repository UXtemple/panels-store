import * as Block from '../block'
import Constants from './constants'
import { Map as IMap } from 'immutable'
import Marty from 'marty'
import Queries from './queries'

export class PanelStore extends Marty.Store {
  constructor(options) {
    super(options)
    this.displayName = 'PanelStore'
    this.handlers = {
      set: [
        Constants.PANEL_ADD,
        Constants.PANEL_UPDATE
      ]
    }
  }

  at(uri) {
    return this.fetch({
      id: uri,
      locally() { return this.state.get(uri) },
      remotely() { return Queries.at(uri) }
    })
  }

  getInitialState() {
    return IMap()
  }

  set(panel) {
    this.state = this.state.set(panel.uri, panel)
  }
}

export default Marty.register(PanelStore)
