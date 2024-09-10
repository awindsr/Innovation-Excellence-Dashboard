import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../utils/supabaseclient';
import { setUser, clearUser } from '../features/user/userSlice';

export const useSupabaseAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setUser(session.user));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setUser(session.user));
      } else {
        dispatch(clearUser());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);
};