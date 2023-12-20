// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				const currentUser = session?.user; // Obtenez l'utilisateur de la session
				setUser(currentUser || null);
			}
		);

		return () => {
			authListener?.subscription.unsubscribe();
		};
	}, []);

	return user;
};
