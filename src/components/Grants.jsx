import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseclient';
import TableWithFilters from './TableWithFilters';

const grantHeaders = ['title', 'granting_agency', 'amount', 'start_date', 'end_date', 'principal_investigator', 'department', 'status', 'tags'];

export default function Grants() {
  const [grantsData, setGrantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        const { data, error } = await supabase
          .from('grants')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;

        const transformedData = data.map(grant => ({
          ...grant,
          tags: grant.tags ? grant.tags : [],
        }));

        setGrantsData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching grants:', error);
        setError('Failed to load grants. Please try again later.');
        setLoading(false);
      }
    };

    fetchGrants();
  }, []);

  if (loading) return <div>Loading grants...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <TableWithFilters type="grants" data={grantsData} headers={grantHeaders} />
    </div>
  );
}