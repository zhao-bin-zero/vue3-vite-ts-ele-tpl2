<!-- LoginForm -->
<template>
  <div class="login">
    <div class="login__title">欢迎登录！</div>
    <el-form class="login__form" :model="loginForm" @validate="validateFunc" :rules="rules" ref="loginFormInstance">
      <el-form-item prop="phone">
        <el-input v-model="loginForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-phone" maxlength="11">
          <!-- <template #prepend>
                <el-select v-model="select" placeholder="Select" style="width: 110px">
                  <el-option label="Restaurant" value="1"></el-option>
                </el-select>
              </template> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="sms_code">
        <el-input
          :class="{ 'append-disabled': !phoneIsValidate || countDownIsStart }"
          v-model="loginForm.sms_code"
          placeholder="请输入验证码"
          prefix-icon="el-icon-lock"
          maxlength="6"
        >
          <template #append>
            <div @click="sendCode" class="cursor-pointer">
              <count-down
                @endCallback="countDownEnd"
                :endTime="59"
                tipTextEnd="验证码已发送("
                endText="发送验证码"
                :isStart="countDownIsStart"
              />
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login__submit btn btn-100" @click="onLogin" :disabled="!phoneIsValidate || !codeIsValidate"
          >登录</el-button
        >
        <p class="login__tip">确认登录即默认您使用该手机号注册</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage, ElForm } from 'element-plus'
  import { useActions } from '@/store/use'
  import { login, LoginPostParams, sendSms } from '@/http/modules'
  import { setCookie } from '@/common/utils'
  import { validateCode, validateMobile } from '@/common/validate'
  import CountDown from '@/components/CountDown/index.vue'
  export default defineComponent({
    name: 'LoginFrom',
    components: {
      CountDown
    },
    setup() {
      // form实例
      let loginFormInstance = ref<typeof ElForm>()
      // 表单数据
      const loginForm = reactive<LoginPostParams>({
        phone: '',
        country_code: undefined,
        sms_code: ''
      })
      const router = useRouter()
      let phoneIsValidate = ref<boolean>(false) // 手机号是否验证通过
      let codeIsValidate = ref<boolean>(false) // 验证码是否验证通过

      // 验证规则
      const rules = {
        phone: [{ validator: validateMobile, trigger: ['blur', 'change'] }],
        sms_code: [{ validator: validateCode, trigger: 'change' }]
      }

      // 验证回调
      const validateFunc = (prop: string, bol: boolean) => {
        switch (prop) {
          case 'phone':
            if (bol) {
              phoneIsValidate.value = true
            } else {
              phoneIsValidate.value = false
            }
            break
          case 'sms_code':
            if (bol) {
              codeIsValidate.value = true
            } else {
              codeIsValidate.value = false
            }
            break
          default:
            break
        }
      }
      let countDownIsStart = ref<boolean>(false) // 验证码是否已经发送
      const countDownEnd = () => {
        countDownIsStart.value = false
      }
      // 发送验证码
      const sendCode = () => {
        if (countDownIsStart.value) return
        loginFormInstance.value?.validateField('phone', async (err: string) => {
          console.log('validateField', err)
          if (err) return false
          try {
            const { phone, country_code } = loginForm
            const { code, message } = await sendSms({ phone, country_code })
            if (code === 10000) {
              ElMessage({
                message: message,
                type: 'success'
              })
              countDownIsStart.value = true
            }
          } catch (error) {}
        })
      }
      const storeActions = useActions('info', ['getUser'])
      const onLogin = async () => {
        const bol: boolean = await loginFormInstance.value?.validate()
        if (!bol) return
        console.log('loginForm', loginForm)
        const { code, data } = await login(loginForm)
        if (code === 10000) {
          const { token } = data
          setCookie({
            name: 'token',
            value: token
          })
          storeActions.getUser()
          router.replace('/')
        }
      }
      return {
        loginForm,
        countDownIsStart,
        rules,
        loginFormInstance,
        phoneIsValidate,
        codeIsValidate,
        validateFunc,
        countDownEnd,
        sendCode,
        onLogin
      }
    }
  })
</script>
<style lang="scss" scoped>
  .login {
    .login__title {
      font-size: 36px;
      color: #333;
      line-height: 50px;
    }
    :deep(.login__form) {
      margin-top: 70px;
      .el-form-item {
        margin-bottom: 40px;
        .el-form-item__content {
          .el-input__inner {
            height: 62px;
            line-height: 62px;
          }
          .el-input--prefix {
            .el-input__inner {
              padding-left: 35px;
            }
            .el-input__prefix {
              line-height: 62px;
              color: $primaryColor;
              font-size: 20px;
            }
          }
          .el-input-group--append {
            .el-input-group__append {
              color: #fff;
              border-color: $primaryColor;
              background-color: $primaryColor;
              cursor: pointer;
            }
          }
          .append-disabled {
            &.el-input-group--append {
              .el-input-group__append {
                border-color: $primaryColor;
                background-color: $primaryColor;
                cursor: not-allowed;
              }
            }
          }
        }
        // &.is-error {
        //   border-color: var(--el-color-danger);
        // }
      }
    }
    .login__submit {
      margin-top: 30px;
      font-size: 28px;
      line-height: 40px;
      color: #fff;
      background: linear-gradient(270deg, #7eccbf 0%, $primaryColor 100%);
      &.is-disabled {
        &,
        &:hover,
        &:focus,
        &:active {
          opacity: 0.5;
          filter: alpha(opacity=50);
        }
      }
    }
    .login__tip {
      font-size: 16px;
      color: $primaryColor;
      line-height: 22px;
      margin: 30px 0;
      text-align: center;
    }
  }
</style>
