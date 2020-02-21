
  console.log('debounce------>0',this)
export   function debounce(func, delay) {
  console.log("debounce");
  var timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    // console.log('debounce--->1',this)
    // this = {name:'asdsd'}
    timer = setTimeout(()=> {
    //   console.log("timer ----", timer, args);
      // console.log('debounce--->2',this)
      // func.apply(this, args);
      func(...args)
      
    }, delay);
  };
}

export   function debounce2(func, delay,that) {
  console.log("debounce");
  var timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    // console.log('debounce2--->',that)
    timer = setTimeout(() => {
    //   console.log("timer ----", timer, args);
      func.apply(that, args);
    }, delay);
  };
}
// 
export   function debounce3(func, delay) {
  console.log("debounce");
  var timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
   
    timer = setTimeout(()=> {
      func(...args)
    }, delay);
  };
}
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00'+str).substr(str.length)
}