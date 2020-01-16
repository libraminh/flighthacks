<template>
  <div>
    <el-collapse 
      class="collapse-custom" 
      v-model="activeItem" 
      @change="handleChange"
      accordion>
      
      <el-collapse-item 
        class="padding-0"
        v-for="(item) in collapseItems"
        :name="item.tabName" 
        :key="item.tabName"
      >
        <template #title>
          <div class="margin-bottom-md d-flex align-items-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C9.44086 0 10.7742 0.360214 12 1.08065C13.2258 1.80107 14.1989 2.77419 14.9194 4C15.6398 5.22581 16 6.55914 16 8C16 9.44086 15.6398 10.7742 14.9194 12C14.1989 13.2258 13.2258 14.1989 12 14.9194C10.7742 15.6398 9.44086 16 8 16C6.55914 16 5.22581 15.6398 4 14.9194C2.77419 14.1989 1.80108 13.2258 1.08065 12C0.360215 10.7742 0 9.44086 0 8C0 6.55914 0.360215 5.22581 1.08065 4C1.80108 2.77419 2.77419 1.80107 4 1.08065C5.22581 0.360214 6.55914 0 8 0ZM8.00044 3.54834C7.63485 3.54834 7.31764 3.68275 7.04883 3.95156C6.78001 4.22038 6.6456 4.53759 6.6456 4.90318C6.6456 5.26877 6.78001 5.58598 7.04883 5.85479C7.31764 6.12361 7.63485 6.25802 8.00044 6.25802C8.36603 6.25802 8.68323 6.12361 8.95205 5.85479C9.22087 5.58598 9.35528 5.26877 9.35528 4.90318C9.35528 4.53759 9.22087 4.22038 8.95205 3.95156C8.68323 3.68275 8.36603 3.54834 8.00044 3.54834ZM9.80609 10.9678V11.742C9.80609 11.8495 9.76845 11.9409 9.69318 12.0162C9.61791 12.0914 9.52651 12.1291 9.41898 12.1291H6.58027C6.47275 12.1291 6.38135 12.0914 6.30608 12.0162C6.23081 11.9409 6.19318 11.8495 6.19318 11.742V10.9678C6.19318 10.8602 6.23081 10.7688 6.30608 10.6936C6.38135 10.6183 6.47275 10.5807 6.58027 10.5807H6.96737V8.51616H6.58027C6.47275 8.51616 6.38135 8.47853 6.30608 8.40326C6.23081 8.32799 6.19318 8.23659 6.19318 8.12906V7.35487C6.19318 7.24734 6.23081 7.15594 6.30608 7.08068C6.38135 7.00541 6.47275 6.96777 6.58027 6.96777H8.64479C8.75232 6.96777 8.84371 7.00541 8.91898 7.08068C8.99425 7.15594 9.03189 7.24734 9.03189 7.35487V10.5807H9.41898C9.52651 10.5807 9.61791 10.6183 9.69318 10.6936C9.76845 10.7688 9.80609 10.8602 9.80609 10.9678Z" fill="#FF3465"/>
            </svg>

            <span class="text-uppercase margin-x-xs">{{ item.title }}</span>

            <svg 
              :class="{ 'arrow-down-inActive' : item.tabName != activeItem }"
              width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.50012 5.84282L2.20767 0.390199C1.70269 -0.130065 0.883959 -0.130065 0.378979 0.390198C-0.126001 0.910462 -0.126001 1.75397 0.378979 2.27424L6.58578 8.66888C7.09076 9.18915 7.90949 9.18915 8.41447 8.66888L14.6213 2.27424C15.1262 1.75397 15.1262 0.910462 14.6213 0.390199C14.1163 -0.130065 13.2976 -0.130065 12.7926 0.390199L7.50012 5.84282Z" fill="#FF3465"/>
            </svg>
          </div>
        </template>

        <div class="bg-default padding-md rounded-sm margin-bottom-md" data-theme="gray">
          <div class="grid grid-gap-md">
            <div class="col-12 col-4@md"></div>
            <div class="col-12 col-8@md">
              <div class="card-showcase text-component" v-html="item.content"></div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: 'Accordion',
    props: {
      collapseItems: {
        type: Array,
        default: () => [],
        required: true
      }
    },
    data() {
      return {
        activeItem: ''
      }
    },
    mounted () {
      this.findActiveItem();
    },
    methods: {
      handleChange(val) {
        console.log('val', val);
      },
      findActiveItem() {
        this.collapseItems.find(item => {
          if (item.active)
            this.activeItem = item.tabName;
        });
      }
    },
  }
</script>

<style lang="scss">
  .collapse-custom {
    .el-collapse-item__content,
    .el-collapse-item__header {
      padding: 0 !important;
    }

    .el-collapse-item__arrow.el-icon-arrow-right { display: none !important }

    .collapse-arrow-down {
      transform-origin: center;
      transition: all .2s ease-in-out;
    }

    .arrow-down-inActive {
      transform: rotate(-90deg);
    }
  }
</style>