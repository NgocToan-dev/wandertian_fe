import { useLoading } from "vue-loading-overlay";

const $loading = useLoading({});

const showMask = () => {
  return $loading.show({
    // Optional parameters
    container: null,
  });
};

const hideMask = (loader) => {
  loader.hide();
};

const backToHome = (router) => {
  router.push({ path: "/" });
};

export default {
  showMask,
  hideMask,
  backToHome,
};
