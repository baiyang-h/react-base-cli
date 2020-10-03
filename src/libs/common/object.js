// 判断两个对象是否键值相同
export const isObjectEqual = (a, b) => {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}

// 浅拷贝
export const simpleClone = initalObj => {
  var obj = {};
  for (var i in initalObj) {
    obj[i] = initalObj[i];
  }
  return obj;
};

// 深拷贝
export const deepClone = (initalObj, finalObj) => {
  var obj = finalObj || {};
  for (var i in initalObj) {
    var prop = initalObj[i];
    // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if (prop === obj) {
      continue;
    }
    if (typeof prop === "object") {
      obj[i] = prop.constructor === Array ? [] : {};
      deepClone(prop, obj[i]);
    } else {
      obj[i] = prop;
    }
  }
  return obj;
};
