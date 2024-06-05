import { defineAsyncComponent } from "vue";
import modalRegister from "../index.js";
const MessageBox = defineAsyncComponent(() =>
  import("@/components/messageBox/MessageBox.vue")
);

export const showInfo = (message, title, callback, width) => {
  modalRegister.openModal(MessageBox, {
    message,
    title,
    width,
    callback,
  });
};
