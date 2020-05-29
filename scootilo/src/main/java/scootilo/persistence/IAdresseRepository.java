package scootilo.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import scootilo.model.Adresse;

public interface IAdresseRepository extends JpaRepository<Adresse, Long> {
	
	@Query("select adr from Adresse adr join adr.utilisateur user where adr.utilisateur.id = :id")
	List<Adresse> FindAddressByUserId(@Param("id") long id);
	
}
