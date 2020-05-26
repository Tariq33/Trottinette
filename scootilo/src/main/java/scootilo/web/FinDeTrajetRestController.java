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

import scootilo.model.FinDeTrajet;
import scootilo.model.Views;
import scootilo.persistence.IFinDeTrajetRepository;

@RestController
@RequestMapping("/finDeTrajet")
@CrossOrigin("*")
public class FinDeTrajetRestController {

	@Autowired
	private IFinDeTrajetRepository finDeTrajetRepo;

	@GetMapping("")
	@JsonView(Views.ViewFinDeTrajet.class)
	public List<FinDeTrajet> findAll() {
		return finDeTrajetRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewFinDeTrajet.class)
	public FinDeTrajet find(@PathVariable Long id) {

		Optional<FinDeTrajet> optFinDeTrajet = finDeTrajetRepo.findById(id);

		if (optFinDeTrajet.isPresent()) {
			return optFinDeTrajet.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}

	@PostMapping("")
	public FinDeTrajet create(@RequestBody FinDeTrajet finDeTrajet) {
		finDeTrajet = finDeTrajetRepo.save(finDeTrajet);

		return finDeTrajet;
	}

	@PutMapping("/{id}")
	public FinDeTrajet update(@RequestBody FinDeTrajet finDeTrajet, @PathVariable Long id) {
		if (!finDeTrajetRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		finDeTrajet = finDeTrajetRepo.save(finDeTrajet);

		return finDeTrajet;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		finDeTrajetRepo.deleteById(id);
	}
}
