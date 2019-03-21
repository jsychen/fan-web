<template>
  <div class="content">
    <div class="platform">
      <div class="info">
        <p>28888</p>
        <span>直播间在线人气资源<br>企鹅电竞</span>
      </div>
      <img src="../../assets/images/qie.svg" alt="">
    </div>
    <div class="part">
      <div class="title">
        <span>人气定制</span>
      </div>
      <div class="part-content">
        <!-- <div class="echarts">
          <div id="echarts"></div>
          <p>购买的人气会在服务时间里按规律进入直播间保证平均每小时会有额外500人观看</p>
        </div> -->
        <div class="orderForm">
          <div class="payMent">
            支付金额：<span>￥{{job.totalPrice/100}}</span>
          </div>
          <form>
            <div class="item">
              <label>补充人气时间：</label>
              <!-- :time-picker-options="{steps: [1, 60]}" -->
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" v-model.trim="job.startTime" name="startTime"></DatePicker>
              <i>至</i>
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" v-model.trim="job.endTime" name="endTime"></DatePicker>
              <div class="clear"></div>
            </div>
            <div class="item">
              <label>选购在线人气：</label>
              <em>-</em>
              <input type="number" v-model.trim="job.number" name="number">
              <em>+</em>
              <p>所选时间段共有可用在线人气28888</p>
              <div class="clear"></div>
            </div>
            <div class="item">
              <label>直播房间地址：</label>
              <input type="text" v-model.trim="job.liveUrl" name="liveUrl">
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
            <i>298元</i>
          </div>
          <div class="item">
            <label>支付方式：</label>
            <span class="icon-wechat"></span>
            <em>微信</em>
          </div>
          <div class="qrcode">
            支付二维码
          </div>
          <p class="tip">请打开微信扫码支付</p>
        </div>
    </Modal>
  </div>
</template>
<script>
let echarts = require("echarts");

import validate from "@/utils/validate";
import { usePlan, getPrice} from '@/api/api';

export default {
  data: function () {
    return {
      payModal: false,
      job:{
         unitPrice: 0,
         number: 1,
         startTime: '2019-03-21 19:10:00',
         endTime: '2019-03-21 19:30:00',
         liveUrl: 'https://egame.qq.com/403517354'
      },
      // options: {
      //    startTime: {
      //       disabledDate (date) {
      //          return date.valueOf() <= new Date();
      //       }
      //    },
      //    endTime: {
      //       disabledDate (date) {
      //          return date.valueOf() <= new Date();
      //       }
      //    }
      // }
    }
  },
  mounted: function () {
   //  this.initEcharts();
    this.doGetPrice();
  },
  methods: {
    initEcharts: function () {
      // 指定图表的配置项和数据
      let myChart = echarts.init(document.getElementById('echarts'));
      let arr = [0,200,500,100,0];
      let option = {
        color: ['#0ece5b'],
        xAxis: {
            type: 'category',
            data: ['11:00', '12:00', '13:00', '14:00', '15:00'],
            nameTextStyle: {
              color: '#999'
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
        },
        grid: {
          top: "20",
          bottom: '30',
          left: '40',
          right: '10'
        },
        yAxis: {
            type: 'value',
            splitLine: { 
              color: '#ccc'
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            }
        },
        series: [{
            data: [0, 200, 500, 100, 0],
            type: 'line'
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true);
    },
    // 获取人气单价
   doGetPrice: async function () {
      let res = await getPrice();
      if(res.meta.code === 0){
         this.job.unitPrice = res.data.price;
         this.handleNumberChange();
      }
   },
   //  人气定制
   doSubmit: async function () {
      // 验证
      let validatorJson = [
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
            rules: ['required', 'platform']
         }
      ];
      if(!validate(validatorJson)){
         return;
      }
      let data = {...this.job};

      data.startTime = this.dateConversion(data.startTime);
      data.endTime = this.dateConversion(data.endTime);
      data.type = 0;
      
      let res = await usePlan(data);
      if(res.meta.code === 0){
         if(res.data){
            this.qrcodeStr = res.data;
            this.payModal = true;
         } else {
            this.$Message.success('支付成功');
         }
         return;
      }
      this.$Message.error(res.meta.message);
   },
   // 修改人气数
   handleNumberChange: function () {
      let job = this.job;
      job.totalPrice = parseInt(job.unitPrice * job.number);
   }
  }
}
</script>
