import type { App } from 'vue'
import Antd from 'ant-design-vue'
import {
  CompressOutlined,
  AppstoreOutlined,
  BlockOutlined,
  CopyOutlined,
  DatabaseOutlined,
  NodeIndexOutlined,
  FieldStringOutlined,
  SyncOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteFilled,
  SaveOutlined,
  EyeOutlined,
  LockOutlined,
  ImportOutlined,
  ExportOutlined,
  CameraOutlined,
  AreaChartOutlined,
  SearchOutlined,
  FontColorsOutlined,
  PictureOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons-vue'

import Icon from './Icon/index.vue'
import Action from './Action/index.vue'

export function setupComponent(app: App) {
  const requireContext: __WebpackModuleApi.RequireContext = require.context(
    '../assets/svg',
    true,
    /\.svg$/,
  )
  requireContext.keys().forEach(requireContext)

  app.use(Antd)
  app.component('CompressOutlined', CompressOutlined)
  app.component('AppstoreOutlined', AppstoreOutlined)
  app.component('BlockOutlined', BlockOutlined)
  app.component('CopyOutlined', CopyOutlined)
  app.component('NodeIndexOutlined', NodeIndexOutlined)
  app.component('FieldStringOutlined', FieldStringOutlined)
  app.component('DatabaseOutlined', DatabaseOutlined)
  app.component('SyncOutlined', SyncOutlined)
  app.component('PlusOutlined', PlusOutlined)
  app.component('MinusOutlined', MinusOutlined)
  app.component('DeleteFilled', DeleteFilled)
  app.component('SaveOutlined', SaveOutlined)
  app.component('EyeOutlined', EyeOutlined)
  app.component('LockOutlined', LockOutlined)
  app.component('ImportOutlined', ImportOutlined)
  app.component('ExportOutlined', ExportOutlined)
  app.component('CameraOutlined', CameraOutlined)
  app.component('AreaChartOutlined', AreaChartOutlined)
  app.component('SearchOutlined', SearchOutlined)
  app.component('FontColorsOutlined', FontColorsOutlined)
  app.component('PictureOutlined', PictureOutlined)
  app.component('AppstoreAddOutlined', AppstoreAddOutlined)

  app.component('Icon', Icon)
  app.component('Action', Action)
}
