<template>
  <div>
    <div
      class="rounded-lg padding-xl@md padding-default margin-bottom-xl"
      style="background-color: #dafafb;"
    >
      <div class="text-component text-center@md">
        <h3 class="font-weight-normal margin-bottom-md">
          <slot name="modal-title" />
        </h3>

        <el-input-number
          v-model="quantity"
          :min="1"
          :max="maxAmount"
          class="margin-bottom-default"
        />

        <p><slot name="shares-info" /></p>
      </div>
    </div>

    <div class="grid grid-gap-md margin-bottom-xl@md margin-bottom-md">
      <div class="col-4@md">
        <div class="download-item">
          <div class="download__icon">
            <slot name="share-price-icon" />
          </div>

          <div class="download__text-wrapper">
            <p class="text-xs font-weight-bold text-dim">
              <slot name="share-price-text" />
            </p>
            <h4 class="font-weight-normal">
              {{ formatter.format(sharePrice) }}
            </h4>
          </div>
        </div>
      </div>
      <div class="col-4@md">
        <div class="download-item">
          <div class="download__icon">
            <slot name="invest-amount-icon" />
          </div>

          <div class="download__text-wrapper">
            <p class="text-xs font-weight-bold text-dim">
              <slot name="invest-amount-text" />
            </p>
            <h4 class="font-weight-normal">
              {{ formatter.format(investAmount) }}
            </h4>
          </div>
        </div>
      </div>
      <div class="col-4@md">
        <div class="download-item">
          <div class="download__icon">
            <slot name="rent-icon" />
          </div>

          <div class="download__text-wrapper">
            <p class="text-xs font-weight-bold text-dim">
              <slot name="rent-text" />
            </p>
            <h4 class="font-weight-normal">
              {{ formatter.format(rentPerMonth) }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <el-divider>
      <a
        :href="`${submitUrl}&quantity=${quantity}`"
        class="btn btn--primary btn--lg padding-y-sm"
      ><slot name="check-out-cta" /></a>
    </el-divider>
  </div>
</template>

<script>
  export default {
    name: "PropertyInvest",
    props: {
      lang: {
        type: String,
        default: "en-US"
      },
      currency: {
        type: String,
        default: "VND"
      },
      submitUrl: {
        type: String,
        default: '',
      },
      maxAmount: {
        type: Number,
        default: 100,
        required: true
      },
      sharePrice: {
        type: Number,
        default: 0,
        required: true
      },
      monthlyRental: {
        type: Number,
        default: 0,
        required: true
      },
    },
    data() {
      return {
        quantity: 1,
        formatter: Intl.NumberFormat(this.lang, {
          style: "currency",
          currency: this.currency,
          minimumFractionDigits: 0
        }),
      }
    },
    computed: {
      investAmount() {
        return parseFloat(this.sharePrice * this.quantity);
      },
      rentPerMonth() {
        return parseFloat(this.monthlyRental * (this.quantity / 100));
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>