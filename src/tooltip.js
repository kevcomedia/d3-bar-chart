import * as d3 from './d3.exports.js';

/**
 * @return {object} The tooltip
 */
export function createTooltip() {
  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  tooltip.append('p')
    .attr('class', 'tooltip-gdp');
  tooltip.append('p')
    .attr('class', 'tooltip-date');

  return {
    setData([date, gdp]) {
      tooltip.selectAll('p')
        .data([formatGDP(gdp), formatDate(date)])
        .text((d) => d);

      return this;
    },
    setLocationOnPage({pageX = 0, pageY = 0} = {}) {
      tooltip.style('left', `${pageX + 20}px`)
        .style('top', `${pageY - 100}px`);

      return this;
    },
    setOpacity(opacity, durationMs) {
      tooltip.transition()
        .duration(durationMs)
        .style('opacity', opacity);

      return this;
    }
  };
};

/**
 * Returns a user-friendly representation of the GDP.
 *
 * @param {number} gdp The GDP value to format (in billions)
 * @return {string} The GDP with the following format: `${gdp} Billion`
 */
function formatGDP(gdp) {
  const options = {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    useGrouping: true
  };
  return `${gdp.toLocaleString('en-us', options)} Billion`;
}

/**
 * Converts a date string into a user-friendly representation.
 * @param {string} dateString The date string to format. It should be a date
 * string that can be passed to a `new Date()` call.
 * @return {string} A string with the format `Month, Year`
 * (example: August, 2000)
 */
function formatDate(dateString) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month}, ${year}`;
}
