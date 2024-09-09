import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseclient';
import TableWithFilters from './TableWithFilters';

const competitionHeaders = ['title', 'participants', 'date', 'location', 'category', 'rank_achieved', 'prize_amount', 'department', 'status', 'tags'];

export default function Competitions() {
  const [competitionsData, setCompetitionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const { data, error } = await supabase
          .from('competitions')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;

        const transformedData = data.map(competition => ({
          ...competition,
          tags: competition.tags ? competition.tags : [],
        }));

        setCompetitionsData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching competitions:', error);
        setError('Failed to load competitions. Please try again later.');
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  if (loading) return <div>Loading competitions...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <TableWithFilters type="competitions" data={competitionsData} headers={competitionHeaders} />
    </div>
  );
}