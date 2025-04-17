<template>
  <div v-if="!makesLength" class="filter-wrap placeholder-glow">
    <div class="filter-badge placeholder col-1">
      <span class="placeholder col-12 rounded"></span>
    </div>
  </div>
  <div class="row row-card">
    <div class="col-12 col-md-6 col-xl-4" v-for="item in perPage" :key="item">
      <div class="card placeholder-glow">
        <div class="img-wrap">
          <img src="../../../images/placeholderImage.svg" class="card-img-top" alt="..." :style="{width: '397px', height: '397px'}">
        </div>
        <div class="card-body">
          <div class="content">
            <h5 class="card-title">
              <span class="placeholder col-3"></span>
            </h5>
            <p class="card-text">
              <span class="placeholder col-7"></span>
            </p>
          </div>
        </div>
        <div class="card-footer">
          <div class="content">
            <a href="#" class="btn btn-outline-secondary disabled">Check Availability</a>
            <div class="price-box">
              <span class="placeholder col-12"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({ perPage: Number, makesLength: Number });
</script>
