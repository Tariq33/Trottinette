package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Administrateur;

public interface IAdministrateurRepository extends JpaRepository<Administrateur, Long> {
}
