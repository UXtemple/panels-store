import { List, Record } from 'immutable'

export default class PanelRecord extends Record({
  blocks: List(),
  uri: undefined
}) {}