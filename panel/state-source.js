import { List } from 'immutable'
import Marty from 'marty'
import PanelRecord from './record'
import uuid from 'marty/lib/utils/uuid'

export class PanelStateSource extends Marty.JSONStorageStateSource {
  add(uri) {
    return new Promise(resolve => {
      const panel = new PanelRecord({uri})
      this.set(panel.uri, panel)
      resolve(panel)
    })
  }
  addBlock(uri, blockId) {
    return this.update(uri, [blockId])
  }

  at(uri) {
    return new Promise(resolve => resolve(this.get(uri)))
  }

  get(uri) {
    let got = Marty.JSONStorageStateSource.prototype.get.call(this, uri)
    if (got) {
      return new PanelRecord({
        uri: got.uri,
        blocks: List(got.blocks)
      })
    }
  }

  update(uri, blocks) {
    return new Promise(resolve => {
      let panel = this.get(uri);
      let blocksToAdd = blocks.filter(id => !blocks.indexOf(id))
      panel = panel.set('blocks', panel.blocks.concat(blocksToAdd))
      this.set(panel.uri, panel)
      resolve(panel)
    })
  }
}
export default Marty.register(PanelStateSource)
