package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.PaiementFournisseur;

public interface IPaiementFournisseurRepository extends JpaRepository<PaiementFournisseur, Long> {
}

