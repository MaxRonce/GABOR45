// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);  // Définissez l'état initial comme null ou User

    useEffect(() => {
        // Souscrivez aux modifications de session pour obtenir les mises à jour de l'utilisateur
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;  // Obtenez l'utilisateur de la session
                // @ts-ignore
                setUser(currentUser);
            }
        );

        // Annulez la souscription lorsque le composant est démonté
        return () => {
            authListener?.subscription.unsubscribe();
        };

    }, []);

    return user;
};
