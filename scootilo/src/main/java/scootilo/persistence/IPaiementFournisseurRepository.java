package scootilo.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import scootilo.model.PaiementFournisseur;

public interface IPaiementFournisseurRepository extends JpaRepository<PaiementFournisseur, Long> {
}

