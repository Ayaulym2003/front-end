<template>
  <div class="loader" v-if="loading">
    <a-spin />
  </div>
  <div class="all">
    <div v-if="orderId != null && orderId != ''" :key="0">
      <div
        style="padding-left: 2.5vw; padding-right: 2.5vw; padding-top: 2.5vw"
      >
        <h2 style="color: black; font-size: 20px">Order #{{ orderId }}</h2>
        <h2 style="color: rgb(221, 127, 48); font-size: 18px">
          {{ $timeFormat(dataList.createTime, 0) }}
        </h2>
      </div>
      <div
        style="
          padding-left: 2.5vw;
          padding-right: 2.5vw;
          height: 40vh;
          width: 100%;
          overflow-y: scroll;
        "
      >
        <div
          v-for="(item, index) in dataList.menu"
          :key="item.name"
          class="outer"
        >
          <div class="inner">
            <img :src="baseURL + item.path" alt="" class="photo" />
            <div style="width: 100%">
              <h1>{{ item.name }}</h1>
              <h2>{{ item.ingredient }}</h2>

              <div class="flex-container">
                <div>{{ item.price }} tg x {{ dataList.quantity[index] }}</div>
                <div>{{ calc(item.price, dataList.quantity[index]) }} TG</div>
              </div>
            </div>
          </div>
          <hr style="color: rgb(239, 239, 239)" />
        </div>
      </div>
      <div class="inner2">
        <h1>Items: {{ length() }}</h1>
        <hr style="color: rgb(221, 127, 48)" />
        <h2
          style="display: flex; justify-content: space-between; font-size: 20px"
        >
          Total:
          <div style="font-size: 20px">{{ dataList.total }} TG</div>
        </h2>
      </div>
    </div>
    <div v-else>
      <div style="padding: 2.5em">
        <h2 style="color: black; font-size: 20px; margin: 0">
          There is no pre-order!
        </h2>
      </div>
    </div>
  </div>
</template>


<script>
import { OrderApi } from "@/api/order";
import config from "@/config/index.js";

export default {
  data() {
    return {
      baseURL: config.baseURL + "/",
      baseURL2: config.baseURL + "/upload/file",
      dataList: [],
      length2: 0,
      loading: false,
    };
  },
  props: {
    orderId: String,
  },
  watch: {
    orderId: {
      immediate: true,
      handler(newOrderId) {
        if (newOrderId) {
          this.loadData();
        }
      },
    },
  },
  methods: {
    async loadData() {
      this.loading = true;
      const orderId = this.orderId;
      const uid = "";
      const rid = localStorage.getItem("rid");
      OrderApi("get", { uid, rid, orderId })
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data));
          this.length2 = this.dataList.menu.length;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    length() {
      return this.length2;
    },
    calc(price, quantity) {
      return price * quantity;
    },
  },
};
</script>

<style scoped>
.all {
  background-color: white;
  height: fit-content;
  width: 28vw;
  border: 1px solid rgb(221, 127, 48);
  border-radius: 20px;
  position: fixed;
}
.outer {
  width: 100%;
}
.inner {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1em;
}
.inner2 {
  padding: 2em;
  padding-bottom: 2em;
  width: 100%;
  position: relative;
  border-radius: 20px;
  background-color: white;
  height: fit-content;
  border: 2px solid black;
}
.photo {
  width: 5em;
  height: 5em;
  object-fit: cover;
  border-radius: 20%;
}
.flex-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>