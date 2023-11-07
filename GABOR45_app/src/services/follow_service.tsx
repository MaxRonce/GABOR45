// followService.Tsx
import {supabase} from '../supabaseClient';

export const followFarmer = async (userId: string, farmerId: string) => {
    const { data, error } = await supabase
        .from('follow')
        .insert([
            { id_utilisateur: userId, id_agriculteur: farmerId }
        ]);

    if (error) throw new Error(error.message);
    return data;
};


// Fonction pour arrêter de suivre un agriculteur
export const unfollowFarmer = async (userId: string, farmerId: string) => {
    const { data, error } = await supabase
        .from('follow')
        .delete()
        .match({ id_utilisateur: userId, id_agriculteur: farmerId });

    if (error) {
        console.error('Erreur lors de l\'arrêt du suivi de l\'agriculteur:', error);
        throw error;
    }

    return data;
};