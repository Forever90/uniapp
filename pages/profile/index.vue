<template>
  <view class="profile-page">
    <!-- 未登录状态 -->
    <view class="profile-not-login" v-if="!isLoggedIn">
      <image src="/static/images/not-login.png" mode="aspectFit" class="not-login-image" />
      <text class="title">您还未登录</text>
      <text class="subtitle">登录后查看个人信息</text>
      <button class="btn-login" @tap="goLogin">立即登录</button>
    </view>
    
    <!-- 已登录状态 -->
    <block v-else>
      <view class="profile-header">
        <image class="avatar" src="/static/images/avatar.png" mode="aspectFill" />
        <text class="name">{{ userInfo.name }}</text>
        <text class="class-info">{{ userInfo.className }}</text>
        <button class="btn-logout" @tap="handleLogout">退出登录</button>
      </view>
      
      <!-- 导航按钮 -->
      <view class="profile-nav">
        <view class="nav-item" @tap="showSection('personal-info')">
          <view class="nav-icon">👤</view>
          <text class="nav-title">个人信息</text>
          <text class="nav-desc">查看和编辑个人资料</text>
        </view>
        <view class="nav-item" @tap="showSection('scores')">
          <view class="nav-icon">📊</view>
          <text class="nav-title">个人成绩</text>
          <text class="nav-desc">查看和编辑成绩信息</text>
        </view>
      </view>
      
      <!-- 个人信息部分 -->
      <view class="info-section" v-show="currentSection === 'personal-info'">
        <!-- 基本信息 -->
        <view class="info-card">
          <view class="card-header">
            <text class="card-title">基本信息</text>
            <button class="btn-edit" @tap="editInfo('basic')">编辑</button>
          </view>
          <view class="info-item">
            <text class="label">姓名</text>
            <text class="value">{{ userInfo.name }}</text>
          </view>
          <view class="info-item">
            <text class="label">学号</text>
            <text class="value">{{ userInfo.studentId }}</text>
          </view>
          <view class="info-item">
            <text class="label">年级班级</text>
            <text class="value">{{ userInfo.className }}</text>
          </view>
        </view>
        
        <!-- 联系方式 -->
        <view class="info-card">
          <view class="card-header">
            <text class="card-title">联系方式</text>
            <button class="btn-edit" @tap="editInfo('contact')">编辑</button>
          </view>
          <view class="info-item">
            <text class="label">手机号码</text>
            <text class="value">{{ userInfo.phone }}</text>
          </view>
          <view class="info-item">
            <text class="label">家长姓名</text>
            <text class="value">{{ userInfo.parentName }}</text>
          </view>
          <view class="info-item">
            <text class="label">家庭住址</text>
            <text class="value">{{ userInfo.address }}</text>
          </view>
        </view>
      </view>
      
      <!-- 成绩信息部分 -->
      <view class="info-section" v-show="currentSection === 'scores'">
        <view class="info-card">
          <view class="card-header">
            <text class="card-title">科目成绩</text>
            <button class="btn-edit" @tap="editInfo('scores')">编辑</button>
          </view>
          <view class="info-item" v-for="(score, subject) in userInfo.scores" :key="subject">
            <text class="label">{{ subject }}</text>
            <text class="value">{{ score.score }}分 - {{ score.level }}</text>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const currentSection = ref('personal-info')

// 从vuex获取登录状态和用户信息
const isLoggedIn = computed(() => store.getters['user/isLoggedIn'])
const userInfo = computed(() => store.getters['user/userInfo'])

const goLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}

const handleLogout = async () => {
  try {
    await store.dispatch('user/logout')
    uni.showToast({
      title: '已退出登录',
      icon: 'success'
    })
  } catch (error) {
    uni.showToast({
      title: '退出失败',
      icon: 'none'
    })
  }
}

const showSection = (section) => {
  currentSection.value = section
}

const editInfo = (type) => {
  uni.showToast({
    title: '编辑功能开发中',
    icon: 'none'
  })
}

onMounted(() => {
  // 初始化登录状态
  store.dispatch('user/initLoginState')
})
</script>

<style lang="scss">
.profile-page {
  min-height: 100vh;
  background: #f8fafc;
  
  .profile-not-login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    
    .not-login-image {
      width: 120px;
      height: 120px;
      margin-bottom: 20px;
    }
    
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 10px;
    }
    
    .subtitle {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 30px;
    }
    
    .btn-login {
      width: 200px;
      height: 45px;
      background: #1e40af;
      color: white;
      font-size: 16px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  .profile-header {
    height: 200px;
    background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: white;
      margin-bottom: 15px;
    }
    
    .name {
      font-size: 20px;
      color: white;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .class-info {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .btn-logout {
      margin-top: 15px;
      padding: 6px 15px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 20px;
      color: white;
      font-size: 14px;
    }
  }
  
  .profile-nav {
    margin: -30px 20px 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    position: relative;
    
    .nav-item {
      background: white;
      padding: 20px;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      
      .nav-icon {
        width: 40px;
        height: 40px;
        background: #1e40af;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 10px;
        color: white;
        font-size: 20px;
      }
      
      .nav-title {
        font-size: 16px;
        font-weight: bold;
        color: #1f2937;
        margin-bottom: 5px;
        display: block;
      }
      
      .nav-desc {
        font-size: 12px;
        color: #6b7280;
      }
    }
  }
  
  .info-section {
    padding: 20px;
    
    .info-card {
      background: white;
      border-radius: 15px;
      padding: 20px;
      margin-bottom: 15px;
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        
        .card-title {
          font-size: 16px;
          font-weight: bold;
          color: #1f2937;
        }
        
        .btn-edit {
          padding: 6px 12px;
          background: #1e40af;
          color: white;
          font-size: 12px;
          border-radius: 6px;
        }
      }
      
      .info-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .label {
          color: #6b7280;
          font-size: 14px;
        }
        
        .value {
          color: #1f2937;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
}
</style> 