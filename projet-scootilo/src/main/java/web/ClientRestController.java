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

import model.Client;
import model.Views;
import persistence.IClientRepository;

@RestController
@RequestMapping("/client")
public class ClientRestController {

	@Autowired
	private IClientRepository clientRepo;

	@GetMapping("")
	@JsonView(Views.ViewClient.class)
	public List<Client> findAll() {
		return clientRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewClient.class)
	public Client find(@PathVariable Long id) {

		Optional<Client> optClient = clientRepo.findById(id);

		if (optClient.isPresent()) {
			return optClient.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}

	@PostMapping("")
	public Client create(@RequestBody Client client) {
		client = clientRepo.save(client);

		return client;
	}

	@PutMapping("/{id}")
	public Client update(@RequestBody Client client, @PathVariable Long id) {
		if (!clientRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		client = clientRepo.save(client);

		return client;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		clientRepo.deleteById(id);
	}
}
