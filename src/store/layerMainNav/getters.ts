import { GetterTree, Getter } from 'vuex';
import { IincludeList as State, IincludeItem } from './state';

const includeList: Getter<State, any> = (state: State): IincludeItem[] => state.includeList;

const keepAliveList: Getter<State, any> = (state: State): string[] => {
  return state.includeList.map(item => item.routerName);
};

const activeLayoutTab: Getter<State, any> = (state: State): string => {
  return state.activeLayoutTab;
};

const getterTree: GetterTree<State, any> = {
  includeList,
  keepAliveList,
  activeLayoutTab
};

export default getterTree;