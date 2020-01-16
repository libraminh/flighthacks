<template>
  <section class="section section--comming-soon">
    <div class="section__inner margin-0 padding-x-lg@md height-100% width-100%">
      <div class="row height-100% padding-md padding-0@md">
        <div class="col-2@md position-relative">
          <div class="text-center text-left@md padding-top-lg@md padding-y-md">
            <img
              class=""
              src="/img/black-logo.svg"
              alt=""
            >  
          </div>

          <img
            src="/img/objects/coming-left-image.jpg"
            alt=""
            class="absolute-center hide@xs display@md"
          >
        </div>
        <div class="col-4@md main-content position-relative">
          <div class="wrapper">
            <img
              src="/img/objects/coming-header.jpg"
              alt=""
              class="width-100%"
            >

            <h2 class="padding-y-lg">
              Comming Soon
            </h2>
            <p class="padding-y-lg padding-top-0">
              Sign up to receive an exclusive 20% off gift voucher and get notified when we launch.
            </p>
            
            <form>
              <input
                type="checkbox"
                required
                name=""
                id="promotion"
              >
              <label
                for="promotion"
                class="form-label"
              >I would like to receive E-Mails with promotion offers.</label>
              <br>
              <label
                for="email"
                class="form-label"
              >↳ Enter your email </label>
              <br>   
              <div class="flex">
                <input
                  type="email"
                  required
                  placeholder="Example@xyz.com"
                  id="email"
                > 
                <input
                  type="submit"
                  value="Submit"
                  class="btn"
                >
              </div>
            </form>
            <p class="padding-top-xxl">
              Modern skincare for those who want natural ingredients and expect scientific results.
            </p>
          </div>
        </div>
        <div class="col-5@md display@md margin-left-auto ">
          <div class="wrapper d-flex align-items-center right-image height-100% ">
            <img
              src="/img/objects/coming-bottom.jpg"
              alt=""
              class="decor bottom-image position-absolute"
            >
            <img
              src="/img/objects/coming-right.jpg"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "ComingSoon",
  }
</script>

<style lang="scss" scoped>

</style>