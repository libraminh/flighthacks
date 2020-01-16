<template>
  <div :id="chartId" />
</template>

<script>
  import Highcharts from 'highcharts';

  export default {
    name: 'StackedChart',
    props: {
      category: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 156
      },
      data: {
        type: Array,
        default: () => [],
        required: true,
        validator: (value) => value.every(item => (item.name !== undefined && item.data !== undefined))
      },
    },
    data() {
      return {
        chartId: `chart-${this._uid}`,
      }
    },
    computed: {
      chartOptions() {
        return {
          series: [...this.data],
          chart: {
            type: 'bar',
            height: this.height,
          },
          credits: {enabled: false},
          exporting: {enabled: false},
          title: {
            text: ''
          },
          xAxis: {
            categories: [this.category],
            lineWidth: 0,
            labels: {enabled: false}
          },
          yAxis: {
            min: 0,
            title: {
              text: '',
              enabled: false
            },
            labels: {enabled: false},
            lineWidth: 0,
            gridLineWidth: 0,
            reversedStacks: false
          },
          legend: {
            width: '100%',
            // itemWidth: 152,
            itemMarginBottom: 10,
            itemStyle: {'font-weight': 'normal'},
            symbolRadius: 2
          },
          plotOptions: {
            series: {
              stacking: 'percent'
            },
            bar: {
              borderRadius: 0
            }
          }
        }
      }
    },
    mounted () {
      Highcharts.chart(this.chartId, this.chartOptions);
    },
  }
</script>


<style lang="scss">
  // .apexcharts-legend {
  //   margin-top: 24px !important;
  // }

  // .apexcharts-legend-series {
  //   width: calc(100% / 3 - 10px) !important;
  // }
</style>
