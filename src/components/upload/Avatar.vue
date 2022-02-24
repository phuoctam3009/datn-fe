<template>
  <vue-cropper ref="cropper" :img="option.img"></vue-cropper>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  components: { VueCropper },
  data() {
    return {
      model: false,
      modelSrc: "",
      crap: false,
      previews: {},
      lists: [
        {
          img: "https://avatars2.githubusercontent.com/u/15681693?s=460&v=4",
        },
      ],
      option: {
        img: "https://avatars2.githubusercontent.com/u/15681693?s=460&v=4",
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 160,
        autoCropHeight: 150,
        centerBox: false,
        high: true,
        max: 99999,
      },
      show: true,
      fixed: true,
      fixedNumber: [16, 9],
    };
  },
};
</script>
