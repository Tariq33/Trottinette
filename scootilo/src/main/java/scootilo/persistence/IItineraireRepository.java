package scootilo.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import scootilo.model.Itineraire;

public interface IItineraireRepository extends JpaRepository<Itineraire, Long> {
}

