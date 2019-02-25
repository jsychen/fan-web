<template>
  <div class="content">
    <div class="part">
      <div class="title">
        <span>编辑计划</span>
      </div>
      <div class="part-content">
        <div class="echarts">
          <div id="echarts"></div>
          <p>购买的人气会在服务时间里按规律进入直播间保证平均每小时会有额外500人观看</p>
        </div>
        <div class="orderForm">
          <div class="payMent">
            预计支付金额：<span>￥298</span>
          </div>
          <form>
            <div class="item">
              <label>计划名称：</label>
              <input type="text" placeholder="计划一">
            </div>
            <div class="item">
              <label>选择相对日期：</label>
              <select>
                <option v-for="item in date" :value="item.value" :key="item.value">{{ item.label }}</option>
            </select>
            </div>
            <div class="item">
              <label>补充人气时间：</label>
              <TimePicker type="time" format="HH:mm" placeholder="选择时间" :steps="[1, 60]"></TimePicker>
              <i>至</i>
              <TimePicker type="time" format="HH:mm" placeholder="选择时间" :steps="[1, 60]"></TimePicker>
              <div class="clear"></div>
            </div>
            <div class="item">
              <label>选购在线人气：</label>
              <em>-</em>
              <input type="number">
              <em>+</em>
              <p>所选时间段共有可用在线人气28888</p>
              <div class="clear"></div>
            </div>
            <div class="item">
              <label>直播房间地址：</label>
              <input type="text">
              <div class="clear"></div>
            </div>
            <div class="item">
              <label>人气均价：</label>
              <span>0.3元 / 个 / 小时</span>
              <div class="clear"></div>
            </div>
            <div class="formBtn">
              <button class="blue" type="button">创建计划</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts");
export default {
  data: function () {
    return {
      payModal: true,
      date: [
        {value: 0, label: '今天'},
        {value: 1, label: '明天'},
        {value: 2, label: '后天'},
        {value: 3, label: '大后天'}
      ]
    }
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
