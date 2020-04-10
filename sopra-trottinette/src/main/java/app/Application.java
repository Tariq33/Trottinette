package app;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import persistence.IAdministrateurRepository;
import persistence.IClientRepository;
import persistence.IFinDeTrajetRepository;
import persistence.IFournisseurRepository;
import persistence.IItineraireRepository;
import persistence.IPaiementFournisseurRepository;
import persistence.IReservationRepository;
import persistence.IScooterRepository;
import persistence.ITransactionRepository;
import persistence.ITrottinetteRepository;
import persistence.IVeloRepository;
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

	private final IItineraireRepository itineraireDao = new ItineraireDaoJpa();
	private final IPaiementFournisseurRepository paiementFournisseurDao = new PaiementFournisseurDaoJpa();
	private final IScooterRepository scooterDao = new ScooterDaoJpa();
	private final ITrottinetteRepository trottinetteDao = new TrottinetteDaoJpa();
	private final IVeloRepository veloDao = new VeloDaoJpa();
	private final IAdministrateurRepository administrateurDao = new AdministrateurDaoJpa();
	private final ITransactionRepository transactionDao = new TransactionDaoJpa();
	private final IClientRepository clientDao = new ClientDaoJpa();
	private final IReservationRepository reservationDao = new ReservationDaoJpa();
	private final IFinDeTrajetRepository finDeTrajetDao = new FinDeTrajetDaoJpa();
	private final IFournisseurRepository fournisseurDao = new FournisseurDaoJpa();

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

	public IItineraireRepository getItineraireDao() {
		return itineraireDao;
	}

	public IPaiementFournisseurRepository getPaiementFournisseurDao() {
		return paiementFournisseurDao;
	}

	public IScooterRepository getScooterDao() {
		return scooterDao;
	}

	public ITrottinetteRepository getTrottinetteDao() {
		return trottinetteDao;
	}

	public IVeloRepository getVeloDao() {
		return veloDao;
	}

	public IAdministrateurRepository getAdministrateurDao() {
		return administrateurDao;
	}

	public ITransactionRepository getTransactionDao() {
		return transactionDao;
	}

	public IClientRepository getClientDao() {
		return clientDao;
	}

	public IReservationRepository getReservationDao() {
		return reservationDao;
	}

	public IFinDeTrajetRepository getFinDeTrajetDao() {
		return finDeTrajetDao;
	}

	public IFournisseurRepository getFournisseurDao() {
		return fournisseurDao;
	}
	
	
}
