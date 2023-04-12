<!--
 * @Author: Tentel
 * @Date: 2022-06-27 16:17:06
 * @LastEditors: Tentel
 * @LastEditTime: 2022-10-12 15:22:30
-->
<template>
  <div>
    <PubHeader></PubHeader>
    <div :class="['clearFlxed',{'no-margin':noMargin}]">
      <Nuxt></Nuxt>
    </div>
    <PubFooter></PubFooter>
  </div>
</template>
<script>
export default {
  computed: {
    noMargin() {
      return window.__POWERED_BY_QIANKUN__;
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

.clearFlxed {
  margin-top: 98px;
}
.no-margin {
  margin-top: 0;
}
</style>
