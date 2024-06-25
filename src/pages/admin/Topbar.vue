<template>
  <div class="nav justify-content-end border-bottom py-2 px-4 gap-3">
    <!-- setting icon -->
    <div class="nav-item setting" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="setting">
      <i class="fa-solid fa-gear fa-xl" ></i>
    </div>
    <div class="nav-item notifications" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
      <i class="fa-solid fa-bell fa-xl" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="notifications" ></i>
    </div>
    <ul class="dropdown-menu notification-dropdown d-flex flex-column gap-2">
      <div class="dropdown-header d-flex justify-content-between align-items-center border-bottom">
        <div>Notifications</div>
        <div>
          <i class="fa-solid fa-gear fa-sm" ></i>
        </div>
      </div>
      <li class="dropdown-item d-flex flex-column gap-1" v-for="item in notifications" :key="item.id">
        <div>{{item.content}}</div>
        <div class="time">{{formatDate(item.createdDate)}}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const notifications = ref([
  {
    id: 1,
    content: 'This is notification 1',
    createdDate: new Date(),
  },
  {
    id: 2,
    content: 'This is notification 2',
    createdDate: new Date(),
  },
  {
    id: 3,
    content: 'This is notification 3',
    createdDate: new Date(),
  }
])
const calculateTime = (date) =>{
  const remainTime = new Date() - date;
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  if(remainTime < minute){
    return `${Math.round(remainTime / second)} seconds ago`;
  }
  
}
</script>

<style lang="scss" scoped>
.nav-item{
  cursor: pointer;
}
.dropdown-item{
  cursor: pointer;
}
.notification-dropdown{
  width: 400px;
  .time{
    font-size: 12px;
    color: gray;
  }
}
</style>