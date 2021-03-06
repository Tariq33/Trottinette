package scootilo.web;

import java.util.ArrayList;
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

import scootilo.model.Client;
import scootilo.model.Preference;
import scootilo.model.Views;
import scootilo.persistence.IClientRepository;

@RestController
@RequestMapping("/client")
@CrossOrigin("*")
public class ClientRestController {

	@Autowired
	private IClientRepository clientRepo;

	@GetMapping("")
	@JsonView(Views.ViewClient.class)
	public List<Client> findAll() {
		return clientRepo.findAll();
	}
	
	@GetMapping("/moncompte/{identifiant}")
	@JsonView(Views.ViewClient.class)
	public Client findByIdentifiant(@PathVariable String identifiant) {
		
		Client client = clientRepo.findByIdentifiant(identifiant);
		
		return client;	
	}
	
	
	@GetMapping("/preference/{identifiant}")
	@JsonView(Views.ViewClient.class)
	public Preference findPreferenceByIdentifiant(@PathVariable String identifiant) {
		
		Client client = clientRepo.findByIdentifiant(identifiant);
		
		Preference preference = client.getPreference();
		
		return preference;	
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

//	@GetMapping("/historique/{id}")
//	@JsonView(Views.ViewClient.class)
//	public ArrayList<Object> FindHistorique(@PathVariable Long id) {
//		
//		ArrayList<Object> client = clientRepo.FindHistorique(id);
//		
//		return client;
//		
//	}
	
	@GetMapping("/historique/{id}")
	@JsonView(Views.ViewClient.class)
	public ArrayList<String[]> FindHistorique(@PathVariable Long id) {
		
//		String[] arrfStrFull = null;
		ArrayList<String[]> arrfStrFull = new ArrayList<String[]>();
		
		String[] client = clientRepo.FindHistorique(id);
		
		for (int j=0; j<client.length; j++) {
			String i = (String)client[j];
			
			String[] arrOfStr = i.split(",");
			
			arrfStrFull.add(arrOfStr);
						
			}
		
		return arrfStrFull;
		
	}
	
	@GetMapping("/mail")
	@JsonView(Views.ViewClient.class)
	public ArrayList<String[]> FindAllMail() {
		
//		String[] arrfStrFull = null;
		ArrayList<String[]> arrfStrFull = new ArrayList<String[]>();
		
		String[] client = clientRepo.FindAllMail();
		
		for (int j=0; j<client.length; j++) {
			String i = (String)client[j];
			
			String[] arrOfStr = i.split(",");
			
			arrfStrFull.add(arrOfStr);
						
			}
		
		return arrfStrFull;
		
	}

	
	@PostMapping("")
	@JsonView(Views.ViewClient.class)
	public Client create(@RequestBody Client client) {
		client = clientRepo.save(client);

		return client;
	}

	@PutMapping("/{id}")
	@JsonView(Views.ViewClient.class)
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
