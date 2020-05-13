package scootilo.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import scootilo.model.FinDeTrajet;

public interface IFinDeTrajetRepository extends JpaRepository<FinDeTrajet, Long> {
	
}
