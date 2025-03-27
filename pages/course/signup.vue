<template>
  <view class="signup-page">
    <view class="course-info">
      <text class="page-title">课程报名</text>
      <text class="course-name">{{ courseInfo.name }} - ¥{{ courseInfo.price }}/月</text>
    </view>
    
    <view class="signup-form">
      <text class="form-title">基本信息</text>
      
      <view class="form-group">
        <input 
          class="input" 
          type="text" 
          v-model="formData.name" 
          placeholder="学生姓名"
          placeholder-class="input-placeholder"
        />
      </view>
      
      <view class="form-group">
        <input 
          class="input" 
          type="number" 
          v-model="formData.phone" 
          placeholder="联系电话"
          placeholder-class="input-placeholder"
        />
      </view>
      
      <view class="form-group">
        <picker 
          mode="selector" 
          :range="gradeOptions" 
          @change="handleGradeChange"
          :value="gradeIndex"
        >
          <view class="picker">
            <text :class="['picker-text', gradeIndex === -1 ? 'placeholder' : '']">
              {{ gradeIndex === -1 ? '选择年级' : gradeOptions[gradeIndex] }}
            </text>
          </view>
        </picker>
      </view>
    </view>
    
    <button class="btn-submit" @tap="handleSubmit">提交报名</button>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const courseInfo = ref({
  id: 1,
  name: '数学提高班',
  price: 299
})

const formData = reactive({
  name: '',
  phone: '',
  grade: ''
})

const gradeOptions = ['三年级', '四年级', '五年级', '六年级']
const gradeIndex = ref(-1)

const handleGradeChange = (e) => {
  gradeIndex.value = e.detail.value
  formData.grade = gradeOptions[gradeIndex.value]
}

const handleSubmit = () => {
  if (!formData.name || !formData.phone || !formData.grade) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }
  
  // 这里添加报名提交逻辑
  console.log('报名信息：', formData)
  
  uni.showToast({
    title: '报名成功',
    icon: 'success',
    duration: 2000,
    success: () => {
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index'
        })
      }, 2000)
    }
  })
}

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const { id } = currentPage.$page.options
  
  // 这里可以根据id获取课程信息
  console.log('课程ID:', id)
})
</script>

<style lang="scss">
.signup-page {
  min-height: 100vh;
  background: #fff;
  padding: 20px;
  
  .course-info {
    background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    padding: 20px;
    border-radius: 20px;
    margin-bottom: 30px;
    
    .page-title {
      font-size: 24px;
      color: white;
      font-weight: bold;
      margin-bottom: 10px;
      display: block;
    }
    
    .course-name {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  
  .signup-form {
    background: #f8fafc;
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 30px;
    
    .form-title {
      font-size: 18px;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 20px;
      display: block;
    }
    
    .form-group {
      margin-bottom: 15px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .input {
        width: 100%;
        height: 50px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 0 15px;
        font-size: 16px;
        
        &::placeholder {
          color: #9ca3af;
        }
      }
      
      .picker {
        width: 100%;
        height: 50px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        
        .picker-text {
          font-size: 16px;
          color: #1f2937;
          
          &.placeholder {
            color: #9ca3af;
          }
        }
      }
    }
  }
  
  .btn-submit {
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
</style> 