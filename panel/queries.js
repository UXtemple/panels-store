import Constants from './constants'
import Marty from 'marty'
import StateSource from './state-source'

export class PanelQueries extends Marty.Queries {
  at(uri) {
    return StateSource.at(uri).then(panel => this.dispatch(Constants.PANEL_ADD, panel))
  }
}
export default Marty.register(PanelQueries)
