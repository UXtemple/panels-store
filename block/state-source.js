import * as Blocks from './records'
import Marty from 'marty'

export class BlockStateSource extends Marty.JSONStorageStateSource {
  add(panelUri, type, data) {
    return new Promise(resolve => {
      const block = new Blocks[type]({panelUri, ...data})
      this.set(block.id, block)
      resolve(block)
    })
  }

  at(id) {
    return new Promise(resolve => resolve(this.get(id)))
  }

  get(id) {
    let got = Marty.JSONStorageStateSource.prototype.get.call(this, id)
    if (got) {
      return new Blocks[got.type](got)
    }
  }

  update(id, data) {
    return new Promise(resolve => {
      let block = this.get(id)
      this.set(id, block.merge(data))
      resolve(id)
    })
  }
}
export default Marty.register(BlockStateSource)
