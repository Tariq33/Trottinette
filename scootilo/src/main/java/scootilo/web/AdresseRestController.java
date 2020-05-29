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
import scootilo.model.Adresse;
import scootilo.model.Client;
import scootilo.model.Preference;
import scootilo.model.Views;
import scootilo.persistence.IAdresseRepository;

@RestController
@RequestMapping("/adresse")
@CrossOrigin("*")
public class AdresseRestController {

	@Autowired
	private IAdresseRepository adresseRepo;

	@GetMapping("")
	@JsonView(Views.ViewAdresse.class)
	public List<Adresse> findAll() {
		return adresseRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewAdresse.class)
	public Adresse find(@PathVariable Long id) {

		Optional<Adresse> optAdresse = adresseRepo.findById(id);

		if (optAdresse.isPresent()) {
			return optAdresse.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	
	@GetMapping("/findbyid/{id}")
	@JsonView(Views.ViewClient.class)
	public List<Adresse> FindAddressByUserId(@PathVariable Long id) {
		
		List<Adresse> adresses = adresseRepo.FindAddressByUserId(id);
		
		return adresses;	
	}

	@PostMapping("")
	public Adresse create(@RequestBody Adresse adresse) {
		adresse = adresseRepo.save(adresse);

		return adresse;
	}

	@PutMapping("/{id}")
	public Adresse update(@RequestBody Adresse adresse, @PathVariable Long id) {
		if (!adresseRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		adresse = adresseRepo.save(adresse);

		return adresse;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		adresseRepo.deleteById(id);
	}
}
