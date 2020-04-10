package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Client;

public interface IClientRepository extends JpaRepository<Client, Long> {
	

}
