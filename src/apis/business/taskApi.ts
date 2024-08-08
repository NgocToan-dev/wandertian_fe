import BuApi from "./_buApi";

class TaskApi extends BuApi {
  apiName = "business";
  controller = "task";
}

export default new TaskApi();
