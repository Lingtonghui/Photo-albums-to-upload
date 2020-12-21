<template>
  <!-- 上传相关 -->
  <div class="masking" v-if="visible">
    <div class="addPhotoContainer"></div>
    <div class="addController">
      <h3 class="addTitle">
        上传照片-普通上传(H5)<span class="close" @click="close">╳</span>
      </h3>
      <div class="photoTitles">
        <span class="uploadTo">上传到</span>
        <div class="photoSelect">
          <img class="showPhoto" src="public/img/1.jpg" />
          相册名称
        </div>
      </div>


      <!-- 上传按钮 -->
      <div class="showContainer" v-show="showAddContainer">
        <div class="uploadContainer">
          <span class="fileinput-button">
            <span>上传图片</span>
            <input
              class="imgFile"
              type="file"
              name=""
              multiple="multiple"
              @input="addWantShowPhotos"
            />
          </span>
          <span class="hint">
            按住Ctrl可多选
          </span>
        </div>
      </div>

      <!-- 显示待上传图片  -->
      <div class="loadContainer" v-show="showWaitUploadContainer">
        <div class="wantUpload">
                      <!-- <div class="uploadPhotoItem">
              <span class="myProgress">
                <span class="plan"></span>
                30%
              </span>
              <img src="public/img/1.jpg" />
              <span class="pictureName">
                home
              </span>
            </div> -->
          <template v-for="(item, index) in wantUploadPhotos">
            <UploadPhotoItem :item="item" :key="index"></UploadPhotoItem>
          </template>
        </div>
        <div class="addStyle">
          <!-- <span class="fileinput-add">
              <span></span>
              <input class="imgFile-add" type="file" multiple="multiple" />
            </span> -->
        </div>
        <!-- 开始上传按钮 -->
        <div class="bottomStyle">
          <span class="uploadBtn" @click="uploadFile">开始上传</span>
        </div>
      </div>




    </div>
  </div>
</template>

<script>
import UploadPhotoItem from "./UploadPhotoItem";
import { apiUpload } from "../api";
export default {
  props: ["visible"],
  components: {
    UploadPhotoItem
  },
  data() {
    return {
      wantUploadPhotos: []
    };
  },
  computed: {
    showAddContainer() {
      return this.wantUploadPhotos.length === 0;
    },
    showWaitUploadContainer() {
      return this.wantUploadPhotos.length > 0;
    }
  },
  methods: {
    async uploadFile() {
      // 只支持上传一个
      // 一个一个的上传  串行
      // 并行???

      //item是一个一个的File对象
      for (const item of this.wantUploadPhotos) {
        // 异步的
        await apiUpload(item);
      }

      // 可读性
      // 写"好代码"的关键
      // 1. 表达出代码的意图
      // 2. 不要有重复
      // <重构><代码整洁之道>
      this.uploadPhotosCompleted();
    },

    uploadPhotosCompleted() {
      // reset
      // 中层次
      this.$emit("upload-completed");
      this.reset();
    },

    reset() {
      // 低层次
      //上传成功后清空照片预览图
      this.wantUploadPhotos = [];
    },

    close() {
      this.$emit("update:visible", false);
    },
    addWantShowPhotos(e) {
      //一个 FileList 对象通常来自于一个 HTML <input> 元素的 files 属性
      // e.target.files可以获取FileList类数组
      console.log(e.target.files,'xxx');
      this.wantUploadPhotos.push(...Array.from(e.target.files));
    }
  }
};
</script>

<style></style>
