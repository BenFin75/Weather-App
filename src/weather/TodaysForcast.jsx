import React from "react";
import ForcastChart from "./ForcastChart";

const TodaysForcast = ({ weather, units }) => {
  return (
    <div className="todays-forcast">
      { weather && <div className="title">
          Next 12 Hours
        </div>
      }
      <ForcastChart weather={weather} units={units} />
    </div>
  );
}
 
export default TodaysForcast;