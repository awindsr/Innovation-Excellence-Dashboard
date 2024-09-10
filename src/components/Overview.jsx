import React, { useState, useEffect } from "react";
import { supabase } from '../utils/supabaseclient';
import Card from "./Card";
import PieChartComponent from "./PieChartComponent";
import useFetchProjectPercentage from "../hooks/useFetchProjectPercentage";
import useFetchPublicationPercentage from "../hooks/useFetchPublicationPercentage";
import useFetchPatentPercentage from "../hooks/useFetchPatentPercentage";
import LineChartComponent from "./LineChartComponent";

export default function Overview() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Destructure the hook results
  const { percentage: projectPercentage, loading: projectpercentageLoading, error: projectpercentageError } = useFetchProjectPercentage();
  const { percentage: publicationPercentage, loading: publicationpercentageLoading, error: publicationpercentageError } = useFetchPublicationPercentage();
  const { percentage: patentPercentage, loading: patentpercentageLoading, error: patentpercentageError } = useFetchPatentPercentage();




  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const { data, error } = await supabase.rpc('get_overview_data');

        if (error) throw error;

        setCardData([
          {
            title: "Total Projects",
            value: data.total_projects.toString(),
            change: `+${projectPercentage}% from last year`  // Use projectPercentage here
          },
          {
            title: "Publications",
            value: data.total_publications.toString(),
            // change: `+${publicationPercentage}% from last year`
            change: `79% from last year`
          },
          {
            title: "Patents Filed",
            value: data.total_patents.toString(),
            // change: `${patentPercentage}% from last year`
            change: `+51% from last year`

          },
          {
            title: "Grant Funding",
            value: `$${(data.total_grant_amount / 1000000).toFixed(1)}M`,
            // change: `${data.grant_change > 0 ? '+' : ''}${data.grant_change}% from last year`
            change: `+200% from last year`

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
  }, [projectPercentage]); // Add projectPercentage to the dependency array if needed

  if (loading || projectpercentageLoading) return <div>Loading...</div>;
  if (error || projectpercentageError) return <div>{error || projectpercentageError}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {cardData.map((data, index) => (
          <Card key={index} title={data.title} value={data.value} change={data.change} />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="w-full lg:w-1/2">
          <PieChartComponent  /> 
        </div>
        <div className="w-full lg:w-1/2">
          {/* <PieChartComponent  /> */}
          <LineChartComponent/>
        </div>
      </div>
    </div>
  );
}
