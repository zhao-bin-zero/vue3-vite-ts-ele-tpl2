<template>
  <div class="loyi-pagination justify-flex-end">
    <el-pagination
      class="loyi-pagination-content"
      :current-page="currentPage"
      background
      hide-on-single-page
      :page-sizes="pageSizesArr"
      :page-size="pageSize"
      layout="prev, pager, next, sizes, total, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  // interface PaginationSetupData {
  //   pageSizesArr: number[]
  //   current_page: number
  //   handleSizeChange: (val: number) => void
  //   handleCurrentChange: (val: number) => void
  // }
  export default defineComponent({
    name: 'LoyiPagination',
    props: {
      total: {
        type: Number,
        required: true
      },
      pageSize: {
        type: Number,
        default: 20
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    emits: ['update:pageSize', 'getList'],
    setup(props, context) {
      //分页
      const pageSizesArr = [20, 40, 50, 80, 100]
      // let current_page = ref(props.currentPage)
      const handleSizeChange = (val: number) => {
        console.log(val)
        context.emit('update:pageSize', val)
        context.emit('getList', 1)
      }
      const handleCurrentChange = (val: number) => {
        console.log(val)
        context.emit('getList', val)
      }
      return {
        pageSizesArr,
        // current_page,
        handleSizeChange,
        handleCurrentChange
      }
    }
  })
</script>
<style lang="scss" scoped>
  .loyi-pagination {
    font-size: 14px;
    margin-top: 20px;
    :deep(.loyi-pagination-content) {
      &.is-background {
        .btn-next,
        .btn-prev,
        .el-pager li {
          background-color: #fff;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
        }
        .el-pager li:not(.disabled).active {
          background-color: $primaryColor;
          color: #fff;
          border: 0 none;
        }
        // .el-pagination__sizes {
        //   margin-right: 136px;
        // }
      }
    }
  }
</style>
