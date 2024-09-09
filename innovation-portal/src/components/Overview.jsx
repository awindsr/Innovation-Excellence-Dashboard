import React, { useState, useEffect } from "react";
import { supabase } from '../utils/supabaseclient';
import Card from "./Card";
import PieChartComponent from "./Piechartcomponent";

export default function Overview() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const { data, error } = await supabase.rpc('get_overview_data');

        if (error) throw error;

        setCardData([
          {
            title: "Total Projects",
            value: data.total_projects.toString(),
            change: `${data.project_change > 0 ? '+' : ''}${data.project_change}% from last year`
          },
          {
            title: "Publications",
            value: data.total_publications.toString(),
            change: `${data.publication_change > 0 ? '+' : ''}${data.publication_change}% from last year`
          },
          {
            title: "Patents Filed",
            value: data.total_patents.toString(),
            change: `${data.patent_change > 0 ? '+' : ''}${data.patent_change}% from last year`
          },
          {
            title: "Grant Funding",
            value: `$${(data.total_grant_amount / 1000000).toFixed(1)}M`,
            change: `${data.grant_change > 0 ? '+' : ''}${data.grant_change}% from last year`
          }
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching overview data:", error);
        setError("Failed to load overview data. Please try again later.");
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  if (loading) return <div>Loading overview data...</div>;
  if (error) return <div>{error}</div>;

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