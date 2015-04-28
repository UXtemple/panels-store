import Constants from './constants'
import Immutable from 'immutable'
import Marty from 'marty'
import Queries from './queries'

export class BlockStore extends Marty.Store {
  constructor(options) {
    super(options)
    this.displayName = 'BlockStore'
    this.handlers = {
      set: [
        Constants.BLOCK_ADD,
        Constants.BLOCK_UPDATE
      ]
    }
  }

  at(id) {
    return this.fetch({
      id,
      locally() { return this.state.get(id) },
      remotely() { return Queries.at(id) }
    })
  }

  getInitialState() {
    return Immutable.Map()
  }

  set(block) {
    this.state = this.state.set(block.id, block)
  }
}

export default Marty.register(BlockStore)
