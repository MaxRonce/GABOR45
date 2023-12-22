// Supabase Components
import { supabase } from "../supabaseClient";

// Models
import { News } from "../models/News";

export const getGlobalNews = async (): Promise<News[]> => {
	let { data, error } = await supabase
		.from("news")
		.select("*")
		.is("is_on_main_page", true)
		.order("date_creation", { ascending: false });
	if (error) {
		console.error("Error fetching news", error);
		return [];
	}
	return data as News[];
};
