<template>
   <div class="content">
      <div class="crumbs">
         <router-link :to="{name: 'plan'}">快捷计划</router-link>
         <span> > 创建计划</span>
      </div>
      <div class="part">
         <div class="title">
            <span>创建计划</span>
         </div>
         <div class="part-content">
            <div class="orderForm">
               <div class="payMent">
                  预计支付金额：<span>￥{{totalPrice/100}}</span>
               </div>
               <form>
                  <div class="item">
                     <label>计划名称：</label>
                     <input type="text" v-model="jobName" name="jobName">
                     <div class="clear"></div>
                  </div>
                  <div class="item">
                     <label>开始时间：</label>
                     <TimePicker type="time" format="HH:mm" placeholder="选择时间" :steps="[1, 10]" v-model="startTime" name="startTime"></TimePicker>
                     <div class="clear"></div>
                  </div>
                  <div class="item">
                     <label>时长：</label>
                     <em @click="handleDuration(1)">-</em>
                     <input type="number" name="duration" v-model="duration">
                     <em @click="handleDuration(0)">+</em>
                  </div>
                  <div class="item">
                     <label>选购在线人气：</label>
                     <em @click="handleNumber(1)">-</em>
                     <input type="number" v-model="number" name="number" @change="handleNumber(2)">
                     <em @click="handleNumber(0)">+</em>
                     <div class="clear"></div>
                  </div>
                  <div class="item">
                     <label>直播房间地址：</label>
                     <input type="text" v-model="liveUrl" name="liveUrl">
                     <div class="clear"></div>
                  </div>
                  <div class="item">
                     <label>人气均价：</label>
                     <span>{{unitPrice/100}}元 / 个 / 小时</span>
                     <div class="clear"></div>
                  </div>
                  <div class="formBtn">
                     <button class="blue" type="button" @click="doAddPlan">创建计划</button>
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
import {getPrice, addPlan} from '@/api/api';

export default {
   data: function () {
      return {
         unitPrice: 0,
         payModal: true,
         jobName: '',
         number: 0,
         startTime: '',
         duration: 0,
         liveUrl: '',
         totalPrice: 0
      }
   },
   mounted: function () {
      this.doGetPrice();
   },
   methods: {
      // 获取单价
      doGetPrice: async function () {
         let res = await getPrice();
         if(res.meta.code === 0){
            this.unitPrice = res.data.price;
            this.priceCount();
         }
      },
      // 创建计划
      doAddPlan: async function () {
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
         let data = {
            'duration': this.duration,
            'jobName': this.jobName,
            'liveUrl': this.liveUrl,
            'number': this.number,
            'startTime': this.startTime,
            'totalPrice': this.totalPrice,
            'unitPrice': this.unitPrice
         };
         let res = await addPlan(data);
         if(res.meta.code === 0){
            this.$Message.success('创建成功');
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 修改人气数
      handleNumber: function (type) {
         let number = this.changeNum(this.number, type);
         this.number = number;
      },
      // 修改时长
      handleDuration: function (type) {
         let duration = this.changeNum(this.duration, type);
         this.duration = duration;
      },
      // 价格计算
      priceCount: function () {
         this.totalPrice = this.duration * this.unitPrice * this.number;
      }
   },
   watch: {
      'duration': function (){
         this.priceCount();
      },
      'number': function () {
         this.priceCount();
      }
   }
}
</script>
