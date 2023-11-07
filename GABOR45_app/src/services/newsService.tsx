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
