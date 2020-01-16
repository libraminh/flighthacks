export default {
    props: {
        filtersList: {
          type: Array,
          defaul: () => []
        },
        items: {
          type: Array,
          default: () => [],
        },
        showActiveItems: {
          type: Number,
          default: 2
        },
    },
    data () {
      return {
        filterLoading: false,
        currentFilters: {},
        count: this.items.length <= this.showActiveItems ? this.items.length : this.showActiveItems,  // If the items is smaller then this.showActiveItems return current total items else this.showActiveItems
        filteredList: this.items, // It show all items by default,
      }
    },
    computed: {
      resultCount() {
        return this.filteredList.length;
      },
      noFilter() {
        return !Object.entries(this.currentFilters).length;
      }
    },
    mounted () {
      // init currenFilters Object
      // this.filtersList.forEach(item => {
      //   this.currentFilters[item.slug] = "";
      // })
    },
    methods: {
      handleFilter() {
        this.filterLoading = true;
        const self = this;

        setTimeout(() => {
          if (self.noFilter) { // if no filter apply, return default list
            self.filteredList = self.items;
          } else {
            // count default total filter
            let filterCount = Object.entries(self.currentFilters).length;

            // traverse through the dfefault list
            self.filteredList = self.items.filter(item => {
              // compare with each filter in currentFilters
              let count = 0;
              Object.keys(self.currentFilters).forEach(key => {
                // debugger;
                // if item type is string -> simply compare string
                if (typeof item[key] === "string") {
                  // if self current filter has no value -> return true also
                  if (!self.currentFilters[key] || item[key] === self.currentFilters[key])
                    count++;
                } else if (typeof item[key] === "object") {
                  if (!self.currentFilters[key] || item[key].find(el => el.value === self.currentFilters[key]))
                    count++;
                }
              })

              // check count
              if (count === filterCount)
                return item;
            })
          }

          // self.filteredList = self.items.filter(item => item.category === slug); // array methods, Return an new array if the item is true to self condition
          self.count = self.filteredList.length <= self.showActiveItems ? self.filteredList.length : self.showActiveItems; // If the items is smaller then 4 return current total items else 4

          this.filterLoading = false;
        }, 500);
      }
    }
}
