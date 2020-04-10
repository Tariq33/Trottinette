package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Scooter;

public interface IScooterRepository extends JpaRepository<Scooter, Long> {
}

