const d3 = require('d3');

/**
 * @return {object} The tooltip
 */
export function createTooltip() {
  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  return {
    setData([date, gdp]) {
      tooltip.html(`
        <p class="tooltip-gdp">${formatGDP(gdp)}</p>
        <p class="tooltip-date">${date}</p>
      `);
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
