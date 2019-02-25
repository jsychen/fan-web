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
        <button class="button" type="button">充值</button>
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
              <span class="blue">人气图标</span>
              <span class="red">撤销订单</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
