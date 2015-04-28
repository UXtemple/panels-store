import { Record } from 'immutable'
import { type as generateId } from 'marty/lib/utils/uuid'

export default class ActionBlock extends Record({id: undefined,
                                                panelUri: undefined,
                                                type: 'ActionBlock',
                                                title: '',
                                                href: ''}) {
  constructor(data = {}) {
    data.id = data.id || generateId('block')
    data.type = 'ActionBlock'
    data.href = data.href || (data.title && data.title.toLowerCase().replace(/\s+/g, '-'))
    super(data)
  }
}
