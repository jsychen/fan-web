<template>
  <div class="content">
    <div class="part">
      <div class="title"><span>账户信息</span></div>
      <div class="basic">
        <div class="item">
          <label>用户昵称：</label>
          <em>jsychen</em>
          <span class="icon-edit"></span>
        </div>
        <div class="item">
          <label>联系手机：</label>
          <em>13621371454</em>
        </div>
      </div>
      <div class="balance">
        <p>账户余额：</p>
        <label>￥0.00</label>
        <button class="button" type="button" @click="rechargeModal = true;">充值</button>
      </div>
    </div>
    <div class="part mT20">
      <div class="title"><span>已购订单</span></div>
      <div class="table">
        <table>
          <tr>
            <th>下单时间</th>
            <th>补充人气时间</th>
            <th>在线人气</th>
            <th>直播房间</th>
            <th>订单价格</th>
            <th>支付方式</th>
            <th>订单状态</th>
            <th>操作</th>
          </tr>
          <tr>
            <td>2019-2-22</td>
            <td>2019-2-23 20:00 至 2019-2-23 23:00</td>
            <td>200</td>
            <td>https://egame.qq.com/314628863</td>
            <td>￥100.00</td>
            <td>微信支付</td>
            <td>待进入服务</td>
            <td>
              <a href="javascript:;" class="blue" @click="showEchart">人气图标</a>
              <a href="javascript:;" class="red" @click="cancelOrder">撤销订单</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 充值 -->
    <!-- 支付订单 -->
    <Modal
        v-model="rechargeModal"
        title="账户充值"
        width="540"
        footer-hide>
        <div class="recharge">
          <div class="left">
            <p>支付金额</p>
            <ul>
              <li :class="{'active': item === amount}" v-for="item in rechargeArr" :key="item">{{item}}元</li>
            </ul>
            <p>支付方式</p>
            <p>
              <span class="icon-wechat"></span>
              <em>微信</em>
            </p>
          </div>
          <div class="right">
            <div class="qrcode">
              <img :src="qrcode" v-if="qrcode">
              支付二维码
            </div>
            
            <p class="tip">请打开微信扫码支付</p>
          </div>
        </div>
    </Modal>
    <!-- 人气图标 -->
    <Modal
        v-model="echartModal"
        title="人气图表"
        width="360"
        footer-hide>
        <div id="echarts"></div>
    </Modal>
  </div>
</template>
<script>
let echarts = require("echarts");
export default {
  data: function () {
    return {
      rechargeModal: false,
      echartModal: false,
      rechargeArr: [200, 500, 2000],
      qrcode: '',
      amount: 200
    }
  },
  mounted: function () {
  },
  methods: {
    
    // 显示人气图表
    showEchart: function () {
      this.echartModal = true;
      this.initEcharts();

    },
    // 初始化图表
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
    // 撤销订单
    cancelOrder: function () {
      this.$Modal.confirm({
        title: '确认撤销订单吗？',
        content: '',
        onOk: () => {
          console.log('Clicked ok');
        },
        onCancel: () => {
          console.log('Clicked cancel');
        }
      })
    }
  }
}
</script>

