const state = {
  isLoggedIn: false,
  userInfo: {
    name: '',
    studentId: '',
    className: '',
    phone: '',
    parentName: '',
    address: '',
    scores: {}
  }
}

const mutations = {
  SET_LOGIN_STATE(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR_USER_INFO(state) {
    state.isLoggedIn = false
    state.userInfo = {
      name: '',
      studentId: '',
      className: '',
      phone: '',
      parentName: '',
      address: '',
      scores: {}
    }
  }
}

const actions = {
  // 登录
  login({ commit }, { phone, password }) {
	return new Promise((resolve, reject) => {
		uni.request({
			url:"http://localhost:8080/api/auth/accredit",
			method: "POST",
			data:{
				"username": "fqj",
				"password": "123456"
			},
			header: { 'content-type': 'application/json' }, // 请求头
			success: (res) => { 
				if(res.data.code == 200) {
					console.log('成功:', res.data); 
					const userInfo = {
					  name: '某同学',
					  studentId: '2024001',
					  className: '三年级二班',
					  phone: phone,
					  parentName: '张先生',
					  address: '北京市朝阳区...',
					  scores: {
						'数学': { score: 95, level: '优秀' },
						'英语': { score: 88, level: '良好' },
						'语文': { score: 92, level: '优秀' }
					  }
					}
					commit('SET_LOGIN_STATE', true);
					commit('SET_USER_INFO', userInfo);
					// 保存登录状态到本地存储
					uni.setStorageSync('isLoggedIn', true);
					uni.setStorageSync('userInfo', userInfo);
				}
				resolve(res);
			}, // 成功回调
			fail: (err) => { 
				console.log('失败:', err); 
				reject(err);
			}, // 失败回调
			complete: () => { console.log('请求完成'); } // 完成回调
		})
	})
  },
  
  // 退出登录
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('CLEAR_USER_INFO')
      
      // 清除本地存储
      uni.removeStorageSync('isLoggedIn')
      uni.removeStorageSync('userInfo')
      
      resolve()
    })
  },
  
  // 初始化登录状态
  initLoginState({ commit }) {
    const isLoggedIn = uni.getStorageSync('isLoggedIn')
    const userInfo = uni.getStorageSync('userInfo')
    
    if (isLoggedIn && userInfo) {
      commit('SET_LOGIN_STATE', true)
      commit('SET_USER_INFO', userInfo)
    }
  }
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userInfo: state => state.userInfo
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 