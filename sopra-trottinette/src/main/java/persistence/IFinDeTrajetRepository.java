package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.FinDeTrajet;

public interface IFinDeTrajetRepository extends JpaRepository<FinDeTrajet, Long> {
	
}
