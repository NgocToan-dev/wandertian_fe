export default interface IBaseStore {
  id?: string;
  state: any;
  getters: any;
  actions: any;
}
