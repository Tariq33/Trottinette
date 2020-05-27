package scootilo.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import scootilo.model.Client;
import scootilo.model.Reservation;

public interface IClientRepository extends JpaRepository<Client, Long> {

	// Voir son solde
	@Query("select u.solde from Utilisateur u where u.identifiant = :identifiant")
	Float findSoldeByIdentifiant(@Param("identifiant") String identifiant);

	@Query("select u.reservations from Utilisateur u where u.identifiant = :identifiant")
	List<Reservation> findAllReservation(@Param("identifiant") String identifiant);

	@Query("select u from Utilisateur u where u.identifiant = :identifiant")
	Client findByIdentifiant(@Param("identifiant") String identifiant);

	@Query("select preference from Utilisateur u where u.identifiant = :identifiant")
	Client FindPreferencesByIdentifiant(@Param("identifiant") String identifiant);

	@Query(value = "SELECT transport_means.type_of_transport, reservation.arrival_time, reservation.total_time, reservation.total_amount FROM itinerary JOIN reservation ON itinerary.reservation_id = reservation.id JOIN user_account ON reservation.client_id = user_account.id JOIN transport_means ON itinerary.transport_means_id = transport_means.id WHERE reservation.client_id = :id", nativeQuery = true)
	Client FindHistorique(@Param("id") Long id);

	
	
}

