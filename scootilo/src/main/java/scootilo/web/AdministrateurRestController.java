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

import scootilo.model.Administrateur;
import scootilo.model.Views;
import scootilo.persistence.IAdministrateurRepository;

@RestController
@RequestMapping("/administrateur")
@CrossOrigin("*")
public class AdministrateurRestController {

	@Autowired
	private IAdministrateurRepository administrateurRepo;

	@GetMapping("")
	@JsonView(Views.ViewAdministrateur.class)
	public List<Administrateur> findAll() {
		return administrateurRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewAdministrateur.class)
	public Administrateur find(@PathVariable Long id) {

		Optional<Administrateur> optAdministrateur = administrateurRepo.findById(id);

		if (optAdministrateur.isPresent()) {
			return optAdministrateur.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	
	@GetMapping("/moncompte/{identifiant}")
	@JsonView(Views.ViewAdministrateur.class)
	public Administrateur findByIdentifiant(@PathVariable String identifiant) {
		
		Administrateur administrateur = administrateurRepo.findByIdentifiant(identifiant);
		
		return administrateur;	
	}

	@PostMapping("")
	public Administrateur create(@RequestBody Administrateur administrateur) {
		administrateur = administrateurRepo.save(administrateur);

		return administrateur;
	}

	@PutMapping("/{id}")
	public Administrateur update(@RequestBody Administrateur administrateur, @PathVariable Long id) {
		if (!administrateurRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		administrateur = administrateurRepo.save(administrateur);

		return administrateur;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		administrateurRepo.deleteById(id);
	}
}
