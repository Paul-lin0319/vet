import { ActionTree, Action, ActionContext } from 'vuex'
import { IincludeList as State, IincludeItem } from './state'

const addIncludeList: Action<State, any> = async (context: ActionContext<State, any>, icludeItem: IincludeItem) => {
  return new Promise((resolve) => {
    if (context.state.includeList.length === 0) {
      context.commit('initIncludeList', icludeItem);
    }
    context.commit('addIncludeList', icludeItem);
    resolve();
  });
};

const delIncludeList: Action<State, any> = async (context: ActionContext<State, any>, icludeItemName: string) => {
  return new Promise((resolve) => {
    context.commit('delIncludeList', icludeItemName);
    resolve();
  });
};

const changeActiveLayoutTab: Action<State, any> = async (context: ActionContext<State, any>, icludeItemName: string) => {
  return new Promise((resolve) => {
    context.commit('changeActiveLayoutTab', icludeItemName);
    resolve();
  });
};

const initIncludeList: Action<State, any> = async (context: ActionContext<State, any>) => {
  return new Promise((resolve) => {
    context.commit('initIncludeList');
    resolve();
  });
};

const actionTree: ActionTree<State, any> = {
  addIncludeList,
  delIncludeList,
  initIncludeList,
  changeActiveLayoutTab
}

export default actionTree;