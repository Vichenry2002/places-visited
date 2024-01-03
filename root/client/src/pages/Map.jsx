// Map.jsx
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const Map = forwardRef(({ onCountryClick, visitedCountries, wishlistedCountries }, ref) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart = am4core.create("chartdiv", am4maps.MapChart);
    chartRef.current = chart;
    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();
    chart.mouseWheelBehavior = "zoom";
    chart.seriesContainer.draggable = true;
    chart.seriesContainer.resizable = true;
    
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#74B266");
    polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    chart.cursorOverStyle = am4core.MouseCursorStyle.grab;

    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    polygonTemplate.events.on("hit", function(ev) {
      var country = ev.target;
      chart.zoomToMapObject(country);
      setTimeout(() => {
        onCountryClick(country.dataItem.dataContext.name);
      }, 1000); // Delay of 1 second
    });

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    zoomToCoordinates: ({ latitude, longitude, zoomLevel }) => {
      if (chartRef.current) {
        chartRef.current.zoomToGeoPoint({ latitude, longitude }, zoomLevel, true);
      }
    }
  }));

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
});

export default Map;
