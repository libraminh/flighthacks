export default {
    props: {
        filterList: {
          type: Array,
          defaul: () => []
        },
        items: {
          type: Array,
          default: () => [],
        },
        showActiveItems: {
          type: Number,
          default: 4
        },
    },
    data () {
      return {
        count: this.items.length <= this.showActiveItems ? this.items.length : this.showActiveItems,  // If the items is smaller then this.showActiveItems return current total items else this.showActiveItems
        filteredList: this.items, // It show all items by default
      }
    },
    methods: {
      handleFilter(slug) {
        if (slug === 'all') { 
          this.filteredList = this.items 
        } else {
          this.filteredList = this.items.filter(item => item.category === slug); // array methods, Return an new array if the item is true to this condition
        }
        this.count = this.filteredList.length <= this.showActiveItems ? this.filteredList.length : this.showActiveItems; // If the items is smaller then 4 return current total items else 4
      }
    }
}
