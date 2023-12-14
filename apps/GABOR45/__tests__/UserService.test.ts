// __tests__/UserService.test.ts

import { getUserWithFarmer } from '../src/services/farmerDetailService';
import { supabase } from '../src/supabaseClient';

jest.mock('../src/supabaseClient');

describe('UserService', () => {

    beforeEach(() => {
        (supabase.rpc as jest.Mock).mockClear();
    });

    it('should fetch user with farmer', async () => {
        const mockData = {
            "id": "e6ddfc6d-2c33-44a7-b37b-58754da4458a",
            "nom": "Durand",
            "prenom": "Jean",
            "email": "jean.durand@email.com",
            "num_tel": "12345678",
            "lien_image_user": "agri1.png",
            "description": "Description de Jean Durand",
            "adresse": "Adresse de Jean Durand",
            "instagram": null,
            "facebook": null,
            "twitter": null,
            "website": null,
            "tel_fixe": null,
            "tel_portable": null,
            "lien_image_agri": "agri1.png"
        };

        (supabase.rpc as jest.Mock).mockResolvedValueOnce({ data: mockData, error: null });

        const result = await getUserWithFarmer('e6ddfc6d-2c33-44a7-b37b-58754da4458a');

        expect(result).toEqual(mockData);
        expect(supabase.rpc).toHaveBeenCalledWith('get_user_with_farmer', { p_id: 'e6ddfc6d-2c33-44a7-b37b-58754da4458a' });
    });
});
