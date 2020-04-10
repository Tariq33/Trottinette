package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Itineraire;
import sopra.formation.model.Filiere;

public interface IItineraireRepository extends JpaRepository<Itineraire, Long> {
}

