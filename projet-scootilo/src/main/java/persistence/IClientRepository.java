package persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.Client;
import model.Preference;
import model.Reservation;

public interface IClientRepository extends JpaRepository<Client, Long> {
	
	//Voir son solde
	@Query("select u.solde from Utilisateur u where u.identifiant = :identifiant")
	Float findSoldeByIdentifiant(@Param("identifiant")String identifiant);
	
	@Query("select u.reservations from Utilisateur u where u.identifiant = :identifiant")
	List<Reservation> findAllReservation(@Param("identifiant")String identifiant);
	
	@Query("select u from Utilisateur u where u.identifiant = :identifiant")
	Client findByIdentifiant(@Param("identifiant") String identifiant);
}
