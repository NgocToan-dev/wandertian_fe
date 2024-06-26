<template>
  <div class="nav justify-content-end border-bottom py-3 px-4 gap-3">
    <!-- setting icon -->
    <div class="nav-item setting" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="setting">
      <i class="fa-solid fa-gear fa-xl"></i>
    </div>
    <div class="nav-item notifications" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside"
      aria-expanded="false">
      <i class="fa-solid fa-bell fa-xl" data-bs-toggle="tooltip" data-bs-placement="bottom"
        data-bs-title="notifications"></i>
      <span class="total-notify position-absolute top-20 start-90 translate-middle badge rounded-pill bg-danger">
        {{totalNotify}}
        <span class="visually-hidden">unread messages</span>
      </span>
    </div>
    <ul class="dropdown-menu notification-dropdown">
      <div class="dropdown-header d-flex justify-content-between align-items-center border-bottom">
        <div>Notifications</div>
        <div class="cursor-pointer">
          <i class="fa-solid fa-gear fa-sm"></i>
        </div>
      </div>
      <li class="dropdown-item d-flex justify-content-between" v-for="item in notifications" :key="item.id" @click="readNotify(item)">
        <div class="d-flex flex1 flex-column">
          <div>{{ item.content }}</div>
          <div class="time">{{ calculateTime(item.createdDate) }}</div>
        </div>
        <div class="function-section">
          <div class="unreaded-icon" v-if="!item.isRead"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import commonFn from '@/utilities/commonFn';
import { computed, ref } from 'vue';

// TODO add store for notifications
const notifications = ref([
  {
    id: 1,
    content: 'This is notification 1',
    createdDate: new Date('2024-01-01T00:00:00Z'),
    isRead: true
  },
  {
    id: 2,
    content: 'This is notification 2',
    createdDate: new Date('2024-06-02T00:00:00Z'),
  },
  {
    id: 3,
    content: 'This is notification 3',
    createdDate: new Date('2024-06-26T00:00:00Z'),
  }
])
const totalNotify = computed(() => {
  const result = notifications.value.length <= 10 ? notifications.value.length : '10+';
  return result;
});
const calculateTime = (date) => {
  return commonFn.timeFromNow(date);
}
const readNotify = (item) => {
  item.isRead = true;
};
</script>

<style lang="scss" scoped>
.nav-item {
  cursor: pointer;
}

.dropdown-item {
  cursor: pointer;
}
.notification-dropdown {
  width: 400px;

  .time {
    font-size: 12px;
    color: gray;
  }
  .dropdown-item:active .time{
    color: var(--bs-dropdown-link-active-color) !important;
  }

  .function-section {
    width: 20px;
    display: flex;
    justify-content: end;

    .unreaded-icon {
      background: rgb(34, 193, 195);
      background: linear-gradient(0deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%);
      width: 7px;
      height: 7px;
      border-radius: 100%;
    }
  }
}
</style>