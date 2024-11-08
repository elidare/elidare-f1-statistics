import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import worldData from '../assets/countries-110m.json'; // TODO

const WorldMap = ({ data }) => { // TODO add track names
  const svgRef = useRef();
  const map_width = 1200;
  const map_height = 645;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear previous SVG contents
    svg.selectAll("*").remove();

    // Set up projection and path
    // The geoMercator projection is commonly used for world maps, but you can experiment with others like geoEquirectangular 
    // depending on your needs.
    // Adjust the scale and translation to fit your SVG dimensions.
    const projection = d3.geoMercator().scale(150).translate([map_width / 2, map_height / 1.5]);
    const path = d3.geoPath().projection(projection);

    // Draw map
    svg
      .append("g")
      .selectAll("path")
      .data(topojson.feature(worldData, worldData.objects.countries).features)
      .join("path")
      .attr("d", path)
      .attr("fill", "rgba(159, 232, 252, 0.6)")
      .attr("stroke", "#555");

    console.log(data);
    if (data) { // TODO fix useEffect to get points from the beginning
        // Draw points
        svg
        .append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", (d) => projection([d.long, d.lat])[0])
        .attr("cy", (d) => projection([d.long, d.lat])[1])
        .attr("r", 5)
        .attr("fill", "red"); // TODO add name on hover
    }

  }, [data]);

  return <svg ref={svgRef} width={map_width} height={map_height}></svg>;
};

export default WorldMap;