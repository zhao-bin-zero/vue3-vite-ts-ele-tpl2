<!-- 二维码 -->
<template>
  <img src="" alt="" ref="qrCodeWithLogo" />
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import QrCodeWithLogo from 'qr-code-with-logo'
  import logoImg from '@assets/images/avatar.png'
  export default defineComponent({
    name: 'LoyiQrCode',
    props: {
      codeSrc: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const qrCodeWithLogo = ref<Element | undefined>(undefined)

      const setQrCodeWithLogo = () => {
        // console.log(qrCodeWithLogo.value, props.codeSrc)
        QrCodeWithLogo.toImage({
          image: qrCodeWithLogo.value, // 换成你的img节点
          content: props.codeSrc,
          width: 200,
          nodeQrCodeOptions: {
            margin: 1
          },
          logo: {
            src: logoImg,
            logoRadius: 8,
            logoSize: 0.22
          }
        })
      }
      onMounted(() => {
        setQrCodeWithLogo()
      })
      return {
        qrCodeWithLogo
      }
    }
  })
</script>
<style lang="scss" scoped></style>
