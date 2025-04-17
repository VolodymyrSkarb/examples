<template>
  <div class="col-12 col-md-6 col-xl-4">
    <div class="card card-vehicle card-temp-vehicle">
      <div class="img-wrap">
        <picture>
          <source srcset="{{ asset('assets/images/temp-card.webp') }}" type="image/webp">
          <source srcset="{{ asset('assets/images/temp-card.png') }}" type="image/png">
          <img src="../../../images/temp-card.png" class="card-img-top" alt="List Your Bike">
        </picture>
      </div>
      <div class="card-body">
        <div class="content">
          <h5 class="card-title">{{ title }}</h5>
          <span>
            {{ subtitle }}
          </span>
        </div>
      </div>
      <div class="card-footer">
        <div class="content">
          <a href="/list-your-bike"
            class="btn btn-primary">
            List Your Motorcycle
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'List Your Bike',
  },
  subtitle: {
    type: String,
    default: 'Earn money by renting out your motorcycle',
  },
  linkIsLoggedIn: {
    type: String,
    default: '/my-account/vehicles',
  },
  linkNotIsLoggedIn: {
    type: String,
    default: '/login',
  },
});
</script>
