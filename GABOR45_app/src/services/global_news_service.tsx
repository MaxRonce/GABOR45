import {supabase} from '../supabaseClient';
import { News } from '../models/News';

export const getGlobalNews = async (): Promise<News[]> => {
    let { data, error } = await supabase
        .from('news')
        .select('*')
        .is('id_agriculteur', null);

    if (error) {
        console.error('Error fetching news', error);
        return []; // Retournez un tableau vide en cas d'erreur
    }

    return data as News[]; // Assurez-vous que les données correspondent au type News[]
};