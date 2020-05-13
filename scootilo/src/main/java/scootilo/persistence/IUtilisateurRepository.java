package scootilo.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import scootilo.model.Utilisateur;

public interface IUtilisateurRepository extends JpaRepository<Utilisateur, Long> {
	
	//Vérification connexion
	@Query("select u from Utilisateur u where u.motDePasse= :motDePasse and u.identifiant= :identifiant")
	Utilisateur findByIdentifiantAndMotDePasse(@Param("identifiant") String identifiant, @Param("motDePasse") String motDePasse);
	
	//Mot de passe oublié ou Identifiant oublié => renvoie l'identifiant par mail 
	@Query("select u from Utilisateur u where u.email= :email")
	Utilisateur findUserByEmail(@Param("email") String email);
	
	@Query("select u from Utilisateur u where u.identifiant= :identifiant")
	Utilisateur findUserByIdentifiant(@Param("identifiant") String identifiant);
	
}
