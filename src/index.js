const d3 = require('d3');
import {data, description} from '../data/GDP-data.json';

import 'normalize.css';
import './styles.scss';

import {createTooltip} from './tooltip.js';

const width = 1000;
const height = 500;
const padding = {
  bottom: 50,
  left: 50,
  right: 15,
  top: 25,
};

const barWidth = Math.ceil(width / data.length);

const svg = d3.select('#chart')
  .attr('width', width)
  .attr('height', height);

const xScale = d3.scaleTime()
  .domain([new Date(data[0][0]), new Date(data[data.length - 1][0])])
  .range([padding.left, width - padding.right]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, (d) => d[1])])
  .range([height - padding.bottom, padding.top]);

// Bottom time axis
svg.append('g')
  .attr('transform', `translate(0, ${height - padding.bottom})`)
  .call(d3.axisBottom(xScale));

// Left GDP axis
svg.append('g')
  .attr('transform', `translate(${padding.left}, 0)`)
  .call(d3.axisLeft(yScale));

const tooltip = createTooltip();

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', (d) => xScale(new Date(d[0])))
  .attr('y', (d) => yScale(d[1]))
  .attr('width', barWidth)
  .attr('height', (d) => height - padding.bottom - yScale(d[1]))
  .on('mouseover', (d) => {
    tooltip.setData(d)
      .setLocationOnPage(d3.event)
      .setOpacity(.95, 50);
  })
  .on('mouseout', () => {
    tooltip.setOpacity(0, 150);
  });

d3.select('.description')
  // Make it so the URL in the description is in its own line
  .html(description.replace(' - ', '<br>'));
