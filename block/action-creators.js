import Constants from './constants'
import Marty from 'marty'
import PanelConstants from '../panel/constants'
import StateSource from './state-source'
import { StateSource as PanelStateSource } from '../panel'

export class BlockActionCreators extends Marty.ActionCreators {
  add(panelUri, type, data) {
    StateSource.add(panelUri, type, data).then(block => {
      this.dispatch(Constants.BLOCK_ADD, block)
      PanelStateSource.addBlock(block.panelUri, block.id).
        then(panel => this.dispatch(PanelConstants.PANEL_UPDATE, panel))
    })
  }
}

export default Marty.register(BlockActionCreators)
