package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Velo;

public interface IVeloRepository extends JpaRepository<Velo, Long> {
}

