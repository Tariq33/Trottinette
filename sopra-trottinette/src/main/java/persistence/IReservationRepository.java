package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Reservation;

public interface IReservationRepository extends JpaRepository<Reservation, Long> {
	

}
