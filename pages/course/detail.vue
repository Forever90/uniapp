<template>
  <view class="course-detail">
    <view class="course-banner">
      <text class="course-name">{{ courseInfo.name }}</text>
      <text class="course-desc">{{ courseInfo.description }}</text>
    </view>
    
    <view class="course-content">
      <view class="course-stats">
        <view class="stat-item">
          <text class="icon">👥</text>
          <text class="text">小班教学(1:6)</text>
        </view>
        <view class="stat-item">
          <text class="icon">⏱️</text>
          <text class="text">90分钟/课</text>
        </view>
      </view>
      
      <view class="course-section">
        <text class="section-title">课程特点</text>
        <view class="feature-list">
          <view class="feature-item" v-for="(feature, index) in courseInfo.features" :key="index">
            <text class="feature-text">• {{ feature }}</text>
          </view>
        </view>
      </view>
      
      <button class="btn-signup" @tap="goSignup">立即报名</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const courseInfo = ref({
  id: 1,
  name: '数学提高班',
  description: '打造扎实数学基础，提升解题能力',
  price: 299,
  features: [
    '个性化教学方案，因材施教',
    '重点难点专项突破，查漏补缺',
    '趣味教学方式，激发学习兴趣'
  ]
})

const goSignup = () => {
  uni.navigateTo({
    url: `/pages/course/signup?id=${courseInfo.value.id}`
  })
}

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const { id } = currentPage.$page.options
  
  // 这里可以根据id获取课程详情
  console.log('课程ID:', id)
})
</script>

<style lang="scss">
.course-detail {
  min-height: 100vh;
  background: #fff;
  
  .course-banner {
    height: 200px;
    background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    padding: 30px 20px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    
    .course-name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    .course-desc {
      font-size: 14px;
      opacity: 0.8;
    }
  }
  
  .course-content {
    padding: 20px;
    
    .course-stats {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      
      .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .icon {
          font-size: 20px;
        }
        
        .text {
          color: #6b7280;
          font-size: 14px;
        }
      }
    }
    
    .course-section {
      margin-bottom: 30px;
      
      .section-title {
        font-size: 18px;
        font-weight: bold;
        color: #1f2937;
        margin-bottom: 15px;
        display: block;
      }
      
      .feature-list {
        background: #f8fafc;
        padding: 15px;
        border-radius: 12px;
        
        .feature-item {
          margin-bottom: 10px;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .feature-text {
            color: #6b7280;
            font-size: 14px;
            line-height: 1.5;
          }
        }
      }
    }
    
    .btn-signup {
      width: 100%;
      height: 50px;
      background: #1e40af;
      color: white;
      font-size: 16px;
      font-weight: bold;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:active {
        background: #1e3a8a;
      }
    }
  }
}
</style> 