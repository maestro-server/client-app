'use strict'
import callback from './callback/Callback.vue'
import uploader from './uploader/Uploader.vue'
import loader from './loader/Loader.vue'
import imager from './imager/Imager.vue'
import jsonTree from './jsontree/TreeView.vue'
import treeViewItem from './jsontree/TreeViewItem.vue'
import createrList from './createrList/CreaterList.vue'
import infoView from './infoView/InfoView.vue'
import createrConfigList from './createrConfigList/CreaterConfigList.vue'
import listBox from './listBox/ListBox.vue'
import headerEntity from './headerEntity/HeaderEntity.vue'
import headerViewEntity from './headerViewEntity/HeaderViewEntity.vue'

let components = {
  createrConfigList,
  headerViewEntity,
  headerEntity,
  createrList,
  infoView,
  callback,
  uploader,
  jsonTree,
  treeViewItem,
  listBox,
  loader,
  imager
}

export default components
