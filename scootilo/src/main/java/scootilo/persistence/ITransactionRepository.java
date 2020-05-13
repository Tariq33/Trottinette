package scootilo.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import scootilo.model.Transaction;

public interface ITransactionRepository extends JpaRepository<Transaction, Long> {
	
}
