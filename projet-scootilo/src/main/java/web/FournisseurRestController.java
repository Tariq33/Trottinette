package web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import model.Fournisseur;
import model.Views;
import persistence.IFournisseurRepository;

@RestController
@RequestMapping("/fournisseur")
public class FournisseurRestController {

	@Autowired
	private IFournisseurRepository fournisseurRepo;

	@GetMapping("")
	@JsonView(Views.ViewFournisseur.class)
	public List<Fournisseur> findAll() {
		return fournisseurRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewFournisseur.class)
	public Fournisseur find(@PathVariable Long id) {

		Optional<Fournisseur> optFournisseur = fournisseurRepo.findById(id);

		if (optFournisseur.isPresent()) {
			return optFournisseur.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}

	@PostMapping("")
	public Fournisseur create(@RequestBody Fournisseur fournisseur) {
		fournisseur = fournisseurRepo.save(fournisseur);

		return fournisseur;
	}

	@PutMapping("/{id}")
	public Fournisseur update(@RequestBody Fournisseur fournisseur, @PathVariable Long id) {
		if (!fournisseurRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		fournisseur = fournisseurRepo.save(fournisseur);

		return fournisseur;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		fournisseurRepo.deleteById(id);
	}
}
