import React from "react";
import Card from "./Card";
import PieChartComponent from "./Piechartcomponent";

export default function Overview() {
  const cardData = [
    {
      title: "Total Projects",
      value: "65",
      change: "+10% from last year"
    },
    {
      title: "Publications",
      value: "120",
      change: "+15% from last year"
    },
    {
      title: "Patents Filed",
      value: "15",
      change: "+5% from last year"
    },
    {
      title: "Grant Funding",
      value: "$2.5M",
      change: "+20% from last year"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {cardData.map((data, index) => (
          <Card key={index} title={data.title} value={data.value} change={data.change} />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="w-full lg:w-1/2">
          <PieChartComponent/>
        </div>
        <div className="w-full lg:w-1/2">
          <PieChartComponent/>
        </div>
      </div>
    </div>
  );
}