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
                     <label>补充人气时间：</label>
                     <TimePicker type="time" format="HH:mm" placeholder="选择时间" :steps="[1, 60]" v-model="startTime" name="startTime"></TimePicker>
                     <i>至</i>
                     <TimePicker type="time" format="HH:mm" placeholder="选择时间" :steps="[1, 60]" v-model="endTime" name="endTime"></TimePicker>
                     <div class="clear"></div>
                  </div>
                  <div class="item">
                     <label>选购在线人气：</label>
                     <em @click="handleChangeNum(1)">-</em>
                     <input type="number" v-model="number" name="number" @change="handleChangeNum(2)">
                     <em @click="handleChangeNum(0)">+</em>
                     <p>所选时间段共有可用在线人气28888</p>
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
         jobName: '计划一',
         number: 500,
         startTime: '19:00',
         endTime: '23:00',
         liveUrl: 'https://egame.qq.com/895462',
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
            this.totalPrice = this.unitPrice * this.number;
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
               name: 'endTime',
               label: '结束时间',
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
            'endTime': this.endTime,
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
      handleChangeNum: function (type) {
         let number = this.changeNum(this.number, type);
         this.number = number;
         this.totalPrice = number * this.unitPrice;
      }
   }
}
</script>
