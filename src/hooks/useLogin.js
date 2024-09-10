import { useState } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../utils/supabaseclient";
import { setUser } from "../features/user/userSlice";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;

      // Fetch user details from the users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (userError) throw userError;

      // Combine auth data and user data
      const userDetails = {
        id: authData.user.id,
        email: authData.user.email,
        name: userData.name,
        department: userData.department,
        phone_number: userData.phone_number,
        birth_date: userData.birth_date,
        college_year: userData.college_year,
        role: userData.role || "student", // This is correct
      };

      console.log(userDetails.role)
      dispatch(setUser(userDetails));
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, userDetails) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      // Insert user details into the users table
      const { error: insertError } = await supabase.from("users").insert({
        id: data.user.id,
        email,
        ...userDetails,
        role: userDetails.role || "student", // Ensure role is included
      });

      if (insertError) throw insertError;

      dispatch(
        setUser({
          ...data.user,
          ...userDetails,
          role: userDetails.role || "student", // Ensure role is included in Redux state
        })
      );
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, signup, loading, error };
};
