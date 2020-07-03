<template>
  <div>
    <div id="header-wrap">
      <div
        class="pull-left header-icon"
        @click="navMenuState"
      >
        <svg-icon
          iconClass="menu"
          className="menu"
        ></svg-icon>
      </div>
      <div class="pull-right ">
        <div class="user-info pull-left">
          <img
            src="../../../assets/images/face.jpg"
            alt=""
          />
          {{userName}}
        </div>
        <div
          class="header-icon pull-left"
          @click="dialogVisible = true"
        >
          <svg-icon
            iconClass="exit"
            className="exit"
          > </svg-icon>
        </div>
      </div>

    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>是否退出</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClose"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as types from '../../../store/app/mutation-type'
export default {
  name: 'headerMain',
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters('app', ['isCollapse', 'userName']),
    // ...mapGetters('test', ['aaa'])
  },
  methods: {
    navMenuState () {
      this.setCollapse(!this.isCollapse)
      console.log(sessionStorage.getItem('isCollapse'));
      // console.log(this.aaa);
    },
    exitLogin () {
      this.exit().then(() => {
        this.$router.push('/login')
      }).catch((err) => {
        console.log(err);
      })
    },
    handleClose (done) {
      this.dialogVisible = false
      this.exitLogin()
    },

    ...mapActions('app',
      ['setCollapse', 'exit']
    )
  },


}
</script>

<style lang="scss" scoped>
#header-wrap {
  position: fixed;
  left: $navMenu;
  right: 0;
  top: 0;
  height: 75px;
  background-color: #fff;
  line-height: 75px;
  @include webkit(transition, all 0.3s ease 0s);
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}

.close {
  #header-wrap {
    left: $navMenuMin;
  }
}

.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
  }
}
</style>
