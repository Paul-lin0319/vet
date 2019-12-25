export interface IincludeItem {
  name: string;
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