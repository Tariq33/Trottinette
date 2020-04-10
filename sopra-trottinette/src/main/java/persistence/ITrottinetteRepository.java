package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Trottinette;

public interface ITrottinetteRepository extends JpaRepository<Trottinette, Long> {
}

