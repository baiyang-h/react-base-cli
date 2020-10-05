import Loadable from "react-loadable";
import Loading from '@/components/Loading'
import { isUrl } from '@/libs/common/regexp'
import {join} from "path";


// 路由懒加载
export const dynamicWrapper = loader => {
  return Loadable({
    loader,
    loading: Loading
  })
}

/**
 * @description 对 menuData 菜单进行处理，生成一个新的菜单信息 1. 修改 path，补齐，2. 修改 authority，如无则继承父 
 * @param data              menuData
 * @param parentPath        父级的path
 * @param parentAuthority   父级的权限
 */
export function formatterMenu(data, parentPath='/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    // 是否是 url 地址
    if (!isUrl(path)) {
      path = join(parentPath, item.path)
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };

    if (item.children) {
      result.children = formatterMenu(item.children, path, item.authority);
    }
    return result;
  });
}

// 将递归数组 拉平
export function getFlatData(menus) {
  let flatData = [];
  menus.forEach(item => {
    if(item.children) {
      flatData = [...flatData, item, ...getFlatData(item.children)]
    } else {
      flatData.push(item)
    }
  })
  return flatData
}

