<template>
  <div
    data-theme="default"
    class="card"
  >
    <div class="card__inner">
      <div class="grid-wrapper">
        <div class="grid-item">
          <div class="d-flex align-items-start margin-bottom-xl@lg margin-bottom-lg">
            <img
              :src="image"
              :alt="title"
              class="width-100%"
            >
          </div>

          <card-ctas 
            :card-id="cardId"
            :title="title"
            :image="image"
            class="flex-column display@md"
          >
            <template #apply-now>
              <slot name="apply-now" />
            </template>
            <template #read-review>
              <slot name="read-review" />
            </template>
          </card-ctas>
        </div>

        <div class="grid-item">
          <header class="padding-left-xl@lg padding-left-md@md padding-bottom-lg@md margin-bottom-lg has-border@md border-bottom border-default">
            <div class="position-relative">
              <div class="d-flex align-items-center margin-bottom-0@lg margin-bottom-xs">
                <el-rate
                  :value="rating"
                  disabled
                  allow-half
                  :colors="['#ff3465', '#ff3465', '#ff3465']"
                  disabled-void-color="#ccc"
                  class="display@lg"
                />

                <div class="hide@lg rating-wrapper d-inline-flex flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                  >
                    <path
                      fill="#FF3465"
                      fill-rule="nonzero"
                      d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z"
                    />
                  </svg>
                  <span class="margin-left-xxs font-weight-semi text-color-default">{{ rating }}</span>
                </div>

                <img
                  :src="logo"
                  alt="logo"
                >
              </div>

              <p class="font-weight-semi text-color-default text-lg">
                {{ title }}
              </p>
            </div>
          </header>

          <ul class="list-dots row flex-gap-x-lg flex-gap-y-sm padding-left-xl@lg padding-left-md@md margin-left-0">
            <li 
              v-for="(item, index) in features"
              :key="index"
              class="col-12 col-6@lg"
            >
              <div class="">
                {{ item.title }}
                <el-tooltip
                  class="margin-left-xxs"
                  effect="dark"
                  :content="item.tooltip"
                  placement="bottom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#000"
                      fill-rule="evenodd"
                      d="M16 8c0 1.44-.36 2.774-1.08 4A8.084 8.084 0 0 1 12 14.92 7.755 7.755 0 0 1 8 16c-1.44 0-2.774-.36-4-1.08A8.084 8.084 0 0 1 1.08 12 7.755 7.755 0 0 1 0 8c0-1.44.36-2.774 1.08-4A8.084 8.084 0 0 1 4 1.08 7.755 7.755 0 0 1 8 0c1.44 0 2.774.36 4 1.08A8.084 8.084 0 0 1 14.92 4 7.755 7.755 0 0 1 16 8zM8.226 2.645c-.86 0-1.602.183-2.226.549-.58.322-1.097.828-1.548 1.516-.065.086-.086.177-.065.274a.407.407 0 0 0 .161.242l1.13.839c.064.064.15.09.257.08A.353.353 0 0 0 6.194 6c.344-.409.612-.688.806-.839a1.731 1.731 0 0 1 1.032-.322c.366 0 .705.102 1.016.306.312.204.468.457.468.758 0 .237-.097.441-.29.613-.13.108-.377.269-.742.484l-.065.032c-.537.301-.914.57-1.129.807a2.04 2.04 0 0 0-.58 1.451v.13c0 .107.037.198.113.274a.373.373 0 0 0 .274.112h1.806a.373.373 0 0 0 .274-.112.373.373 0 0 0 .113-.275v-.032c0-.172.086-.322.258-.452.108-.086.312-.215.613-.387.56-.344.957-.645 1.194-.903.408-.451.613-1.021.613-1.71 0-.602-.183-1.155-.549-1.66A3.84 3.84 0 0 0 10 3.08a3.927 3.927 0 0 0-1.774-.436zm-.226 8a1.43 1.43 0 0 0-1.048.436c-.29.29-.436.64-.436 1.048 0 .409.145.758.436 1.048.29.29.64.436 1.048.436a1.43 1.43 0 0 0 1.048-.436c.29-.29.436-.64.436-1.048a1.43 1.43 0 0 0-.436-1.048A1.43 1.43 0 0 0 8 10.645z"
                    />
                  </svg>
                </el-tooltip>
              </div>
            </li>
          </ul>

          <card-ctas 
            :card-id="cardId"
            :title="title"
            :image="image"
            class="flex-column hide@md margin-y-md padding-left-xl@lg padding-left-md@md"
          >
            <template #apply-now>
              <slot name="apply-now" />
            </template>
            <template #read-review>
              <slot name="read-review" />
            </template>
            <template #add-comparison>
              <slot name="add-comparison" />
            </template>
            <template #remove-comparison>
              <slot name="remove-comparison" />
            </template>
          </card-ctas>

          <div class="text-component padding-left-xl@lg padding-left-md@md">
            <div class="text-fade-wrapper">
              <p class="">
                {{ description }}
              </p>
            </div>
            <a
              class="d-inline-block text-center text-color-primary text-underline font-weight-semi margin-top-sm"
              :href="detailsUrl"
            >
              <slot name="more-details" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import handleAddComparison from "../../mixins/handleAddComparison";
  // import CardCtas from "./CardCtas.vue";

  export default {
    name: "CardBox",
    // components: {CardCtas},
    props: {
      cardId: {
        type: String,
        default: "",
        required: true
      },
      image: {
        type: String,
        default: "",
        required: true
      },
      title: {
        type: String,
        default: "",
        required: true
      },
      logo: {
        type: String,
        default: ""
      },
      externalUrl: {
        type: String,
        default: ""
      },
      detailsUrl: {
        type: String,
        default: ""
      },
      rating: {
        type: Number,
        default: 0
      },
      features: {
        type: Array,
        default: () => []
      },
      description: {
        type: String,
        default: ""
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>