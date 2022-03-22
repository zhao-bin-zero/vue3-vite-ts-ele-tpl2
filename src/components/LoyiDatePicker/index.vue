<template>
  <div class="loyi__date">
    <span v-if="periods.indexOf(1) !== -1" @click="datePeriod(1)">本周</span>
    <span v-if="periods.indexOf(2) !== -1" @click="datePeriod(2)">本月</span>
    <span v-if="periods.indexOf(3) !== -1" @click="datePeriod(3)">全年</span>
    <el-date-picker
      v-model="times"
      :type="type"
      unlink-panels
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :value-format="valueFormat"
      :format="format"
      @change="changeTime"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { getNowDay, getStartDayOfMonth, getStartDayOfWeek, getStartDayOfYear } from '@/common/elementFun'
  export default defineComponent({
    name: 'LoyiDatePicker',
    props: {
      periods: {
        type: Array,
        default: () => [] // 1本周，2本月，3全年
      },
      type: {
        type: String,
        default: 'monthrange'
      },
      startTime: {
        type: String,
        default: ''
      },
      endTime: {
        type: String,
        default: ''
      },
      valueFormat: {
        type: String,
        default: 'YYYY.MM'
      },
      format: {
        type: String,
        default: 'YYYY.MM'
      }
    },
    emits: ['update:startTime', 'update:endTime', 'change'],
    setup(props, { emit }) {
      // const startTime = ref('2014/10')
      // const endTime = ref('2017/10')
      const times = ref<string[]>([])
      watch(
        () => [props.startTime, props.endTime],
        (n, o = []) => {
          if (n[0] !== o[0] || n[1] !== o[1]) {
            times.value = n
          }
        },
        {
          deep: true,
          immediate: true
        }
      )
      const datePeriod = (period: number) => {
        let times: string[] = []
        if (period === 1) {
          times = [getStartDayOfWeek(), getNowDay()]
        } else if (period === 2) {
          times = [getStartDayOfMonth(), getNowDay()]
        } else if (period === 3) {
          times = [getStartDayOfYear(), getNowDay()]
        } else {
        }
        changeTime(times)
      }
      const changeTime = (times: string[]) => {
        // console.log(1, times)
        emit('update:startTime', times ? times[0] : '')
        emit('update:endTime', times ? times[1] : '')
        emit('change')
      }
      return {
        times,
        datePeriod,
        changeTime
      }
    }
  })
</script>
<style lang="scss" scoped>
  .loyi__date {
    > span {
      cursor: pointer;
      margin: 0 10px;
      &:nth-child(3) {
        margin-right: 40px;
      }
    }
  }
</style>
