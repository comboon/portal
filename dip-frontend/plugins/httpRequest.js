import { Message, Loading } from 'element-ui'
import homeApi from "../webApi/apiCollections"
import aes from "@/plugins/aes";
import Cookies from "js-cookie";
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';

let loading;

//启动加载动画
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'loading...',
    background: 'rgba(0,0,0,.7)',
  });
}

//结束加载动画
function endLoading() {
  loading.close();
}

function removeAuth() {

  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {

    for (let i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
      document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
      document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
    }

    const cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

  }

  window.localStorage.clear()
}

export default function ({ $axios, store, route, redirect }, inject) {
  const apiModules = {};
  apiModules.article = homeApi($axios);

  inject('homeApi', apiModules)



  const refreshAuthLogic = failedRequest => {
    if (!Cookies.get('refreshToken')) {
      return Promise.reject(failedRequest);
    }
    $axios({
      url: '/dc/user-api/auth/refresh/token',
      method: 'post',
      data: { refreshToken: Cookies.get('refreshToken') },
    }).then(tokenRefreshResponse => {
      if (tokenRefreshResponse.status == 200 && tokenRefreshResponse.data.data.access_token != '') {
        if (!tokenRefreshResponse.data.data.access_token) {
          endLoading()
          removeAuth()
          redirect('/login');
          return Promise.resolve();
        }
        // localStorage.setItem('AUTH_TOKEN', tokenRefreshResponse.data.data.access_token)
        // localStorage.setItem('REFRESH_TOKEN', tokenRefreshResponse.data.data.refresh_token)
        Cookies.set('token', tokenRefreshResponse.data.data.access_token)
        Cookies.set('refreshToken', tokenRefreshResponse.data.data.refresh_token)

        // if (config.url.indexOf('/dc') > -1) {
        //   // const dcToken = localStorage.getItem('AUTH_TOKEN')
        //   config.headers['Authorization'] = 'Bearer ' +
        // } else {
        //   config.headers['Authorization'] = token
        // }
        failedRequest.response.config.headers['Authorization'] = tokenRefreshResponse.data.data.access_token;

        return Promise.resolve();
      } else {
        endLoading()
        removeAuth()
        redirect('/login');
      }
    })
  }

  // createAuthRefreshInterceptor($axios, refreshAuthLogic,{statusCodes: [ 401, 403 ]});

  $axios.interceptors.request.use(
    config => {
      let token = Cookies.get("token");
      let langType = "";
      if (Cookies.get('langType') === undefined) {
        Cookies.set('langType', 'zh_CN');
        langType = Cookies.get('langType');
        config.headers.lang = langType;
        store.commit('setLangType', langType)
      } else {
        langType = Cookies.get('langType');
        config.headers.lang = langType;
        store.commit('setLangType', langType)
      }
      if (Cookies.get('headNavIndex') === undefined) {
        Cookies.set('headNavIndex', 1)
        store.commit('setNavIndex', 1)
      } else {
        store.commit('setNavIndex', parseInt(Cookies.get('headNavIndex')))
        console.log(store.state.headNavIndex);
      }
      if (Cookies.get('userInfor') !== undefined) {
        store.commit('setUserInfor', JSON.parse(Cookies.get('userInfor')))
      }
      if (config.url === "/api/captchaImage" || config.url === '/api/login') {
        if (Cookies.get('token')) {
          Cookies.remove('token')
          store.commit('setToken', null)
          removeAuth()
        }
      }
      if (token !== undefined) {
        // debugger
        if (config.url.indexOf('/dc') > -1) {
          config.headers['Authorization'] = 'Bearer ' + token
        } else {
          config.headers['Authorization'] = token
        }
      } else {
        delete config.headers.Authorization
      }

      if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
      }
      return config
    },
    error => {
      // do something with request error
      return Promise.reject(error)
    }
  )
  $axios.onRequest(config => {
    // console.log(config);
    // console.log('Making request to ' + config.url)
    startLoading();
  })

  // response interceptor
  $axios.interceptors.response.use(

    /**
     * 根据返回数据中的code 来判断
     * 错误统一处理
     */
    response => {
      let code;
      // console.log(123123123, response)
      response.data.code ? code = response.data.code : code = response.status;
      //console.log('获取验证码');
      console.log(code);
      if (code === 200 || code === 1) {
        endLoading();
        if (response.config.url.indexOf('/refresh') > -1) {
          if (!response.data.data.access_token) {
            endLoading()
            removeAuth()
            redirect('/login');
            return Promise.resolve();
          }
        }
        return response
      } else if (!response.config.url.indexOf('/dc') > -1) {
        if (code !== 200) {
          endLoading()
          if (response.data.msg.indexOf('鉴权失败') > -1) {
            removeAuth()
            redirect('/login');
          } else {
            endLoading();
            Message.error(response.data.msg)
          }
          return Promise.resolve();
        }

      } else {
        endLoading();
        Message.error(response.data.msg)
      }
      // if (code === 401||code === 403) {
      //
      // } else {
      //   endLoading();
      //   Message({
      //     message: response.data.msg,
      //     type: 'error'
      //   })
      // }

    },
    error => {
      console.log(error)
      endLoading();
      const code = error.response.status;
      if (code === 401 || code === 403) {

        removeAuth()
        redirect('/login');
        // })
      }
      // Message({
      //   // message: error,
      //   message: '登录已过期，请重新登录',
      //   type: 'error'
      // })
      return Promise.reject(error)
    }
  )

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect('/404')
    } else if (code === 500) {
      redirect('/login')
    } else if (code === 401) {
      redirect('/login');
    }
  })



}

/**
* 参数处理
* @param {*} params  参数
*/
export function tansParams(params) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName];
		var part = encodeURIComponent(propName) + "=";
		if (value !== null && typeof (value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && typeof (value[key]) !== 'undefined') {
						let params = propName + '[' + key + ']';
						var subPart = encodeURIComponent(params) + "=";
						result += subPart + encodeURIComponent(value[key]) + "&";
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&";
			}
		}
	}
	return result
}