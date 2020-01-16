<template>
  <div :id="chartId" />
</template>

<script>
  import Highcharts from 'highcharts';

  export default {
    name: "PieChart",
    props: {
      chartTotal: {
        type: String,
        default: ''
      },
      chartSize: {
        type: [String, Number],
        default: '70%'
      },
      height: {
        type: Number,
        default: 300
      },
      category: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: () => [],
        required: true,
      },
    },
    data() {
      return {
        chartId: `chart-${this._uid}`
      }
    },
    computed: {
      chartOptions() {
        return {
          series: [{
            name: this.category,
            data: this.data,
            size: this.chartSize,
            innerSize: '75%',
            showInLegend: true,
            dataLabels: {
              enabled: false
            }
          }],
          chart: {
            type: 'pie',
            height: this.height
          },
          credits: {enabled: false},
          exporting: {enabled: false},
          legend: {
            width: '100%',
            // itemWidth: 152,
            itemMarginBottom: 10,
            itemStyle: {'font-weight': 'normal'},
            symbolRadius: 2
          },
          title: {
            text: this.chartTotal,
            floating: true,
            align: 'center',
            verticleAlign: 'middle',
            y: this.height / 2 - 25
          },
          yAxis: {
            title: {
              text: 'Total percent market share'
            }
          },
          plotOptions: {
            pie: {
              shadow: false
            }
          },
          tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
            valuePrefix: '₫'
          },
        } 
      }
    },
    mounted () {
      Highcharts.chart(this.chartId, this.chartOptions);
    },
  }
</script>

<style lang="scss" scoped>

</style>