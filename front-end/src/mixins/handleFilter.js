export default {
  props: {
    filterList: {
      type: Array,
      defaul: () => [],
      required: true
    },
    itemsList: {
      type: Array,
      default: () => [],
      required: true
    },
    perPage: {
      type: Number,
      default: 4
    },
  },
  data () {
    return {
      currentFilters: {},
      loading: false,
      shownCount: this.itemsList.length <= this.perPage ? this.itemsList.length : this.perPage, // If the itemsList is smaller then this.showActiveItems return current total itemsList else this.showActiveItems
      filtered: this.itemsList, // It show all itemsList by default
      tmpFiltered: this.itemsList,
      sortValue: undefined
    }
  },
  computed: {
    resultCount() {
      return this.filtered.length;
    },
    hasNoFilter() {
      return !Object.entries(this.currentFilters).length || !Object.values(this.currentFilters).find(item => item !== 'all');
    },
  },
  methods: {
    handleSort(type, slug, order) {
      switch(type) {
        case "text":
          if (order === 'asc')
            this.filtered = this.filtered.sort((a, b) => a[slug].localeCompare(b[slug])) // Sort array by firstname (alphabetically) in Javascript
          else
            this.filtered = this.filtered.sort((a, b) => {
              if (a[slug] > b[slug]) return -1;
              else if (a[slug] < b[slug]) return 1;
              return 0;
            })
          break;
        case "number":
          if (order === 'asc')
            this.filtered = this.filtered.sort((a, b) => parseFloat(a[slug]) - parseFloat(b[slug])) 
          else if (order === 'desc')
            this.filtered = this.filtered.sort((a, b) => parseFloat(b[slug]) - parseFloat(a[slug])) 
          break;
        default:
          // this.filtered = this.filtered.filter(item => item.category === slug); // array methods, Return an new array if the item is true to this condition 
          break;
      }
    },
    handleFilter(slug, scope) {
      // debugger;
      if (slug === 'all') {
        if (scope === 'category')
          this.tmpFiltered = this.itemsList;
        this.filtered = this.tmpFiltered;
      } else {
        this.filtered = this.itemsList.filter(item => item[scope] === slug)
        if (scope === 'category')
          this.tmpFiltered = this.filtered;
      }
    },
    async handleMultipleFilter() {
      this.loading = true;
      const self = this;

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (self.hasNoFilter) { // if no filter apply, return default list
            self.filtered = self.itemsList;
          } else {
            // count default total filter
            let filterCount = Object.entries(self.currentFilters).length;

            // traverse through the dfefault list
            self.filtered = self.itemsList.filter(item => {
              // compare with each filter in currentFilters
              let checkCount = 0;
              for (let key in self.currentFilters) {
                // if item type is string -> simply compare string
                if (typeof item[key] === "string") {
                  // if self current filter has no value or value = all -> return true also
                  if (!self.currentFilters[key] || self.currentFilters[key] === 'all' || item[key].localeCompare(self.currentFilters[key]) === 0)
                    checkCount++;
                } else if (typeof item[key] === "object") {
                  if (!self.currentFilters[key] || self.currentFilters[key] === 'all' || Object.values(item[key]).includes(self.currentFilters[key]))
                    checkCount++;
                }
              }

              // check checkCount
              if (checkCount === filterCount)
                return item;
            })
          }

          // self.filtered = self.items.filter(item => item.category === slug); // array methods, Return an new array if the item is true to self condition
          // self.count = self.filtered.length <= self.showActiveItems ? self.filtered.length : self.showActiveItems; // If the items is smaller then 4 return current total items else 4

          this.loading = false;

          resolve(1);
        }, 500);
      })

      const res = await promise;
      return Promise.resolve(res);
    }
  }
}
