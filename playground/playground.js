import 'babelify/polyfill'
import * as PanelsStore from '../'
window.PanelsStore = PanelsStore

import Marty from 'marty'
window.Marty = Marty

console.log('Welcome to panels-store playground.')
console.log('https://store.usepanels.com')
console.log('PanelsStore module', PanelsStore)

PanelsStore.Panel.Store.addChangeListener(function(change) {
  let panel = PanelsStore.Panel.Store.get('https://usepanels.com/')
  PanelsStore.Block.ActionCreators.add('title', {title: 'Panels', panelId: panel.get('id')})
})

PanelsStore.Panel.ActionCreators.add('https://usepanels.com/')
