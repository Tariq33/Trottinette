package persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.Fournisseur;

public interface IFournisseurRepository extends JpaRepository<Fournisseur, Long> {
	
	@Query("select f from Fournisseur f where f.identifiant = :identifiant")
	Fournisseur findByIdentifiant(@Param("identifiant") String identifiant);
	
}
