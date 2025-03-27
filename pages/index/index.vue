<template>
	<view class="home-page">
		<view class="home-header">
			<text class="title">优学教育</text>
			<view class="search-bar">
				<text class="search-icon">🔍</text>
				<input 
					type="text" 
					v-model="searchKey" 
					placeholder="搜索课程" 
					placeholder-class="search-placeholder"
				/>
			</view>
		</view>
		
		<scroll-view class="course-grid" scroll-y>
			<view 
				class="course-card" 
				v-for="course in courseList" 
				:key="course.id"
				@tap="goCourseDetail(course)"
			>
				<image class="course-image" :src="course.image" mode="aspectFill" />
				<view class="course-info">
					<text class="course-name">{{ course.name }}</text>
					<text class="course-price">¥{{ course.price }}/月</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchKey = ref('')

const courseList = ref([
	{
		id: 1,
		name: '数学提高班',
		price: 299,
		image: '/static/images/course-math.png'
	},
	{
		id: 2,
		name: '英语口语班',
		price: 399,
		image: '/static/images/course-english.png'
	},
	{
		id: 3,
		name: '物理实验班',
		price: 349,
		image: '/static/images/course-physics.png'
	}
])

const goCourseDetail = (course) => {
	uni.navigateTo({
		url: `/pages/course/detail?id=${course.id}`
	})
}
</script>

<style lang="scss">
.home-page {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background: #fff;
	
	.home-header {
		padding: 20px;
		background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
		color: white;
		border-radius: 0 0 20px 20px;
		
		.title {
			font-size: 24px;
			font-weight: bold;
			margin-bottom: 15px;
			display: block;
		}
		
		.search-bar {
			background: rgba(255, 255, 255, 0.2);
			border-radius: 12px;
			padding: 12px 15px;
			display: flex;
			align-items: center;
			
			.search-icon {
				margin-right: 10px;
			}
			
			input {
				flex: 1;
				color: #fff;
				font-size: 14px;
				
				&::placeholder {
					color: rgba(255, 255, 255, 0.6);
				}
			}
		}
	}
	
	.course-grid {
		// padding: 20px;
		height: calc(100vh - 140px);
		width: 95%;
		align-self: center;
		
		.course-card {
			background: #f8fafc;
			border-radius: 15px;
			overflow: hidden;
			margin-bottom: 15px;
			transition: all 0.3s ease;
			
			&:active {
				transform: scale(0.98);
			}
			
			.course-image {
				width: 100%;
				height: 160px;
				background: #e5e7eb;
			}
			
			.course-info {
				padding: 15px;
				
				.course-name {
					font-size: 16px;
					font-weight: bold;
					color: #1f2937;
					margin-bottom: 5px;
					display: block;
				}
				
				.course-price {
					font-size: 14px;
					color: #6b7280;
				}
			}
		}
	}
}
</style>
