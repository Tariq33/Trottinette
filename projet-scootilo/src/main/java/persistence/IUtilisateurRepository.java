package persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.Reservation;
import model.Utilisateur;

public interface IUtilisateurRepository extends JpaRepository<Utilisateur, Long> {
	
	//Vérification connexion
	Utilisateur findByIdentifiantAndMotDePasse(String identifiant, String motDePasse);
	
	//Mot de passe oublié => renvoie le mdp dans le mail
	Utilisateur findByIdentifiant(String identifiant);
	
	//identifiant oublié => renvoie l'identifiant par mail
	Utilisateur findByEmail(String email);
	
	//Voir son solde
	@Query("select u.solde from Utilisateur u where u.identifiant = :identifiant")
	Float findSoldeByIdentifiant(@Param("identifiant")String identifiant);
	
	@Query("select u.reservations from Utilisateur u where u.identifiant = :identifiant")
	List<Reservation> findAllReservation(@Param("identifiant")String identifiant);
}
