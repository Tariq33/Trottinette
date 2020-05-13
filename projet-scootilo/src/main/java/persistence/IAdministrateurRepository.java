package persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.Administrateur;

public interface IAdministrateurRepository extends JpaRepository<Administrateur, Long> {
	
	@Query("select a from Administrateur a where a.identifiant = :identifiant")
	Administrateur findByIdentifiant(@Param("identifiant") String identifiant);
	
}
