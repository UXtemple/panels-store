import { Record } from 'immutable'
import { type as generateId } from 'marty/lib/utils/uuid'

export default class TitleBlock extends Record({id: undefined,
                                                panelUri: undefined,
                                                type: 'TitleBlock',
                                                title: ''}) {
  constructor(data = {}) {
    data.id = data.id || generateId('block')
    data.type = 'TitleBlock'
    super(data)
  }
}
