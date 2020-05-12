package sopra.formation.web;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonView;

import sopra.formation.model.Filiere;
import sopra.formation.model.Stagiaire;
import sopra.formation.model.Views;
import sopra.formation.persistence.IFiliereRepository;
import sopra.formation.persistence.IStagiaireRepository;

@RestController
@RequestMapping("/filiere")
public class FiliereRestController {

	@Autowired
	private IFiliereRepository filiereRepo;
	
	@Autowired
	private IStagiaireRepository stagiaireRepo;

	@GetMapping("")
	@JsonView(Views.ViewFiliere.class)
	public List<Filiere> findAll() {
		return filiereRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewFiliereWithReferent.class)
	public Filiere find(@PathVariable Long id) {

		Optional<Filiere> optFiliere = filiereRepo.findWithReferent(id);

		if (optFiliere.isPresent()) {
			return optFiliere.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	
	@GetMapping("/{id}/stagiaires")
	@JsonView(Views.ViewFiliereWithReferent.class)
	public List<Stagiaire> findAllStagiaireByFiliere(@PathVariable Long id) {

		List<Stagiaire> stagiaires = stagiaireRepo.findAllByFiliere(id);

		return stagiaires;
	}
	
	@PostMapping("")
	public Filiere create(@RequestBody Filiere filiere) {
		filiere = filiereRepo.save(filiere);

		return filiere;
	}

	@PutMapping("/{id}")
	public Filiere update(@RequestBody Filiere filiere, @PathVariable Long id) {
		if (!filiereRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		filiere = filiereRepo.save(filiere);

		return filiere;
	}
	
	@DeleteMapping("/{id}")
	public void delete (@PathVariable Long id) {
		filiereRepo.deleteById(id);
	}
}
