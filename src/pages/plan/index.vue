<template>
  <div class="content">
    <div class="pannel">
      <div class="part">
        <div class="title">
          <span>创建计划</span>
        </div>
        <div class="pannel-content">
          <p>使用相对时间创建一个计划，之后点击该计划，日期就会根据当前时间自动变更，点击计划后就可以快速定制自己的直播间人气热度。</p>
          <p>由于人气价格为动态变化的，因此使用计划时，实际支付价格可能与预计支付金额略有差异。</p>
          <router-link class="newBtn" tag="a" :to="{name: 'addPlan'}">+ 创建一个计划</router-link>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="pannel">
      <div class="part">
        <div class="title">
          <span>计划一</span>
          <em></em>
        </div>
        <div class="detail">
          <div class="item">
            <label>预计支付金额：</label>
            <span>￥298</span>
          </div>
          <div class="item">
            <label>选择相对日期：</label>
            <span>2019-2-24</span>
          </div>
          <div class="item">
            <label>补充人气时间：</label>
            <span>19:00</span>
            <i>至</i>
            <span>23:00</span>
          </div>
          <div class="item">
            <label>直播房间地址：</label>
            <span>https://</span>
          </div>
          <div class="item">
            <label>选购在线人气：</label>
            <span>500</span>
          </div>
        </div>
        <button class="button" type="button">使用计划</button>
      </div>
      <div class="part">
        <div class="title">
          <span>计划一</span>
          <em></em>
        </div>
        <div class="detail">
          <div class="item">
            <label>预计支付金额：</label>
            <span>￥298</span>
          </div>
          <div class="item">
            <label>选择相对日期：</label>
            <span>2019-2-24</span>
          </div>
          <div class="item">
            <label>补充人气时间：</label>
            <span>19:00</span>
            <i>至</i>
            <span>23:00</span>
          </div>
          <div class="item">
            <label>直播房间地址：</label>
            <span>https://</span>
          </div>
          <div class="item">
            <label>选购在线人气：</label>
            <span>500</span>
          </div>
        </div>
        <button class="button" type="button">使用计划</button>
      </div>
    </div>
  </div>
</template>
