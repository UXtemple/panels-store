import Constants from './constants'
import Marty from 'marty'
import StateSource from './state-source'

export class BlockQueries extends Marty.Queries {
  at(id) {
    return StateSource.at(id).then(block => this.dispatch(Constants.BLOCK_ADD, block))
  }
}
export default Marty.register(BlockQueries)
