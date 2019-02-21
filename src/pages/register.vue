<template>
  <div class="container">
    <div class="login">
      <div class="head">
        <img src="../assets/images/logo.svg" alt="">
        <div class="title">
          <p>粉丝管理平台</p>
          <span>evtape.fans.com</span>
        </div>
      </div>
      <form id="myForm">
        <div class="formLine">
          <span class="icon-user"></span>
          <input type="text" placeholder="填写2-12个字的中英文昵称" name="nickName">
        </div>
        <div class="formLine">
          <span class="icon-phone"></span>
          <input type="text" placeholder="填写11位手机号码" name="phoneNumber">
        </div>
        <div class="code">
          <div class="formLine">
            <span class="icon-verification"></span>
            <input type="text" placeholder="输入短信收到的验证码" name="verificationCode">
          </div>
          <button class="button" type="button">获取验证码</button>
        </div>
        <div class="formLine">
          <span class="icon-inviter"></span>
          <input type="text" placeholder="请填写邀请人的名字" name="phoneNumber">
        </div>
        <button class="button" type="submit">注册并等待审核</button>
        <p>审核完成后会发送短信通知，请注意查看</p>
        <p>已有账号，<a href="javascript:;">返回登录</a></p>
      </form>
    </div>
  </div>
</template>

