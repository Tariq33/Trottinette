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

import model.MoyenDeTransport;
import model.Views;
import persistence.IMoyenDeTransportRepository;

@RestController
@RequestMapping("/moyendetransport")
public class MoyenDeTransportRestController {

	@Autowired
	private IMoyenDeTransportRepository moyendetransportRepo;

	@GetMapping("")
	@JsonView(Views.ViewMoyenDeTransport.class)
	public List<MoyenDeTransport> findAll() {
		return moyendetransportRepo.findAll();
	}
	
	@GetMapping("/{id}")
	@JsonView(Views.ViewMoyenDeTransport.class)
	public MoyenDeTransport find(@PathVariable Long id) {

		Optional<MoyenDeTransport> optMoyenDeTransport = moyendetransportRepo.findById(id);

		if (optMoyenDeTransport.isPresent()) {
			return optMoyenDeTransport.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	
	
	@PostMapping("")
	public MoyenDeTransport create(@RequestBody MoyenDeTransport moyendetransport) {
		moyendetransport = moyendetransportRepo.save(moyendetransport);

		return moyendetransport;
	}

	@PutMapping("/{id}")
	public MoyenDeTransport update(@RequestBody MoyenDeTransport moyendetransport, @PathVariable Long id) {
		if (!moyendetransportRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		moyendetransport = moyendetransportRepo.save(moyendetransport);

		return moyendetransport;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		moyendetransportRepo.deleteById(id);
	}
	
	
	@GetMapping("/by-moyendetransport/{id}")
	@JsonView(Views.ViewMoyenDeTransport.class)
	public MoyenDeTransport findMoyenDeTransportById(@PathVariable Long id) {

		Optional<MoyenDeTransport> optMoyenDeTransport = moyendetransportRepo.findById(id);

		if (optMoyenDeTransport.isPresent()) {
			return optMoyenDeTransport.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
}
