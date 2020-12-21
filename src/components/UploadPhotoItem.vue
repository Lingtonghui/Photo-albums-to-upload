<template>
<!-- 
             <div class="uploadPhotoItem">
              <span class="myProgress">
                <span class="plan"></span>
                30%
              </span>
              <img src="public/img/1.jpg" />
              <span class="pictureName">
                home
              </span>
            </div> 


 -->
  <div class="uploadPhotoItem">
    <!-- <span class="myProgress">
      <span class="plan"></span>
      30%
    </span> -->
    <img :src="imgSrc" />
    <span class="pictureName">
      {{ item.name }}
    </span>
  </div>
</template>

<script>
export default {
  // file -> show
  props: ["item"],
  data() {
    return {
      imgSrc: ""
    };
  },
  mounted() {
    // file -> base64 url
    // 异步的 所以必须要在 onload 内获取到结果值
    //readAsDataURL 方法会读取指定的 Blob 或 File 对象
    //时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imgSrc = fileReader.result;
    };
    fileReader.readAsDataURL(this.item);
  }
};
</script>

<style></style>
