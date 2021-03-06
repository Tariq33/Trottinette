package scootilo.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import scootilo.model.Reservation;

public interface IReservationRepository extends JpaRepository<Reservation, Long> {
	
	@Query("select r from Client c join c.reservations r where c.identifiant = :identifiant and r.expiree = TRUE")
	List<Reservation> FindReservationExpireeByIdentifiant(@Param("identifiant") String identifiant);
	
}
