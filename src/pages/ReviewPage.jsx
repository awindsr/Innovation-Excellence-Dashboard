import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseclient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faLink } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';

const ReviewSubmissions = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [submissions, setSubmissions] = useState([]);
  const [submissionType, setSubmissionType] = useState('projects');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, [submissionType]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(submissionType)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to fetch submissions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id, voteType) => {
    try {
      const { data: currentSubmission } = await supabase
        .from(submissionType)
        .select('votes')
        .eq('id', id)
        .single();

      let votes = currentSubmission.votes || [{ upvote: 0, downvote: 0 }];
      const lastVote = votes[votes.length - 1];

      if (voteType === 'upvote') {
        votes.push({ upvote: lastVote.upvote + 1, downvote: lastVote.downvote });
      } else {
        votes.push({ upvote: lastVote.upvote, downvote: lastVote.downvote + 1 });
      }

      const { error } = await supabase
        .from(submissionType)
        .update({ votes })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, votes } : sub
      ));
    } catch (error) {
      console.error('Error updating vote:', error);
      setError('Failed to update vote. Please try again.');
    }
  };

  // if (!user || user.role !== 'faculty') {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading submissions...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Review Submissions</h1>
      <div className="mb-4">
        <label htmlFor="submissionType" className="mr-2">Submission Type:</label>
        <select
          id="submissionType"
          value={submissionType}
          onChange={(e) => setSubmissionType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="projects">Projects</option>
          <option value="publications">Publications</option>
          <option value="patents">Patents</option>
          <option value="grants">Grants</option>
          <option value="competitions">Competitions</option>
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Submitted By</th>
            <th className="border p-2">Votes</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id} className="border-b">
              <td className="border p-2">{submission.title}{" "}<FontAwesomeIcon 
                icon={faLink} 
                className="text-black text-[.8rem] cursor-pointer" 
                onClick={() => navigate(submission.link)} 
            /></td>
              <td className="border p-2">{submission.description}</td>
              <td className="border p-2">{submission.done_by}</td>
              <td className="border p-2">
                {submission.votes && submission.votes.length > 0 ? (
                  <span>
                    👍 {submission.votes[submission.votes.length - 1].upvote} | 
                    👎 {submission.votes[submission.votes.length - 1].downvote}
                  </span>
                ) : (
                  <span>No votes yet</span>
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleVote(submission.id, 'upvote')}
                  className="bg-green-500 text-white p-2 rounded mr-2"
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <button
                  onClick={() => handleVote(submission.id, 'downvote')}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default ReviewSubmissions;
