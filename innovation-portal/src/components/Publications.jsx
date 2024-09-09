import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseclient';
import TableWithFilters from './TableWithFilters';

const publicationHeaders = ['title', 'authors', 'journal', 'publication_date', 'doi', 'department', 'type', 'citations', 'tags'];

export default function Publications() {
  const [publicationsData, setPublicationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const { data, error } = await supabase
          .from('publications')
          .select('*')
          .order('publication_date', { ascending: false });

        if (error) throw error;

        const transformedData = data.map(publication => ({
          ...publication,
          tags: publication.tags ? publication.tags : [],
        }));

        setPublicationsData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching publications:', error);
        setError('Failed to load publications. Please try again later.');
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  if (loading) return <div>Loading publications...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <TableWithFilters type="publications" data={publicationsData} headers={publicationHeaders} />
    </div>
  );
}