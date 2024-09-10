import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseclient';
import TableWithFilters from './TableWithFilters';

const patentHeaders = ['title', 'inventors', 'patent_number', 'filing_date', 'status', 'department', 'tags'];

export default function Patents() {
  const [patentsData, setPatentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatents = async () => {
      try {
        const { data, error } = await supabase
          .from('patents')
          .select('*')
          .order('filing_date', { ascending: false });

        if (error) throw error;

        const transformedData = data.map(patent => ({
          ...patent,
          tags: patent.tags ? patent.tags : [],
        }));

        setPatentsData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patents:', error);
        setError('Failed to load patents. Please try again later.');
        setLoading(false);
      }
    };

    fetchPatents();
  }, []);

  if (loading) return <div>Loading patents...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <TableWithFilters type="patents" data={patentsData} headers={patentHeaders} />
    </div>
  );
}