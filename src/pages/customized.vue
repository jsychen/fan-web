<template>
  <div class="content">
    <div class="platform">
      <div class="info">
        <p>28888</p>
        <span>直播间在线人气资源<br>企鹅电竞</span>
      </div>
      <img src="../assets/images/qie.svg" alt="">
    </div>
    <div class="part">
      <div class="title">
        <span>人气定制</span>
      </div>
      <div class="part-content">
        <div id="echarts">
        </div>
        <div class="orderForm">
          <div class="payMent">
            支付金额：<span>￥298</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts");
export default {
  data: function () {
    return {}
  },
  mounted: function () {
    this.initEcharts();
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
    }
  }
}
</script>
