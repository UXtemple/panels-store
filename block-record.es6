import { Map as IMap, Record } from 'immutable'

export default class BlockRecord extends Record({
  type: undefined,
  data: IMap(),
  style: IMap()
}) {
  static from(block) {
    return new BlockRecord({
      data: IMap(block.data),
      style: IMap(block.style),
      type: block.type
    });
  }
}
