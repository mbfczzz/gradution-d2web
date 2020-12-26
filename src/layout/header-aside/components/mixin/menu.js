import util from '@/libs/util.js'
import {getPermission} from '@/api/tools'
import store from '@/store/index'

export default {
  methods: {
    handleMenuSelect (index, indexPath) {
      if (/^d2-menu-empty-\d+$/.test(index) || index === undefined) {
        console.log(111)
        this.$message.warning('临时菜单')
      } else if (/^https:\/\/|http:\/\//.test(index)) {
        util.open(index)
      }   
      else {
        this.$router.push({
          path: index
        })
      }
    }
  }
}
