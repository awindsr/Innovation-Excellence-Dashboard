import React from "react";
import Card from "./Card";
import PieChartComponent from "./Piechartcomponent";

export default function Overview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <PieChartComponent/>
        <PieChartComponent/>

      </div>
    </div>
  );
}
