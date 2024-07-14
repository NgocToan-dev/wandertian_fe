<template>
  <div class="statistics py-3 px-4">
    <h2 class="statistics-header">Statistics</h2>
    <div class="row">
      <div class="col">
        <apexchart width="500" type="bar" :options="options" :series="series"/>
      </div>
      <div class="col">col-2</div>
    </div>
  </div>
</template>

<script setup>
import {apexChartBuilder} from '@/components/chart/apexChart.js';

const {buildOptions, buildSeries} = apexChartBuilder();

const chart_id = 'chart-1';
const xaxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const options = buildOptions(chart_id, xaxis);

const series_name = ['series-1', 'series-2', 'series-3'];
const series_data = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]];
const series = buildSeries(series_name, series_data);
</script>

<style lang="scss"></style>
