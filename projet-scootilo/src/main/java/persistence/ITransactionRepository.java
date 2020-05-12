package persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Transaction;

public interface ITransactionRepository extends JpaRepository<Transaction, Long> {
	
}
