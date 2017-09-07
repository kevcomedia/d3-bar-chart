const d3 = require('d3');
import {data} from '../data/GDP-data.json';

import './styles.scss';

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

// Bottom time axis
svg.append('g')
  .attr('transform', `translate(0, ${height - padding})`)
  .call(d3.axisBottom(xScale));

// Left GDP axis
svg.append('g')
  .attr('transform', `translate(${padding}, 0)`)
  .call(d3.axisLeft(yScale));

const tooltip = d3.select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('position', 'absolute')
  .style('background-color', '#fff')
  .style('opacity', 0);

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('fill', 'black')
  .attr('x', (d) => xScale(new Date(d[0])))
  .attr('y', (d) => yScale(d[1]))
  .attr('width', barWidth)
  .attr('height', (d) => height - padding - yScale(d[1]))
  .on('mouseover', ([date, gdp]) => {
    tooltip.html(`<p>${date}</p><p>${gdp}</p>`)
      .style('left', `${d3.event.pageX + 10}px`)
      .style('top', `${d3.event.pageY - 100}px`);

    tooltip.transition()
      .duration(50)
      .style('opacity', .9);
  })
  .on('mouseout', () => {
    tooltip.transition()
      .duration(150)
      .style('opacity', 0);
  });
