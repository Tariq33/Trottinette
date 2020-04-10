package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Client;
import sopra.formation.model.Filiere;

public interface IClientRepository extends JpaRepository<Client, Long> {
	

}
