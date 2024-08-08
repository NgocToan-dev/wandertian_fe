import { defineAsyncComponent } from "vue";
const CategoryDetail = defineAsyncComponent(
  () => import("@/pages/admin/category/CategoryDetail.vue"),
);
const TagDetail = defineAsyncComponent(
  () => import("@/pages/admin/tag/TagDetail.vue"),
);
const EventDetail = defineAsyncComponent(
  () => import("@/pages/admin/task/EventDetail.vue"),
);
export default {
  CategoryDetail,
  TagDetail,
  EventDetail,
};
