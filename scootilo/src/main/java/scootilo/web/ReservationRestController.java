package scootilo.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonView;

import scootilo.model.Reservation;
import scootilo.model.Views;
import scootilo.persistence.IReservationRepository;

@RestController
@RequestMapping("/reservation")
@CrossOrigin("*")
public class ReservationRestController {

	@Autowired
	private IReservationRepository reservationRepo;

	@GetMapping("")
	@JsonView(Views.ViewReservation.class)
	public List<Reservation> findAll() {
		return reservationRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewReservation.class)
	public Reservation find(@PathVariable Long id) {

		Optional<Reservation> optReservation = reservationRepo.findById(id);

		if (optReservation.isPresent()) {
			return optReservation.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	
	@GetMapping("/expById/{identifiant}")
	@JsonView(Views.ViewClientReservation.class)
	public List<Reservation> FindReservationExpireeByIdentifiant(@PathVariable String identifiant) {
		return reservationRepo.FindReservationExpireeByIdentifiant(identifiant);
	}

	@PostMapping("")
	@JsonView(Views.ViewReservation.class)
	public Reservation create(@RequestBody Reservation reservation) {
		reservation = reservationRepo.save(reservation);

		return reservation;
	}

	@PutMapping("/{id}")
	@JsonView(Views.ViewReservation.class)
	public Reservation update(@RequestBody Reservation reservation, @PathVariable Long id) {
		if (!reservationRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		reservation = reservationRepo.save(reservation);

		return reservation;
	}
	
	@DeleteMapping("/{id}")
	public void delete (@PathVariable Long id) {
		reservationRepo.deleteById(id);
	}
}
