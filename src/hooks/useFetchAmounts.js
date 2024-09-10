import { useState, useEffect } from "react";
import { supabase } from '../utils/supabaseclient'; // Adjust the import path as needed

const useFetchAmounts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAmounts = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: result, error } = await supabase
          .from('grants')
          .select('amount, date')
          .order('date', { ascending: true });

        if (error) throw error;

        // Process and format the data
        const formattedData = result.map(item => ({
          amount: parseFloat(item.amount),
          date: new Date(item.date).toISOString().split('T')[0] // Format as YYYY-MM-DD
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching amounts:", error);
        setError("Failed to fetch amounts and dates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAmounts();
  }, []);

  return { data, loading, error };
};

export default useFetchAmounts;
