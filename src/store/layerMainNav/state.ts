export interface IincludeItem {
  name: string;
  routerName: string;
  title: string;
  closable: boolean;
}
export interface IincludeList {
  includeList: IincludeItem[];
  activeLayoutTab: string;
}

export default {
  includeList: [],
  activeLayoutTab: ''
}