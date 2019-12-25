import { IincludeList as State, IincludeItem } from './state'
import { MutationTree, Mutation } from 'vuex';

const changeActiveLayoutTab: Mutation<State> = (state: State, name: string): void => {
  state.activeLayoutTab = name;
};

const addIncludeList: Mutation<State> = (state: State, item: IincludeItem): void => {
  if (-1 === state.includeList.findIndex(elem => elem.name === item.name)) {
    state.includeList.push(item);
    localStorage.setItem('KEY_layerMainNav', JSON.stringify(state.includeList));
  }
  state.activeLayoutTab = item.name;
};

const delIncludeList: Mutation<State> = (state: State, name: string): void => {
  state.includeList = state.includeList.filter(item => {
    return name !== item.name;
  });
  localStorage.setItem('KEY_layerMainNav', JSON.stringify(state.includeList));
};

const initIncludeList: Mutation<State> = (state: State): void => {
  // 获取本地存储
  let userIncludes: IincludeItem[] = JSON.parse(localStorage.getItem('KEY_layerMainNav') || '[]');
  state.includeList = userIncludes;
  if (-1 === state.includeList.findIndex(elem => {
    return elem.name === '/home'
  })) {
    state.includeList = [{
      name: '/home',
      title: '首页',
      closable: false
    }, ...state.includeList];
  }
};

const mutationTree: MutationTree<State> = {
  addIncludeList,
  delIncludeList,
  initIncludeList,
  changeActiveLayoutTab
}

export default mutationTree;