// 随机数范围
export const random = (min, max) => {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * ((max + 1) - min))
  } else {
    return null;
  }
}
