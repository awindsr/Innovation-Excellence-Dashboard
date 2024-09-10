// hooks/useFetchDepartmentCounts.js
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseclient'; // Adjust the import path as needed

const useFetchDepartmentData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentCounts = async () => {
      setLoading(true);
      try {
        // Call the Supabase function
        const { data, error } = await supabase.rpc('get_total_department_counts');

        if (error) throw error;

        setData(data);
      } catch (error) {
        setError("Failed to load department counts. Please try again later.");
        console.error("Error fetching department counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentCounts();
  }, []);

  return { data, loading, error };
};

export default useFetchDepartmentData;
