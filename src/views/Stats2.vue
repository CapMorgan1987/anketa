<template>
  <v-row class="d-flex">
    <v-col cols="12" md="8" offset-md="2" class="my-3 pa-5">
      <GChart
        :settings="{ packages: ['bar'] }"
        :data="chartData"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
        @ready="onChartReady"
      />
    </v-col>
  </v-row>
</template>

<script>
  import { GChart } from "vue-google-charts";
  export default {
    components: {
      GChart,
    },
    data() {
      return {
        chartsLib: null,
        chartData: [
          ["Odgovori", "Postotak"],
          ["Po poreporuci", 9],
          ["Svidio mi se sadržaj", 6],
          ["Želim produbiti postojeće znanje o tematici", 8],
          ["Mislim da će mi pomoći u razvoju karijere", 5],
          ["Drugi razlozi", 2],
        ],
      };
    },
    computed: {
      chartOptions() {
        if (!this.chartsLib) return null;
        return this.chartsLib.charts.Bar.convertOptions({
          chart: {
            title: "Zbog čega ste se odlučili pohađati ovu edukaciju?",
          },
          bars: "horizontal",
          hAxis: {
            format: "decimal",
            viewWindow: {
              min: 0,
              max: 10,
            },
          },
          height: 400,
        });
      },
    },
    methods: {
      onChartReady(chart, google) {
        this.chartsLib = google;
      },
    },
  };
</script>