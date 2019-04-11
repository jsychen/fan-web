<template>
   <div class="content">
      <div class="crumbs">
         <router-link :to="{name: 'plan'}">快捷计划</router-link>
         <span> > 编辑计划</span>
      </div>
      <div class="part">
         <div class="title">
         <span>编辑计划</span>
         </div>
         <div class="part-content">
            <div class="orderForm">
               <div class="payMent">
                  预计支付金额：<span>￥{{job.totalPrice/100}}</span>
               </div>
               <form>
                  <div class="item">
                     <label>计划名称：</label>
                     <input type="text" placeholder="计划一" name="jobName" v-model="job.jobName">
                  </div>
                  <div class="item">
                     <label>开始时间：</label>
                     <DatePicker type="datetime" format="HH:mm" placeholder="选择时间" v-model.trim="job.startTime" name="startTime" :time-picker-options="{steps: [1, 10]}"></DatePicker>
                     <div class="clear"></div>
                  </div>
                  <div class="item">
                     <label>时长：</label>
                     <em @click="handleDuration(1)">-</em>
                     <input type="number" name="duration" v-model="job.duration">
                     <em @click="handleDuration(0)">+</em>
                  </div>
                  <div class="item">
                     <label>选购在线人气：</label>
                     <em @click="handleChangeNum(1)">-</em>
                     <input type="number" v-model.trim="job.number" name="number" @change="handleChangeNum(2)">
                     <em @click="handleChangeNum(0)">+</em>
                     <div class="clear"></div>
                  </div>
                  <div class="item">
                     <label>直播房间地址：</label>
                     <input type="text" name="liveUrl" v-model="job.liveUrl">
                     <div class="clear"></div>
                  </div>
                  <div class="item">
                     <label>人气均价：</label>
                     <span>{{job.unitPrice/100}}元 / 个 / 小时</span>
                     <div class="clear"></div>
                  </div>
                  <div class="formBtn">
                     <button class="blue" type="button" @click="doUpdatePlan">编辑计划</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
  </div>
</template>
<script>
let echarts = require("echarts");
import validate from "@/utils/validate";
import {getJobInfo, updatePlan} from '@/api/api';

export default {
   data: function () {
      return {
         payModal: true,
         job: {},
         id: null
      }
   },
   mounted: function () {
      this.doGetJobInfo();
   },
   methods: {
      // 获取计划详情
      doGetJobInfo: async function () {
         this.id = this.$route.query.id;
         let res = await getJobInfo(this.id);
         if(res.meta.code === 0){
            this.job = res.data;
         }
      },
      // 编辑计划
      doUpdatePlan: async function () {
         // 验证
         let validatorJson = [
            {
               name: 'jobName',
               label: '计划名称',
               rules: ['required']
            },
            {
               name: "startTime",
               label: "开始时间",
               rules: ['required']
            },
            {
               name: 'duration',
               label: '时长',
               rules: ['required']
            },
            {
               name: 'number',
               label: '在线人气',
               rules: ['required']
            },
            {
               name: 'liveUrl',
               label: '直播房间地址',
               rules: ['required', 'url', 'platform']
            }
         ];
         if(!validate(validatorJson)){
            return;
         }
         let res = await updatePlan(this.id, this.job);
         if(res.meta.code === 0){
            this.$Message.success('编辑成功');
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 修改人气数
      handleChangeNum: function (type) {
         let number = this.changeNum(this.job.number, type);
         this.job.number = number;
      },
      // 修改时长
      handleDuration: function (type) {
         let duration = this.changeNum(this.job.duration, type);
         this.job.duration = duration;
      },
      // 价格计算
      priceCount: function () {
         this.job.totalPrice = this.job.duration * this.job.unitPrice * this.job.number;
      }
   },
   watch: {
      'job.duration': function (){
         this.priceCount();
      },
      'job.number': function () {
         this.priceCount();
      }
   }
}
</script>
