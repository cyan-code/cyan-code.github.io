const utils = {
  /**
   * 获取元素样式
   * @param  {DOMObject} obj  要获取样式的DOM对象
   * @param  {string}    attr 要获取的样式的名称
   * @return {string}         获取到的样式的值
   */
  // ES6的字面朗对象里可以直接写  getStyle(){} 中间的 :function 可以省略
  getStyle (obj, attr) {
    if (obj.currentStyle) {
      // IE
      return obj.currentStyle[attr]
    } else {
      // 非IE
      return getComputedStyle(obj)[attr]
    }
  },
  /**
   * 添加事件监听
   * @param {DOMObject} ele          添加事件的对象
   * @param {string}    type         事件类型（不带on）
   * @param {function}  fn           事件处理函数
   * @param {boolean}   [isCapture]  是否捕获，true代表捕获，false代表冒泡，默认值为false
   */
  on (ele, type, fn, isCapture) {
    // isCapture默认值为false
    // isCapture = isCapture === undefined ? false : isCapture
    if (isCapture === undefined) isCapture = false
    if (ele.attachEvent) {
      ele.attachEvent('on' + type, fn)
    } else {
      ele.addEventListener(type, fn, isCapture)
    }
  },
  /**
   * 移除事件监听
   * @param {DOMObject} ele          添加事件的对象
   * @param {string}    type         事件类型（不带on）
   * @param {function}  fn           事件处理函数
   * @param {boolean}   [isCapture]  是否捕获，true代表捕获，false代表冒泡，默认值为false
   */
  off (ele, type, fn, isCapture) {
    if (isCapture === undefined) isCapture = false
    if (ele.detachEvent) {
      ele.detachEvent('on' + type, fn)
    } else {
      ele.removeEventListener(type, fn, isCapture)
    }
  },
  /**
   * 元素匀速运动
   * @param {DOMObject} ele      要运动的DOM元素
   * @param {string}    attr     运动的属性名
   * @param {number}    end      运动的终点
   * @param {number}    duration 运动的总时间（单位：ms）
   * @param {function}  callback 可选参数，完成运动之后的回调函数
   */
  move (ele, attr, end, duration, callback) {
    // 通过样式获取起始点
    var start = parseInt(this.getStyle(ele, attr))
    // 计算总距离
    var distance = end - start
    // 计算运动的总步数（每隔20ms走一步）
    var steps = parseInt(duration / 20)
    // 计算速度（px/步）
    var speed = distance / steps
    // 记录步数
    var n = 0
    // 先清除上一次的定时器
    clearInterval(ele.timer)
    // 把timer写给ele对象的属性，这样确保唯一性
    ele.timer = setInterval(() => {
      n++
      ele.style[attr] = start + n * speed + 'px'
      // 判断终点
      if (n === steps) {
        clearInterval(ele.timer)
        // 这里有可能不能刚好达到终点，因为js小数运算有误差，speed很可能是一个小数
        ele.style[attr] = end + 'px'
        // 运动结束以后调用回调
        // 调用回调的常用写法：callback有效才调用
        callback && callback()
      }
    }, 20)
  },
  /**
   * 元素缓冲运动
   * @param {DOMObject} ele      要运动的DOM元素
   * @param {string}    attr     运动的属性名
   * @param {number}    end      运动的终点
   * @param {function}  callback 可选参数，完成运动之后的回调函数
   */
  move1 (ele, attr, end, callback) {
    var start = parseInt(this.getStyle(ele, attr))
    clearInterval(ele.timer)
    // 剩下距离和速度都要在定时器里每次计算
    ele.timer = setInterval(() => {
      // 计算剩下距离
      var distance = end - start
      // 计算速度：剩下距离的1/10
      // 正向运动向上取整，负向运动向下取整
      var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10)
      // start代表当前位置，所以需要往前走，只有start变化了，distance才代表剩下距离
      start += speed
      // start就是我要运动的位置
      ele.style[attr] = start + 'px'
      // 判断终点
      // 因为最后几步是1px运动的，所以一定能刚好到达终点
      if (start === end) {
        clearInterval(ele.timer)
        callback && callback()
      }
    }, 20)
  },

  /**
   * 计算某个元素到文档边缘的坐标
   * @param {DOMObject} ele 要计算坐标的DOM元素
   * @return {object}    例如：{ left: 100, top: 200 }
   */
  getBodyOffset (ele) {
    var left = 0, top = 0
    // 如果ele有固定定位，那么他的offsetParent就是null
    // 但是固定定位元素自己是有offsetTop和offsetLeft的值
    do {
      left += ele.offsetLeft
      top += ele.offsetTop
      // 把ele作为ele的父级，为下一次累加做准备
      // 要判断部位null才往上赋值
      if (ele.offsetParent !== null) ele = ele.offsetParent
    } while (ele.offsetParent !== null)
    return { left, top }
  },

  /**
   * 存一条cookie
   * @param {string} key       要村的cookie的名称
   * @param {string} value     要存的cookie的值 
   * @param {object} [option]  { expires: 7, path: '/' }  7天过期存根目录
   *    这个方法同时可以完成删除cookie，只需要把option里的expires传一个负数即可
   */
  setCookie (key, value, option) {
    var cookie = `${key}=${encodeURIComponent(value)}`
    if (option) {
      if (option.path) {
        cookie += `;path=${option.path}`
      }
      if (option.expires) {
        var date = new Date()
        date.setDate(date.getDate() + option.expires)
        cookie += `;expires=${date.toUTCString()}`
      }
    }
    document.cookie = cookie
  },

  /**
   * 获取某一条cookie
   * @param  {string} key 要获取的cookie的名称
   * @return {string}     获取到的cookie的值，但是如果cookie不存在就返回undefined
   */
  getCookie (key) {
    var str = document.cookie
    // 所有的cookie，每一条之间用; 隔开的
    var cookies = str.split('; ')
    // 归并：每归并一次，就把一条cookie拆开放入obj
    // 每遍历一次obj就多一个属性，最终就是所有cookie了
    var objCookie = cookies.reduce((obj, cookie) => {
      var arr = cookie.split('=')
      // 把属性值解码
      obj[arr[0]] = decodeURIComponent(arr[1])
      return obj
    }, {})
    return objCookie[key]
  },

  /**
   * ajax get请求
   * @param {string}   url       请求地址
   * @param {object}   query     请求要携带的参数
   * @param {function} fn        请求成功之后的回调函数
   * @param {boolean}  [isJson]  可选参数，数据是否为json，默认为true
   */
  get (url, query, fn, isJson = true) {
    // ES6新特性：函数参数默认值
    if (query) {
      url += '?'
      for (var key in query) {
        url += `${key}=${query[key]}&`
      }
      // 循环完了把多余的&去掉
      url = url.slice(0, -1)
    }
    // 1、创建核心对象
    var xhr = new XMLHttpRequest()
    // 2、打开连接
    xhr.open('GET', url)
    // 3、发送请求
    xhr.send()
    // 4、监听状态改变
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // 请求成功
          const data = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
          fn && fn(data)
        }
      }
    }
  },

    /**
   * ajax post请求
   * @param {string}   url       请求地址
   * @param {object}   query     请求要携带的参数
   * @param {function} fn        请求成功之后的回调函数
   * @param {boolean}  [isJson]  可选参数，数据是否为json，默认为true
   */
  post (url, query, fn, isJson = true) {
    var str = ''
    if (query) {
      for (var key in query) {
        str += `${key}=${query[key]}&`
      }
      str = str.slice(0, -1)
    }
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(str)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
          fn && fn(data)
        }
      }
    }
  },

  /**
   * jsonp请求
   * @param {string} url      接口地址
   * @param {string} cbName   全局回调函数名
   * @param {object} [query]  其他参数
   */
  jsonp (url, cbName, query) {
    url += `?cb=${cbName}`
    if (query) {
      for (var key in query) {
        url += `&${key}=${query[key]}`
      }
    }

    // 创建script
    var script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    // 由于script请求时异步的，所以只要标签存在请求就发出去了，就一定会返回
    // 所以script就可以立马删除
    document.body.removeChild(script)
  },

  /**
   * 基于promise的ajax的get请求
   * @param {string} url 接口地址
   * @param {object} query 携带的参数
   * @param {boolean} [isJson] 是否是json数据，默认为true
   */
  fetch (url, query, isJson = true) {
    if (query) {
      url += '?'
      for (var key in query) {
        url += `${key}=${query[key]}&`
      }
      url = url.slice(0, -1)
    }
    // 需要把promise return出去，这样在外面调用这个方法之后就可以then了
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.send()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var data = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
            resolve(data)
          } else {
            reject()
          }
        }
      }
    })
  }
}
