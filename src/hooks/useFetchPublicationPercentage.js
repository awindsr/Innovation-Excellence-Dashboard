import { useState, useEffect } from 'react';
import { supabase } from "../utils/supabaseclient";

const useFetchPublicationPercentage = () => {
  const [percentage, setPercentage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .rpc('fetch_publication_percentage');

        if (error) throw error;

        if (data && data.length > 0) {
          setPercentage(data[0].percentage_between_years);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { percentage, loading, error };
 
};

export default useFetchPublicationPercentage;
