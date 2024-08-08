import { defineAsyncComponent } from "vue";
import modalRegister from "../index.js";
const MessageBox = defineAsyncComponent(() =>
  import("@/components/messageBox/MessageBox.vue")
);

export const showInfo = (message: string, title: string, callback: Function, width?: number) => {
  modalRegister.openModal(MessageBox, {
    message,
    title,
    width,
    callback,
  });
};
