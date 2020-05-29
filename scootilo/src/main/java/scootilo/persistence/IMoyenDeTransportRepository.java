package scootilo.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import scootilo.model.MoyenDeTransport;

public interface IMoyenDeTransportRepository extends JpaRepository<MoyenDeTransport, Long> {

	// Liste moyen de transport autour (zone carrée) de l'utilisateur (zone à déterminer)
	/*@Query("from MoyenDeTransport m where (m.longitude between :longitudeMin and :longitudeMax) and (m.latitude between :latitudeMin and :latitudeMax)")
	List<MoyenDeTransport> findAllMoyenDeTransportInArea(@Param("longitudeMin") Float longitudeMin, @Param("longitudeMax") Float longitudeMax, @Param("latitudeMin") Float latitudeMin, @Param("latitudeMax") Float latitudeMax);*/
	
	
	//@Query(value = "SELECT transport_means.type_of_transport, transport_means.supplier_id, transport_means.latitude, transport_means.longitude, transport_means.estimatedDistance, transport_means.perMinuteCost, transport_means.enUtilisation FROM transport_means WHERE (6371*RADIANS(ACOS(SIN(transport_means.latitude)*SIN(latitude)+COS(transport_means.latitude)*COS(latitude)*COS(longitude-transport_means.longitude)))) < 1", nativeQuery = true)
	@Query(value = "SELECT transport_means.type_of_transport, transport_means.supplier_id, transport_means.latitude, transport_means.longitude, transport_means.estimatedDistance, transport_means.perMinuteCost, transport_means.enUtilisation FROM transport_means WHERE transport_means.latitude > 1", nativeQuery = true)
	String[] FindAllTransportsInArea(@Param("latitude") Float latitude, @Param("longitude") Float longitude);
	
	List<MoyenDeTransport> findMoyenDeTransportById(Long id);
	
	
	@Query("select m from Fournisseur f join f.moyensDeTransport m where f.nom = :nom")
	List<MoyenDeTransport> findAllByFournisseur(@Param("nom") String nom);


//	//Liste des tarifs
//	@Query("select distinct m.typeDeTransport, u.nom, m.prixMinute from MoyenDeTransport m left join Utilisateur u")
//	List<Object> findRecapPrix();
	

}
