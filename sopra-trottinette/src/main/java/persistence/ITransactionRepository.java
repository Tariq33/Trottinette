package persistence;

import model.Transaction;

public interface ITransactionRepository extends JpaRepository<Transaction, Long> {
	
}
