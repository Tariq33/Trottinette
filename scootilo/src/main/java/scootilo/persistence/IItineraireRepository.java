package scootilo.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import scootilo.model.Itineraire;
import scootilo.model.Reservation;

public interface IItineraireRepository extends JpaRepository<Itineraire, Long> {
	
	@Query("from Itineraire i where i.moyenDeTransport.fournisseur.nom = :nom")
	List<Itineraire> findItineraireByFournisseur(@Param("nom") String nom);
	
}

