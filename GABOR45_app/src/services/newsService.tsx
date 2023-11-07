// newsService.ts
import { supabase } from '../supabaseClient';
import { News } from '../models/News';

export const getNewsByFarmer = async (farmerId: string): Promise<News[]> => {
    let { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id_agriculteur', farmerId);

    if (error) {
        console.error('Error fetching news', error);
        return []; // Retournez un tableau vide en cas d'erreur
    }

    return data as News[]; // Assurez-vous que les données correspondent au type News[]
};


export const getNewsForUser = async (userId: string): Promise<News[]> => {
    // D'abord, récupérez la liste des agriculteurs suivis par l'utilisateur
    const { data: followedFarmers, error: followError } = await supabase
        .from('follow')
        .select('id_agriculteur')
        .eq('id_utilisateur', userId);

    if (followError) {
        console.error('Error fetching followed farmers', followError);
        return [];
    }

    // Ensuite, récupérez les news pour les agriculteurs suivis
    const { data: news, error: newsError } = await supabase
        .from('news')
        .select('*')
        .in('id_agriculteur', followedFarmers.map(ff => ff.id_agriculteur));

    if (newsError) {
        console.error('Error fetching news', newsError);
        return [];
    }

    return news as News[];
};

