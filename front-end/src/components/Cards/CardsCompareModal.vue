<template>
  <div>
    <el-dialog
      :visible.sync="showModal"
      width="90%"
      class="comparing--change-modal"
      :show-close="false"
      @closed="$root.changeComparisonModal = false"
    >
      <template #title>
        <div class="d-flex justify-content-between align-items-center">
          <span class="font-weight-semi text-color-default">
            <slot
              name="title"
              :is-mobile="isMobile"
            />
          </span>

          <a
            :href="checkedCards.length >= 2 ? `${compareUrl}?id=${checkedCards.join(',')}` : 'javascript:void(0)'"
            :class="['btn btn--primary', {'btn--disabled': checkedCards.length < 2}]"
          >
            <slot name="cta" />
          </a>
        </div>
      </template>
      <el-checkbox-group
        v-model="checkedCards"
        :min="1"
        :max="isMobile ? 2 : 3"
        @change="handleCheck"
      >
        <div class="row flex-gap-md">
          <div 
            v-for="(i) in numCols"
            :key="i"
            :class="isMobile || numCols === 2 ? 'col-6' : 'col-4'"
          >
            <el-checkbox
              v-for="(card, j) in cards.filter((item, index) => (index + numCols) % numCols === i - 1)"
              :key="j"
              :label="card.id"
              class="d-flex flex-column margin-bottom-md text-center"
            >
              <div class="d-flex flex-column align-items-center width-100%">
                <div class="margin-bottom-md">
                  <img
                    :src="card.image"
                    :alt="card.title"
                    class="shadow-all"
                  >
                </div>

                <div class="margin-bottom-md">
                  <p class="font-weight-semi text-color-default">
                    {{ card.title }}
                  </p>
                </div>

                <div class="margin-bottom-md">
                  <p>{{ card.description }}</p>
                </div>
              </div>
            </el-checkbox>
          </div>
        </div>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>

<script>
  import watchComparingCards from '@/mixins/watchComparingCards'
  import isMobile from "@/mixins/isMobile";

  export default {
    name: "CardsCompareModal",
    mixins: [watchComparingCards, isMobile],
    props: {
      cards: {
        type: Array,
        default: () => []
      },
      showModal: {
        type: Boolean,
        default: false
      },
      compareUrl: {
        type: String,
        default: '/compare'
      }
    },
    data() {
      return {
        checkedCards: [],
        // breakpoint: 992,
      }
    },
    mounted () {
      if (this.currentCards) {
        this.currentCards.forEach(item => {
          this.checkedCards.push(item.id);
        })
      }
    },
    computed: {
      numCols() {
        return this.isMobile || this.cards.length <= 3 ? 2 : 3;
      }
    },
    watch: {
      isMobile(value) {
        if (value) {
          this.checkedCards.shift();

          this.handleCheck(this.checkedCards);
        }
      }
    },
    methods: {
      handleCheck(value) {
        let arr = [];
        value.forEach(id => {
          let card = this.cards.find(card => card.id === id);
          arr.push({id: card.id, image: card.image, title: card.title});
        });

        localStorage.setItem('comparing-cards', JSON.stringify(arr));
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>