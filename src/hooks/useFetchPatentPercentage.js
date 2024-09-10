import { useState, useEffect } from "react";
import { supabase } from '../utils/supabaseclient'; // Adjust the import path as needed

const useFetchPatentPercentage = () => {
  const [percentage, setPercentage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatentPercentage = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.rpc('fetch_patent_percentage');
        if (error) throw error;
        setPercentage(data[0]?.percentage_between_years || 0); // Data is in array, handle first item
      } catch (error) {
        setError("Failed to fetch patent percentage. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatentPercentage();
  }, []);

  return { percentage, loading, error };
};

export default useFetchPatentPercentage;
