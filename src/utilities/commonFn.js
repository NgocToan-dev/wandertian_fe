import { useLoading } from "vue-loading-overlay";

const $loading = useLoading({
  // options
});

const showMask = () => {
  return $loading.show({
    // Optional parameters
    container: null
  });
};

const hideMask = (loader) => {
  loader.hide();
};

export default {
  showMask,
  hideMask,
};
