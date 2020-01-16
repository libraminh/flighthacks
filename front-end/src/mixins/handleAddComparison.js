import isMobile from "./isMobile"

export default {
  mixins: [isMobile],
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
  },
  data() {
    return {
      isInComparison: false
    }
  },
  computed: {
    amountCompare() {
      return this.isMobile ? 2 : 3;
    }
  },
  mounted () {
    // listen to local storage change to handle when remove all the cards
    document.addEventListener("local-storage-change", this.handleChangeLocalStorage, false);

    // get local storage at mounted to check if this card is already in the list
    let record = localStorage.getItem('comparing-cards');
    if (record) {
      record = JSON.parse(record);

      if (record.find(item => item.id.localeCompare(this.cardId) === 0))
        this.isInComparison = true;
    }
  },
  methods: {
    handleAddComparison() {
      let record = localStorage.getItem('comparing-cards');
      let data = {id: this.cardId, image: this.image, title: this.title};

      if (!record) {
        localStorage.setItem('comparing-cards', JSON.stringify([data]));
      } else {
        record = JSON.parse(record);

        let existingItem = record.find(item => item.id.localeCompare(this.cardId) === 0);
        if (existingItem) {
          // card already in comparing -> handle remove from the list
          record.splice(record.indexOf(existingItem), 1);
          this.isInComparison = false;
        } else {
          // if comparing list currently has more than [amountCompare] items,
          // shift the array to remove the first elements until there are less items than [amountCompare]
          for (let i = 0; i < record.length; i++) {
            if (record.length >= this.amountCompare)
              record.shift();
          }
          // not in the comparing -> handle add to the list
          record.push(data);
          this.isInComparison = true;
        }

        // update local storage
        localStorage.setItem('comparing-cards', JSON.stringify(record));
      }
    },
    handleChangeLocalStorage(data) {
      if (data.key === 'comparing-cards') {
        let record = JSON.parse(data.value);
        if (!record || !record.find(item => item.id === this.cardId)) {
          this.isInComparison = false;
        }
      }
    }
  },
}