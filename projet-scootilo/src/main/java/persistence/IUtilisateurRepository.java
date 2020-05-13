package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Utilisateur;

public interface IUtilisateurRepository extends JpaRepository<Utilisateur, Long> {
	
	//Vérification connexion
	Utilisateur findByIdentifiantAndMotDePasse(String identifiant, String motDePasse);
	
	//Mot de passe oublié => renvoie le mdp dans le mail
	Utilisateur findByIdentifiant(String identifiant);
	
	//identifiant oublié => renvoie l'identifiant par mail
	Utilisateur findByEmail(String email);
	
}
