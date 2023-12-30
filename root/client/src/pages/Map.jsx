// Import necessary amCharts libraries
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import React, { useEffect, useRef } from "react";

const Map = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Create chart instance
    let chart = am4core.create("chartdiv", am4maps.MapChart);

    // Save chart reference to ref
    chartRef.current = chart;

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection type
    chart.projection = new am4maps.projections.Miller();

    // Enable zoom control
    chart.mouseWheelBehavior = "zoom";  // Enables zooming with the mouse wheel

    // If you want to enable panning (moving the map around) when zoomed in:
    chart.seriesContainer.draggable = true;  // Allows dragging the map
    chart.seriesContainer.resizable = true;  // Allows map resizing
    
    let resetButton = chart.chartContainer.createChild(am4core.Button);
    resetButton.icon = new am4core.Sprite();
    resetButton.align = "right";
    resetButton.valign = "top";
    resetButton.marginRight = 15;
    resetButton.marginTop = 15;
    resetButton.events.on("hit", function() {
    chart.goHome();
    });

    // Basic style for the reset button
    resetButton.width = 30;
    resetButton.height = 30;
    resetButton.background.fill = am4core.color("#164863");
    resetButton.background.stroke = am4core.color("#ffffff");
    resetButton.icon.stroke = am4core.color("#ffffff");



    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#74B266");

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    chart.cursorOverStyle = am4core.MouseCursorStyle.grab;

    // Add click event on each country
    polygonTemplate.events.on("hit", function(ev) {
      // Handle the click event here
      console.log("Clicked on country: ", ev.target.dataItem.dataContext.name);
    });

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default Map;
