import { useModal } from "vue-final-modal";
import register from "./register";

const defineComponentByName = (name) => {
  return register[name];
};
const openModal = (modalName, data) => {
  // check if modalName is a string
  let modal = modalName;
  if (typeof modal === "string") {
    modal = defineComponentByName(modalName);
  }
  const { open, close } = useModal({
    component: modal,
    attrs: {
      escToClose: true,
      clickToClose: false,
      modelValue: true,
      params: data,
      onConfirm() {
        close();
      },
    },
  });
  open();
};

export default { openModal };
