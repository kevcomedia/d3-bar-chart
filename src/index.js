const d3 = require('d3');
import {data} from '../data/GDP-data.json';

const width = 1000;
const height = 500;
const padding = 50;

const barWidth = width / data.length;

const svg = d3.select('#chart')
  .attr('width', width)
  .attr('height', height);

const xScale = d3.scaleTime()
  .domain([new Date(data[0][0]), new Date(data[data.length - 1][0])])
  .range([padding, width - padding]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, (d) => d[1])])
  .range([height - padding, padding]);

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('fill', 'black')
  .attr('x', (d) => xScale(new Date(d[0])))
  .attr('y', (d) => yScale(d[1]))
  .attr('width', barWidth)
  .attr('height', (d) => height - padding - yScale(d[1]));
