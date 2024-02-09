import { supabase } from '../supabaseClient';
import { PointsVente } from '../models/PointsVente';

export const getPointsVent = async (farmerId: string) => {
    let { data, error } = await supabase
        .from('point_de_vente')
        .select('*')
        .eq('appartient_a', farmerId)
        .order('nom', { ascending: true });
    if (error) {
        console.error('Error fetching points vent horaire', error);
        return [];
    }
    return data as PointsVente[];
};

export const createPointsVente = async (pointVente:any) => {
    let { data, error } = await supabase
        .from('point_de_vente')
        .insert([pointVente]);
    if (error) {
        console.error('Error creating point vente', error);
        return false;
    }
    return true;
};

export const deletePointsVente = async (pointVenteId: string) => {
    let { data, error } = await supabase
        .from('point_de_vente')
        .delete()
        .eq('id_point_de_vente', pointVenteId);
    if (error) {
        console.error('Error deleting point vente', error);
        return false;
    }
    return true;
};

export const updatePointVente = async (pointVente:any) => {
    let { data, error } = await supabase
        .from('point_de_vente')
        .update(pointVente)
        .eq('id_point_de_vente', pointVente.id_point_de_vente);
    if (error) {
        console.error('Error updating point vente', error);
        return false;
    }
    return true;
}

export const getHoraires = async (pointVenteId: string) => {
    let { data, error } = await supabase
        .from('horaires')
        .select('*')
        .eq('id_point_de_vente', pointVenteId)
        .order('jour', { ascending: true });
    if (error) {
        console.error('Error fetching horaires', error);
        return [];
    }
    return data;
}

export const deleteHoraire = async (horaireId: string) => {
    let { data, error } = await supabase
        .from('horaires')
        .delete()
        .eq('id_horaires', horaireId);
    if (error) {
        console.error('Error deleting horaire', error);
        return false;
    }
    return true;
}

export const createHoraire = async (horaire:any) => {
    let { data, error } = await supabase
        .from('horaires')
        .insert([horaire]);
    if (error) {
        console.error('Error creating horaire', error);
        return false;
    }
    return true;
}

export const updateHoraire = async (horaire:any) => {
    console.log(horaire);
    let { data, error } = await supabase
        .from('horaires')
        .update(horaire)
        .eq('id_horaires', horaire.id_horaires);
    if (error) {
        console.error('Error updating horaire', error);
        return false;
    }
    return true;
}