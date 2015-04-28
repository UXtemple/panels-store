import Constants from './constants'
import Marty from 'marty'
import StateSource from './state-source'

export class PanelActionCreators extends Marty.ActionCreators {
  add(uri) {
    StateSource.add(uri).then(panel => this.dispatch(Constants.PANEL_ADD, panel))
  }
}

export default Marty.register(PanelActionCreators)
