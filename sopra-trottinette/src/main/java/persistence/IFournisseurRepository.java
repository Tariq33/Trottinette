package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Fournisseur;

public interface IFournisseurRepository extends JpaRepository<Fournisseur, Long> {
	

}
