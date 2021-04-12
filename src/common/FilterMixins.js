// 计算播放量单位换算
import { numberFormat } from 'js-num-format'
import MusicUtils from './MusicUtils'
export default {
  filters: {
    handleNumberFormat: numberFormat,
    handleTimeFormat: MusicUtils.timeFormat
  }
}
