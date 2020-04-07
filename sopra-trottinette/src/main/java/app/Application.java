package app;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import persistence.IAdministrateurDao;
import persistence.IClientDao;
import persistence.IFinDeTrajetDao;
import persistence.IFournisseurDao;
import persistence.IItineraireDao;
import persistence.IPaiementFournisseurDao;
import persistence.IReservationDao;
import persistence.IScooterDao;
import persistence.ITransactionDao;
import persistence.ITrottinetteDao;
import persistence.IVeloDao;
import persistence.jpa.AdministrateurDaoJpa;
import persistence.jpa.ClientDaoJpa;
import persistence.jpa.FinDeTrajetDaoJpa;
import persistence.jpa.FournisseurDaoJpa;
import persistence.jpa.ItineraireDaoJpa;
import persistence.jpa.PaiementFournisseurDaoJpa;
import persistence.jpa.ReservationDaoJpa;
import persistence.jpa.ScooterDaoJpa;
import persistence.jpa.TransactionDaoJpa;
import persistence.jpa.TrottinetteDaoJpa;
import persistence.jpa.VeloDaoJpa;

public class Application {
	private static Application instance = null;

	private final EntityManagerFactory emf = Persistence.createEntityManagerFactory("sopra-trottinette");

	private final IItineraireDao itineraireDao = new ItineraireDaoJpa();
	private final IPaiementFournisseurDao paiementFournisseurDao = new PaiementFournisseurDaoJpa();
	private final IScooterDao scooterDao = new ScooterDaoJpa();
	private final ITrottinetteDao trottinetteDao = new TrottinetteDaoJpa();
	private final IVeloDao veloDao = new VeloDaoJpa();
	private final IAdministrateurDao administrateurDao = new AdministrateurDaoJpa();
	private final ITransactionDao transactionDao = new TransactionDaoJpa();
	private final IClientDao clientDao = new ClientDaoJpa();
	private final IReservationDao reservationDao = new ReservationDaoJpa();
	private final IFinDeTrajetDao finDeTrajetDao = new FinDeTrajetDaoJpa();
	private final IFournisseurDao fournisseurDao = new FournisseurDaoJpa();

	private Application() {
	}

	public static Application getInstance() {
		if (instance == null) {
			instance = new Application();
		}

		return instance;
	}

	public EntityManagerFactory getEmf() {
		return emf;
	}

	public IItineraireDao getItineraireDao() {
		return itineraireDao;
	}

	public IPaiementFournisseurDao getPaiementFournisseurDao() {
		return paiementFournisseurDao;
	}

	public IScooterDao getScooterDao() {
		return scooterDao;
	}

	public ITrottinetteDao getTrottinetteDao() {
		return trottinetteDao;
	}

	public IVeloDao getVeloDao() {
		return veloDao;
	}

	public IAdministrateurDao getAdministrateurDao() {
		return administrateurDao;
	}

	public ITransactionDao getTransactionDao() {
		return transactionDao;
	}

	public IClientDao getClientDao() {
		return clientDao;
	}

	public IReservationDao getReservationDao() {
		return reservationDao;
	}

	public IFinDeTrajetDao getFinDeTrajetDao() {
		return finDeTrajetDao;
	}

	public IFournisseurDao getFournisseurDao() {
		return fournisseurDao;
	}
	
	
}
