package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Itineraire;

public interface IItineraireRepository extends JpaRepository<Itineraire, Long> {
}

