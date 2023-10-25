export interface UserWithFarmer {
    id: string;  // UUID
    nom: string | null;
    prenom: string | null;
    email: string;
    num_tel: string | null;
    lien_image_user: string | null;  // from the `utilisateurs` table

    // Properties from the `agriculteur` table:
    description: string | null;
    adresse: string | null;
    instagram: string | null;
    facebook: string | null;
    twitter: string | null;
    website: string | null;
    tel_fixe: string | null;
    tel_portable: string | null;
}
