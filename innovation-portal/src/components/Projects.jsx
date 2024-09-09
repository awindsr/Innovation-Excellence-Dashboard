import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseclient';
import TableWithFilters from './TableWithFilters';

const projectHeaders = ['title', 'status', 'done_by', 'department', 'date', 'funding_source', 'duration', 'tags'];

export default function Projects() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;

        const transformedData = data.map(project => ({
          ...project,
          doneBy: project.done_by,
          fundingSource: project.funding_source,
          tags: project.tags ? project.tags : [],
        }));

        setProjectsData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <TableWithFilters type="projects" data={projectsData} headers={projectHeaders} />
    </div>
  );
}