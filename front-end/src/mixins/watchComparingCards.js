export default {
  data() {
    return {
      currentCards: [],
      currentCardsId: []
    }
  },
  mounted () {
    document.addEventListener("local-storage-change", this.localStorageSetHandler, false);
    let record = localStorage.getItem('comparing-cards');
    if (record) this.currentCards = JSON.parse(record);
  },
  methods: {
    localStorageSetHandler(data) {
      if (data.key === 'comparing-cards') {
        let record = JSON.parse(data.value);
        this.currentCards = record;
      }
    },
  },
}