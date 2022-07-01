<!-- https://gitee.com/null_639_5368/mv-count-down/blob/master/src/views/Home.vue -->
<template>
  <div class="mv-count-down">
    <p v-if="msTime.show">
      <span v-if="tipShow">{{ tipText }}</span>
      <span v-if="!tipShow">{{ tipTextEnd }}</span>
      <span v-if="msTime.day">
        <span>{{ msTime.day }} </span>
        <i>{{ dayTxt }}</i>
      </span>
      <span v-if="msTime.hour">
        <span>{{ msTime.hour }}</span>
        <i>{{ hourTxt }}</i>
      </span>
      <span v-if="msTime.minutes">
        <span>{{ msTime.minutes }}</span>
        <i>{{ minutesTxt }}</i>
      </span>
      <span>{{ msTime.seconds }}</span>
      <i>{{ secondsTxt }}</i>
      <span v-if="tipShow">{{ tipText[tipText.length - 1] === '(' ? ')' : '' }}</span>
      <span v-if="!tipShow">{{ tipTextEnd[tipTextEnd.length - 1] === '(' ? ')' : '' }}</span>
    </p>
    <p v-if="!msTime.show">{{ endText }}</p>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, watch } from 'vue'
  export default defineComponent({
    name: 'CountDown',
    props: {
      // 控制倒计时
      isStart: {
        type: Boolean,
        default: false
      },
      //距离开始提示文字
      tipText: {
        type: String,
        default: ''
      },
      //距离结束提示文字
      tipTextEnd: {
        type: String,
        default: ''
      },
      //时间控件ID
      id: {
        type: String,
        default: '1'
      },
      //当前时间
      currentTime: {
        type: Number,
        default: 0
      },
      // 活动开始时间
      startTime: {
        type: Number,
        default: new Date().getTime()
      },
      // 活动结束时间(可以是秒数或者时间戳)
      endTime: {
        type: Number,
        default: 0
      },
      // 倒计时结束显示文本
      endText: {
        type: String,
        default: ''
      },
      //自定义显示文字:天
      dayTxt: {
        type: String,
        default: ':'
      },
      //自定义显示文字:时
      hourTxt: {
        type: String,
        default: ':'
      },
      //自定义显示文字:分
      minutesTxt: {
        type: String,
        default: ':'
      },
      secondsTxt: {
        type: String,
        default: ''
      }
      //是否开启秒表倒计，未完成
      // secondsFixed: {
      //   type: Boolean,
      //   default: false
      // }
    },
    emits: ['endCallback', 'start_callback', 'startCallback'],
    setup(props, { emit }) {
      const tipShow = ref(true)
      const msTime = reactive({
        //倒计时数值
        show: false, //倒计时状态
        day: 0, //天
        hour: 0, //小时
        minutes: 0, //分钟
        seconds: 0 //秒
      })
      const star = ref<number>(0) //活动开始时间
      const end = ref<number>(0) //活动结束时间
      const current = ref<number>(0) //当前时间
      const runTime = (startTime: number, endTime: number, callFun: Function, type?: boolean) => {
        // let msTime = msTime
        let timeDistance = startTime - endTime
        // console.log(timeDistance)
        if (timeDistance > 0 && Math.floor(timeDistance / 1000) !== 0) {
          msTime.show = true
          msTime.day = Math.floor(timeDistance / 86400000)
          timeDistance -= msTime.day * 86400000
          msTime.hour = Math.floor(timeDistance / 3600000)
          timeDistance -= msTime.hour * 3600000
          msTime.minutes = Math.floor(timeDistance / 60000)
          timeDistance -= msTime.minutes * 60000
          //是否开启秒表倒计,未完成
          //                    this.secondsFixed ? msTime.seconds = new Number(timeDistance / 1000).toFixed(2) : msTime.seconds = Math.floor( timeDistance / 1000 ).toFixed(0);
          msTime.seconds = Math.floor(timeDistance / 1000)
          timeDistance -= msTime.seconds * 1000

          // if (msTime.hour < 10) {
          //   msTime.hour = Number('0' + msTime.hour)
          // }
          // if (msTime.minutes < 10) {
          //   msTime.minutes = Number('0' + msTime.minutes)
          // }
          // if (msTime.seconds < 10) {
          //   msTime.seconds = Number('0' + msTime.seconds)
          // }
          // let _s = Date.now()
          // let _e = Date.now()
          // let diffPerFunc = _e - _s
          setTimeout(() => {
            if (type) {
              runTime(end.value, (endTime += 1000), callFun, true)
            } else {
              runTime(star.value, (endTime += 1000), callFun)
            }
          }, 1000)
        } else {
          callFun()
        }
      }
      const start_message = () => {
        tipShow.value = false
        emit('startCallback', msTime.show)
        setTimeout(() => {
          runTime(end.value, star.value, end_message, true)
        }, 1)
      }
      const end_message = () => {
        msTime.show = false
        // if (props.currentTime <= 0) {
        //   return
        // }
        emit('endCallback', msTime.show)
      }
      const gogogo = () => {
        //判断是秒还是毫秒
        props.startTime.toString().length === 10 ? (star.value = props.startTime * 1000) : (star.value = props.startTime)
        if (props.endTime.toString().length < 10) {
          let curTime = new Date()
          end.value = new Date(curTime.setSeconds(curTime.getSeconds() + props.endTime)).getTime()
        } else if (props.endTime.toString().length === 10) {
          end.value = props.endTime * 1000
        } else {
          end.value = props.endTime
        }
        // console.log(end.value)

        if (props.currentTime) {
          props.currentTime.toString().length === 10
            ? (current.value = props.currentTime * 1000)
            : (current.value = props.currentTime)
        } else {
          current.value = new Date().getTime()
        }

        if (end.value < current.value) {
          /**
           * 结束时间小于当前时间 活动已结束
           */
          // msTime.show = false
          end_message()
        } else if (current.value < star.value) {
          /**
           * 当前时间小于开始时间 活动尚未开始
           */
          tipShow.value = true
          setTimeout(() => {
            runTime(star.value, current.value, start_message)
          }, 1)
        } else if ((end.value > current.value && star.value < current.value) || star.value === current.value) {
          /**
           * 结束时间大于当前并且开始时间小于当前时间，执行活动开始倒计时
           */
          msTime.show = true
          tipShow.value = false
          emit('start_callback', msTime.show)
          setTimeout(() => {
            runTime(end.value, current.value, end_message, true)
          }, 1)
        }
      }
      watch(
        () => props.isStart,
        (n) => {
          if (n) {
            gogogo()
          }
        },
        {
          immediate: true
        }
      )
      watch(
        () => props.currentTime,
        () => {
          gogogo()
        }
      )
      return {
        tipShow,
        msTime
      }
    }
  })
</script>
<style lang="scss" scoped>
  // .mv-count-down {
  //   font-size: 20px;
  //   font-family: '黑体';
  // }
  // i {
  //   font-style: initial;
  // }
</style>
