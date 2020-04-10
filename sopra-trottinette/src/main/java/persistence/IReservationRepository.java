package persistence;

import model.Reservation;

public interface IReservationRepository extends JpaRepository<Reservation, Long> {
	

}
