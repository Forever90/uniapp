<template>
  <view class="login-page">
    <view class="login-header">
      <text class="title">优学教育</text>
      <text class="subtitle">知识改变未来</text>
    </view>
    
    <view class="login-form">
      <input 
        class="input" 
        type="text" 
        v-model="phone" 
        placeholder="请输入手机号"
        placeholder-class="input-placeholder"
      />
      <input 
        class="input" 
        type="password" 
        v-model="password" 
        placeholder="请输入密码"
        placeholder-class="input-placeholder"
      />
      <button class="btn-login" @tap="handleLogin" :disabled="loading">
        {{ loading ? '登录中...' : '登 录' }}
      </button>
      <view class="register-link">
        还没有账号？<text class="link" @tap="goToRegister">立即注册</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const phone = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (!phone.value || !password.value) {
    uni.showToast({
      title: '请输入手机号和密码',
      icon: 'none'
    })
    return
  }
  
  loading.value = true
  try {
    const response = await store.dispatch('user/login', {
      phone: phone.value,
      password: password.value
    })
    if (response.data.code == 200) {
		uni.showToast({
		  title: '登录成功',
		  icon: 'success'
		});
		setTimeout(() => {
		  uni.switchTab({
		    url: '/pages/index/index'
		  })
		}, 1500)
	} else {
		uni.showToast({
		  title: '登录失败',
		  icon: 'fail'
		});
	}

    

  } catch (error) {
    uni.showToast({
      title: '登录失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

const goToRegister = () => {
  uni.showToast({
    title: '注册功能开发中',
    icon: 'none'
  })
}
</script>

<style lang="scss">
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  padding: 40px 20px;
  
  .login-header {
    text-align: center;
    margin-bottom: 60px;
    color: #fff;
    
    .title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
      display: block;
    }
    
    .subtitle {
      font-size: 16px;
      opacity: 0.8;
    }
  }
  
  .login-form {
    background: rgba(255, 255, 255, 0.1);
    padding: 30px 20px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    
    .input {
      height: 50px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      margin-bottom: 20px;
      padding: 0 15px;
      color: #fff;
      font-size: 16px;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }
    
    .btn-login {
      width: 100%;
      height: 50px;
      background: #fff;
      color: #1e40af;
      font-size: 16px;
      font-weight: bold;
      border-radius: 12px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .register-link {
      text-align: center;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      
      .link {
        color: #fff;
        margin-left: 5px;
      }
    }
  }
}
</style> 