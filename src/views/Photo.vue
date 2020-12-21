<template>
  <div>
    <div class="container">
      <div class="photoHeader">
        <div class="imgContainer">
          <img class="photoName" src="../assets/1.jpg" />
        </div>
        <div class="btnContainer">
          <span class="photoTitle">相册名称</span>
          <button class="mybtn" @click="showUploadPhotoView = true">
            上传照片
          </button>
        </div>
      </div>

      <div class="photoContainer">
        <!-- 

        <div class="photoItem">
          <img src="img/Home.png" />
          <span>
            {{ photo.name }}
          </span>
        </div>

          -->


        <!-- 
<template v-for="photo in photos">
        <div class="photoItem" :key="photo.id">
          <img :src="photo.imgUrl" />
          <span>
            home
          </span>
        </div>
</template>
          -->

        <template v-for="photo in photos">
          <router-link
            :key="photo.id"
            :to="{ name: 'Detail', params: { id: photo.id } }"
            tag="div"
          >
            <div class="photoItem">
              <img :src="photo.imgUrl" />
              <span>
                {{ photo.name }}
              </span>
            </div>
          </router-link>
        </template>
      </div>
    </div>
    <UploadPhotoView
      :visible.sync="showUploadPhotoView"
      @upload-completed="handleUploadCompleted"
    ></UploadPhotoView>
  </div>
</template>

<script>
// import { apiGetPhotos } from "../api";
import UploadPhotoView from "../components/UploadPhotoView";
export default {
  components: {
    UploadPhotoView
  },

  //在组件的什么时机去请求后端的/getPhotos接口呢?
  async created() {
    // const res = await apiGetPhotos();
    // this.photos = res.data.data.photos;
    this.updatePhotos();
  },
  data() {
    return {
      showUploadPhotoView: false
    };
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    }
  },
  methods: {
    async handleUploadCompleted() {
      this.updatePhotos();
    },
    async updatePhotos() {
      this.$store.dispatch("updatePhotos");
      //   const res = await apiGetPhotos();
      //   this.photos = res.data.data.photos;
    }
  }
};
</script>

<style></style>
