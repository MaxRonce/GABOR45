// Supabase Components
import { supabase } from "../supabaseClient";

// Models
import { News } from "../models/News";

export const getNewsByFarmer = async (farmerId: string): Promise<News[]> => {
	console.log("farmerid", farmerId);
	let { data, error } = await supabase
		.from("news")
		.select("*")
		.eq("id_agriculteur", farmerId);
	console.log("datanews", data);
	if (error) {
		console.error("Error fetching news", error);
		return [];
	}
	return data as News[];
};

export const getNewsForUser = async (userId: string): Promise<News[]> => {
	const { data: followedFarmers, error: followError } = await supabase
		.from("follow")
		.select("id_agriculteur")
		.eq("id_utilisateur", userId);

	if (followError) {
		console.error("Error fetching followed farmers", followError);
		return [];
	}

	const { data: news, error: newsError } = await supabase
		.from("news")
		.select("*")
		.in(
			"id_agriculteur",
			followedFarmers.map((ff) => ff.id_agriculteur)
		);

	const { data: images, error: imagesError } = await supabase
		.from("utilisateur")
		.select("lien_image,id_utilisateur")
		.in(
			"id_utilisateur",
			followedFarmers.map((ff) => ff.id_agriculteur)
		);

	//concatenate images to news
	if (newsError) {
		console.error("Error fetching news", newsError);
		return [];
	} else {
		news?.forEach((n) => {
			images?.forEach((i) => {
				if (n.id_agriculteur == i.id_utilisateur) {
					n.lien_image_user = i.lien_image;
				}
			});
		});
	}

	console.log(news);
	return news as News[];
};
