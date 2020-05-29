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

import scootilo.model.Itineraire;
import scootilo.model.MoyenDeTransport;
import scootilo.model.Views;
import scootilo.persistence.IItineraireRepository;

@RestController
@RequestMapping("/itineraire")
@CrossOrigin("*")
public class ItineraireRestController {

	@Autowired
	private IItineraireRepository itineraireRepo;

	@GetMapping("")
	@JsonView(Views.ViewItineraire.class)
	public List<Itineraire> findAll() {
		return itineraireRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewItineraire.class)
	public Itineraire find(@PathVariable Long id) {

		Optional<Itineraire> optItineraire = itineraireRepo.findById(id);

		if (optItineraire.isPresent()) {
			return optItineraire.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	
	
	@GetMapping("/by-fournisseur/{nom}")
	@JsonView(Views.ViewItineraire.class)
	public List<Itineraire> FindItineraireByFournisseur(@PathVariable String nom) {
	
		return itineraireRepo.findItineraireByFournisseur(nom);
	}
	

	@PostMapping("")
	@JsonView(Views.ViewItineraire.class)
	public Itineraire create(@RequestBody Itineraire itineraire) {
		itineraire = itineraireRepo.save(itineraire);

		return itineraire;
	}

	@PutMapping("/{id}")
	@JsonView(Views.ViewItineraire.class)
	public Itineraire update(@RequestBody Itineraire itineraire, @PathVariable Long id) {
		if (!itineraireRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		itineraire = itineraireRepo.save(itineraire);

		return itineraire;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		itineraireRepo.deleteById(id);
	}
}
