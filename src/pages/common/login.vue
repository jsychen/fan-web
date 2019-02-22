<template>
  <div class="container">
    <div class="login">
      <div class="head">
        <img src="../../assets/images/logo.svg" alt="">
        <div class="title">
          <p>粉丝管理平台</p>
          <span>evtape.fans.com</span>
        </div>
      </div>
      <form id="myForm">
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
        <button class="button" type="submit">立即登录</button>
        <p>没有账号，<a href="javascript:;">立即注册</a></p>
      </form>
    </div>
  </div>
</template>

