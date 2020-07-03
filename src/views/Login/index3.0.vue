<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="(item, index) in menuTab"
          :key="index"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium "
      >
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item-form"
          v-if="model == 'register'"
        >
          <label for="passwords">重复密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                id="code"
                type="text"
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButton.status"
                >{{ codeButton.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
            >{{ model === 'login' ? '登入' : '注册' }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import { _getSms, _register, _login } from '@/api/login.js'
import { stripscript, CheckEmail, CheckPass, CheckCode } from '@/utils/validate'
import { reactive, ref, onMounted } from '@vue/composition-api'

export default {
  name: 'login',

  setup(props, context) {
    console.log(context)

    let validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!CheckEmail(value)) {
        callback(new Error('邮箱格式有误'))
      } else {
        callback()
      }
    }

    let validatepassWord = (rule, value, callback) => {
      ruleForm.password = stripscript(value)
      value = ruleForm.password
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!CheckPass(value)) {
        callback(new Error('密码为6至20位数字+字母'))
      } else {
        callback()
      }
    }

    let validatepassWords = (rule, value, callback) => {
      ruleForm.passwords = stripscript(value)
      value = ruleForm.passwords
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== ruleForm.password) {
        callback(new Error('重复密码不正确'))
      } else {
        callback()
      }
    }

    let validateCode = (rule, value, callback) => {
      ruleForm.code = stripscript(value)
      value = ruleForm.code
      if (value === '') {
        return callback(new Error('请输入验证码'))
      } else if (!CheckCode(value)) {
        return callback(new Error('验证码格式错误'))
      } else {
        callback()
      }
    }

    // 申明数据
    /************************************************************** */
    const menuTab = reactive([
      { txt: '登入', current: true, type: 'login' },
      { txt: '注册', current: false, type: 'register' },
    ])

    //模块值
    const model = ref('login')

    //登入按钮禁用状态
    const loginButtonStatus = ref(true)

    //验证码按钮禁用状态
    const codeButton = reactive({
      status: false,
      text: '获取验证码',
    })

    // 倒计时
    const timer = ref(null)

    const ruleForm = reactive({
      username: '',
      password: '',
      passwords: '',
      code: '',
    })

    const rules = {
      username: [{ validator: validateUserName, trigger: 'blur' }],
      password: [{ validator: validatepassWord, trigger: 'blur' }],
      passwords: [{ validator: validatepassWords, trigger: 'blur' }],
      code: [{ validator: validateCode, trigger: 'blur' }],
    }

    //申明函数
    /************************************************************** */
    // 切换模块
    const toggleMenu = (item) => {
      menuTab.forEach((elem) => {
        elem.current = false
      })
      item.current = true
      model.value = item.type

      resetFoemData()
      clearCountDown()
    }

    // 清除表单数据
    const resetFoemData = () => {
      context.refs.ruleForm.resetFields()
    }

    // 获取验证码
    const getSms = () => {
      if (ruleForm.username === '') {
        context.root.$message({
          showClose: true,
          message: '邮箱不可以为空',
          type: 'error',
        })
        return false
      }

      if (!CheckEmail(ruleForm.username)) {
        context.root.$message({
          showClose: true,
          message: '邮箱格式有误，请重新输入',
          type: 'error',
        })
        return false
      }

      let requestData = {
        username: ruleForm.username,
        module: model.value,
      }

      //修改验证码按钮状态禁用
      updateButtonStatus({
        status: true,
        text: '发送中',
      })

      setTimeout(() => {
        _getSms(requestData)
          .then((res) => {
            console.log(res.data.message)
            context.root.$message({
              showClose: true,
              message: res.data.message,
              type: 'success',
            })
            // 启用登入或注册按钮
            loginButtonStatus.value = false
            // 倒计时
            countDown(5)
          })
          .catch((err) => {
            console.log(err)
          })
      }, 1000)
    }

    // 提交表单
    const submitForm = (formName) => {
      // vue2.0=====> this.$refs[formName]
      context.refs[formName].validate((valid) => {
        if (valid) {
          if (model.value === 'register') {
            // 注册
            register()
          } else {
            // 登入
            login()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    //登入
    const login = () => {
      let reauestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: 'login',
      }
      _login(reauestData)
        .then((res) => {
          console.log(res)
          let data = res.data
          context.root.$message({
            showClose: true,
            message: data.message,
            type: 'success',
          })

          context.root.$router.push('/console')
        })
        .catch((err) => {
          console.log(err)
        })
    }

    //注册
    const register = () => {
      let reauestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: 'register',
      }
      _register(reauestData)
        .then((res) => {
          console.log(res)
          let data = res.data
          context.root.$message({
            showClose: true,
            message: data.message,
            type: 'success',
          })
          toggleMenu(menuTab[0])
        })
        .catch((err) => {
          console.log(err)
        })
    }

    // 倒计时
    const countDown = (num) => {
      let time = num
      if (timer.value) {
        clearInterval(timer.value)
      }
      timer.value = setInterval(() => {
        if (time < 0) {
          clearInterval(timer.value)
          updateButtonStatus({
            status: false,
            text: '重新发送',
          })
        } else {
          codeButton.text = `倒计时${time}秒`
          time--
        }
      }, 1000)
    }

    // 清除倒计时
    const clearCountDown = () => {
      updateButtonStatus({
        status: false,
        text: '获取验证码',
      })
      if (timer.value) {
        clearInterval(timer.value)
      }
    }

    // 更新按钮状态
    const updateButtonStatus = (buttonStatus) => {
      codeButton.status = buttonStatus.status
      codeButton.text = buttonStatus.text
    }

    // 生命周期
    /************************************************************** */
    onMounted()

    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButton,
      timer,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      onMounted,
      getSms,
      countDown,
    }
  },

  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
  display: flex;
}
.login-wrap {
  width: 330px;
  margin: auto;
  align-self: center;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: white;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    margin-bottom: 3px;
    display: block;
    font-size: 14px;
    color: #ffffff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
