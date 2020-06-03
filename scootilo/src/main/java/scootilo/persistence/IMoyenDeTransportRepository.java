package scootilo.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import scootilo.model.MoyenDeTransport;
import scootilo.model.TypeDeTransport;

public interface IMoyenDeTransportRepository extends JpaRepository<MoyenDeTransport, Long> {

	// Liste moyen de transport autour (zone carrée) de l'utilisateur (zone à déterminer)
	/*@Query("from MoyenDeTransport m where (m.longitude between :longitudeMin and :longitudeMax) and (m.latitude between :latitudeMin and :latitudeMax)")
	List<MoyenDeTransport> findAllMoyenDeTransportInArea(@Param("longitudeMin") Float longitudeMin, @Param("longitudeMax") Float longitudeMax, @Param("latitudeMin") Float latitudeMin, @Param("latitudeMax") Float latitudeMax);*/
	

	@Query(value = "SELECT transport_means.type_of_transport, transport_means.supplier_id, transport_means.latitude, transport_means.longitude, transport_means.estimated_distance, transport_means.per_minute_cost, transport_means.in_use FROM transport_means WHERE (6371*RADIANS(ACOS(SIN(transport_means.latitude)*SIN(:latitude)+COS(transport_means.latitude)*COS(:latitude)*COS(:longitude-transport_means.longitude)))) < 2", nativeQuery = true)
	String[] FindAllTransportsInArea(@Param("latitude") Float latitude, @Param("longitude") Float longitude);
	
	@Query("select t from MoyenDeTransport t where t.typeDeTransport = :typeDeTransport")
	List<MoyenDeTransport> FindAllTransportsByType(@Param("typeDeTransport") TypeDeTransport typeDeTransport);

	List<MoyenDeTransport> findMoyenDeTransportById(Long id);
	
	
	@Query("select m from Fournisseur f join f.moyensDeTransport m where f.nom = :nom")
	List<MoyenDeTransport> findAllByFournisseur(@Param("nom") String nom);


//	//Liste des tarifs
//	@Query("select distinct m.typeDeTransport, u.nom, m.prixMinute from MoyenDeTransport m left join Utilisateur u")
//	List<Object> findRecapPrix();
	
	@Query(value = "SELECT DISTINCT transport_means.type_of_transport, user_account.last_name, transport_means.per_minute_cost FROM transport_means JOIN user_account ON transport_means.supplier_id = user_account.id ORDER BY transport_means.type_of_transport asc", nativeQuery = true)
	String[] FindAllPerso();
	
	
}
