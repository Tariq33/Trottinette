package persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.MoyenDeTransport;

public interface IMoyenDeTransportRepository extends JpaRepository<MoyenDeTransport, Long> {

	// Liste moyen de transport autour (zone carrée) de l'utilisateur (zone à déterminer)

	@Query("from MoyenDeTransport m where (m.longitude between :longitudeMin and :longitudeMax) and (m.latitude between :latitudeMin and :latitudeMax)")
	List<MoyenDeTransport> findAllMoyenDeTransportInArea(@Param("longitudeMin") Float longitudeMin, @Param("longitudeMax") Float longitudeMax, @Param("latitudeMin") Float latitudeMin, @Param("latitudeMax") Float latitudeMax);

	List<MoyenDeTransport> findMoyenDeTransportById(Long id);
	
	
	@Query("select m from Fournisseur f join f.moyensDeTransport m where f.nom = :nom")
	List<MoyenDeTransport> findAllByFournisseur(@Param("nom") String nom);

//	//Liste des tarifs
//	@Query("select distinct m.typeDeTransport, u.nom, m.prixMinute from MoyenDeTransport m left join Utilisateur u")
//	List<Object> findRecapPrix();
	
	//@Query("Select m from MoyenDeTransport m left join Utilisateur u where u.nom = :nom")
	//@Query("Select f.moyensDeTransport from Fournisseur f join MoyenDeTransport m where f.nom =:nom")
	//@Query("select m from Fournisseur f join f.moyensDeTransport m where f.nom = :nom")
//	@Query("select m from Fournisseur f join f.moyensDeTransport m where f.nom = :nom")
//	List<MoyenDeTransport> findAllByFournisseur(@Param("nom") String nom);
}
