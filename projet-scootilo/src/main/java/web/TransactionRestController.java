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

import model.Transaction;
import model.Views;
import persistence.ITransactionRepository;

@RestController
@RequestMapping("/transaction")
public class TransactionRestController {

	@Autowired
	private ITransactionRepository transactionRepo;

	@GetMapping("")
	@JsonView(Views.ViewTransaction.class)
	public List<Transaction> findAll() {
		return transactionRepo.findAll();
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewTransaction.class)
	public Transaction find(@PathVariable Long id) {

		Optional<Transaction> optTransaction = transactionRepo.findById(id);

		if (optTransaction.isPresent()) {
			return optTransaction.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}

	@PostMapping("")
	public Transaction create(@RequestBody Transaction transaction) {
		transaction = transactionRepo.save(transaction);

		return transaction;
	}

	@PutMapping("/{id}")
	public Transaction update(@RequestBody Transaction transaction, @PathVariable Long id) {
		if (!transactionRepo.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}

		transaction = transactionRepo.save(transaction);

		return transaction;
	}
	
	@DeleteMapping("/{id}")
	public void delete (@PathVariable Long id) {
		transactionRepo.deleteById(id);
	}
}
