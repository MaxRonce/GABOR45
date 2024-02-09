import { calculateDistance } from '../services/distance';

describe('calculateDistance', () => {
    it('should correctly calculate the distance between two points', () => {
      // Coordonnées de Paris (48.8566° N, 2.3522° E) et New York (40.7128° N, 74.0060° W)
      const paris = { lat: 48.8566, lon: 2.3522 };
      const newYork = { lat: 40.7128, lon: -74.0060 };
  
      // Calcul de la distance attendue
      const expectedDistance = calculateDistance(paris.lat, paris.lon, newYork.lat, newYork.lon);
  
      // Utilisation d'un delta pour tenir compte des petites imprécisions dans les calculs flottants
      const delta = 0.1;
  
      // Vérification que la distance calculée est proche de la distance réelle
      // La distance réelle de Paris à New York est d'environ 5837 km
      expect(expectedDistance).toBeCloseTo(5837, delta);
    });
  });

