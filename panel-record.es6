import { List, Map as IMap, Record } from 'immutable'
import BlockRecord from './block-record';

export default class PanelRecord extends Record({
  app: undefined,
  blocks: List(),
  style: IMap(),
  title: undefined,
  uri: undefined
}) {
  static from(panel) {
    return new PanelRecord({
      app: panel.app,
      blocks: List((panel.blocks || []).map(BlockRecord.from)),
      style: IMap(panel.style),
      title: panel.title,
      uri: panel.uri
    });
  }
}
