// Import necessary amCharts libraries
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import React, { useEffect, useRef } from "react";

const Country = ({name}) => {
 

  useEffect(() => {
    console.log(name);
  });

  return <div>{name}</div>
   
};

export default Country;
