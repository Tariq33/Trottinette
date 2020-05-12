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

import model.PaiementFournisseur;
import model.Views;
import persistence.IPaiementFournisseurRepository;

@RestController
@RequestMapping("/paiementfournisseur")
public class PaiementFournisseurRestController {
	
	@Autowired
	private IPaiementFournisseurRepository paiementfournisseurRepo;
	
	
	@GetMapping("")
	@JsonView(Views.ViewPaiementFournisseur.class)
	public List<PaiementFournisseur> findAll() {
		return paiementfournisseurRepo.findAll();
	}
	
	@GetMapping("/{id}")
	@JsonView(Views.ViewPaiementFournisseur.class)
	public PaiementFournisseur find(@PathVariable Long id) {

		Optional<PaiementFournisseur> optPaiementFournisseur = paiementfournisseurRepo.findById(id);

		if (optPaiementFournisseur.isPresent()) {
			return optPaiementFournisseur.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	
	
	@PostMapping("")
	public PaiementFournisseur create(@RequestBody PaiementFournisseur paiementfournisseur) {
		paiementfournisseur = paiementfournisseurRepo.save(paiementfournisseur);

		return paiementfournisseur;
	}

	@PutMapping("/{id}")
	public PaiementFournisseur update(@RequestBody PaiementFournisseur paiementfournisseur, @PathVariable Long id) {
		if (!paiementfournisseurRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		paiementfournisseur = paiementfournisseurRepo.save(paiementfournisseur);

		return paiementfournisseur;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		paiementfournisseurRepo.deleteById(id);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
