package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.FinDeTrajet;
import sopra.formation.model.Filiere;

public interface IFinDeTrajetRepository extends JpaRepository<FinDeTrajet, Long> {
	
}
