<template>
   <div class="content">
      <div class="crumbs">
         <router-link :to="{name: 'plan'}">快捷计划</router-link>
         <span> > 使用计划</span>
      </div>
      <div class="part">
         <div class="title">
         <span>使用计划</span>
         </div>
         <div class="part-content">
            <div class="orderForm">
               <div class="payMent">
                  预计支付金额：<span>￥{{job.totalPrice/100}}</span>
               </div>
               <form>
                  <div class="item">
                     <label>开始时间：</label>
                     <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" :time-picker-options="{steps: [1, 10]}" v-model.trim="job.startTime" name="startTime" @on-change="handleGetExecutable"></DatePicker>
                  </div>
                  <div class="item">
                     <label>时长：</label>
                     <em @click="handleDuration(1)">-</em>
                     <input type="number" name="duration" v-model="job.duration" @change="handleDuration(2)">
                     <em @click="handleDuration(0)">+</em>
                  </div>
                  <div class="item">
                     <label>选购在线人气：</label>
                     <em @click="handleNumber(1)">-</em>
                     <input type="number" v-model.trim="job.number" name="number" @change="handleNumber(2)">
                     <em @click="handleNumber(0)">+</em>
                     <p class="red">所选时间段共有可用在线人气{{executable}}</p>
                     <div class="clear"></div>
                  </div>
                  <div class="item">
                     <label>直播房间地址：</label>
                     <input type="text" name="liveUrl" v-model.trim="job.liveUrl">
                     <div class="clear"></div>
                  </div>
                  <div class="item">
                     <label>人气均价：</label>
                     <span>{{job.unitPrice/100}}元 / 个 / 小时</span>
                     <div class="clear"></div>
                  </div>
                  <div class="formBtn">
                     <button class="red" type="button" @click="doSubmit">
                        <span class="icon-cart"></span>
                        <i>购买人气</i>
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
      <!-- 支付订单 -->
      <Modal
         v-model="payModal"
         title="支付订单"
         width="300"
         footer-hide>
         <div class="pay-content">
            <div class="item">
               <label>支付金额：</label>
               <i>{{job.totalPrice/100}}元</i>
            </div>
            <div class="item">
               <label>支付方式：</label>
               <span class="icon-wechat"></span>
               <em>微信</em>
            </div>
            <div class="qrcode">
               <img :src="qrcodeStr" alt="支付二维码">
            </div>
            <p class="tip">请打开微信扫码支付</p>
         </div>
      </Modal>
   </div>
</template>
<script>
let echarts = require("echarts");

import validate from "@/utils/validate";
import {getJobInfo, usePlan, getPrice, getExecutable} from '@/api/api';

export default {
   data: function () {
      return {
         payModal: false,
         job: {},
         id: null,
         qrcodeStr: '',
         duration: 1,
         executable: 0
      }
   },
   mounted: function () {
      this.doGetJobInfo();
      this.handleGetExecutable();
   },
   methods: {
      // 获取人气单价
      doGetPrice: async function () {
         let res = await getPrice();
         if(res.meta.code === 0){
            this.priceCount();
         }
      },
      // 获取计划详情
      doGetJobInfo: async function () {
         this.id = this.$route.query.id;
         let res = await getJobInfo(this.id);
         if(res.meta.code === 0){
            this.job = res.data;
            let date = new Date();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let dateStr = date.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
            this.job.startTime = dateStr + ' ' + this.job.startTime;
            this.job.endTime = dateStr + ' ' + this.job.endTime;
            this.handleGetExecutable();
            this.doGetPrice();
         }
      },
      // 购买人气
      doSubmit: async function () {
         // 验证
         let validatorJson = [
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
         let data = {...this.job};

         data.startTime = this.dateConversion(data.startTime);
         data.type = 0;

         let res = await usePlan(data);
         if(res.meta.code === 0){
            if(res.data){
               this.qrcodeStr = res.data;
               this.payModal = true;
            } else {
               this.$Message.success('支付成功');
            }
            setTimeout( () => {
               this.$router.push({'name': 'plan'});
            }, 2000);
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 修改人气数
      handleNumber: function (type) {
         let number = this.changeNum(this.job.number, type);
         if(number >= this.executable){
            this.job.number = this.executable;
            return;
         }
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
      },
      // 获取可用人气数
      handleGetExecutable: async function () {
         let startTime = this.job.startTime;
         startTime && (startTime = this.dateConversion(startTime));
         let duration = this.job.duration;
         let data = {
            startTime: startTime,
            duration: duration
         }
         let res = await getExecutable(data);
         if(res.meta.code === 0){
            this.executable = res.data;
            !startTime && (this.maxExecutable = res.data);
            if(this.job.number >= this.executable){
               this.job.number = this.executable;
            }
         }
      }
   },
   watch: {
      'job.duration': function (){
         this.priceCount();
         this.handleGetExecutable();
      },
      'job.number': function () {
         this.priceCount();
      }
   }
}
</script>
