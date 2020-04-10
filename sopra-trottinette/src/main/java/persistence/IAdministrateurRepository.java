package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Administrateur;
import sopra.formation.model.Filiere;

public interface IAdministrateurRepository extends JpaRepository<Administrateur, Long> {
	

}
