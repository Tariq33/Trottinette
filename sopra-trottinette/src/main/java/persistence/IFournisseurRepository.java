package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Fournisseur;
import sopra.formation.model.Filiere;

public interface IFournisseurRepository extends JpaRepository<Fournisseur, Long> {
	

}
