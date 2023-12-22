// Supabase Components
import { supabase } from '../supabaseClient';

// Models
import { News } from '../models/News';

export const getNewsByFarmer = async (farmerId: string): Promise<News[]> => {
	let { data, error } = await supabase.rpc('get_all_news_by_farmer', {
		id_farmer: farmerId,
	});
	console.log('datanews', data);
	if (error) {
		console.error('Error fetching news', error);
		return [];
	}

	return data as News[];
};

export const verifyUser = async (userId: string): Promise<boolean> => {
	const { data, error } = await supabase
		.from('agriculteur')
		.select('*')
		.eq('id_agriculteur', userId);
	if (data && data.length > 0) {
		return true;
	} else {
		return false;
	}
};

export const getNewsForUser = async (userId: string): Promise<News[]> => {
	const { data: followedFarmers, error: followError } = await supabase
		.from('follow')
		.select('id_agriculteur')
		.eq('id_utilisateur', userId);

	if (followError) {
		console.error('Error fetching followed farmers', followError);
		return [];
	}

	const { data: news, error: newsError } = await supabase
		.from('news')
		.select('*')
		.in(
			'id_agriculteur',
			followedFarmers.map(ff => ff.id_agriculteur),
		)
		.order('date_creation', { ascending: false });

	const { data: images, error: imagesError } = await supabase
		.from('utilisateur')
		.select('lien_image,id_utilisateur')
		.in(
			'id_utilisateur',
			followedFarmers.map(ff => ff.id_agriculteur),
		);

	//concatenate images to news
	if (newsError) {
		console.error('Error fetching news', newsError);
		return [];
	} else {
		news?.forEach(n => {
			images?.forEach(i => {
				if (n.id_agriculteur == i.id_utilisateur) {
					n.lien_image_user = i.lien_image;
				}
			});
		});
	}

	console.log(news);
	return news as News[];
};

export const saveNews = async (news: any) => {
	const { data, error } = await supabase.rpc('create_new_evenement', {
		p_nom_evenement: news.nom_evenement,
		p_description: news.description,
		p_date_creation: news.date_creation,
		p_id_agriculteur: news.id_agriculteur,
		p_image: news.image,
	});

	if (error) {
		console.error('Error saving news', error);
		return error;
	} else {
		console.log(data);
		return data;
	}
};
