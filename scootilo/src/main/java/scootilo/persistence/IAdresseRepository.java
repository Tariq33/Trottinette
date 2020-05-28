package scootilo.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import scootilo.model.Adresse;

public interface IAdresseRepository extends JpaRepository<Adresse, Long> {
}
