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

export const deleteNews = async (newsId: string) => {
	const { error } = await supabase
	.from('news')
	.delete()
	.eq('id_evenement', newsId);

	if (error) {
		console.error('Error deleting news', error);
		return false;
	}else {
		return true;
	}
};
export const deleteNewsWithImage = async (newsId: string, image:string) => {
	console.log(image, newsId);
	const { data, error } = await supabase
		.storage
		.from('news')
		.remove(['images/' + image]);
	if (error) {
		console.error('Error deleting image', error);
		return false;
	}
	console.log(data);
	const { data: data2, error: error2 } = await supabase
		.from('news')
		.delete()
		.eq('id_evenement', newsId);
	if (error2) {
		console.error('Error deleting news', error2);
		return false;
	} else {
		console.log(data2);
		return true;
	}
	
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
		p_is_recette: news.is_recette,
		p_is_main: news.is_main,
	});

	if (error) {
		console.error('Error saving news', error);
		return error;
	} else {
		console.log(data);
		return data;
	}
};

export function calcul_temps(newsItem: News){
	const date_evenement = new Date(newsItem.date_creation);
	const date_actuelle = new Date();
	const diff = date_actuelle.getTime() - date_evenement.getTime();
	const diff_jours = diff / (1000 * 3600 * 24);
	const diff_heures = diff / (1000 * 3600);
	const diff_minutes = diff / (1000 * 60);
	const diff_secondes = diff / 1000;
	if (diff_secondes < 60) {
		return Math.round(diff_secondes) + ' secondes';
	} else if (diff_minutes < 60) {
		return Math.round(diff_minutes) + ' minutes';
	} else if (diff_heures < 24) {
		return Math.round(diff_heures) + ' heures';
	} else {
		return Math.round(diff_jours) + ' jours';
	}
};