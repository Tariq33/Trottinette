package app;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import persistence.IItineraireDao;
import persistence.IMoyenDeTransportDao;
import persistence.IPaiementFournisseurDao;
import persistence.IScooterDao;
import persistence.ITrottinetteDao;
import persistence.IVeloDao;
import persistence.jpa.ItineraireDaoJpa;
import persistence.jpa.MoyenDeTransportDaoJpa;
import persistence.jpa.PaiementFournisseurDaoJpa;
import persistence.jpa.ScooterDaoJpa;
import persistence.jpa.TrottinetteDaoJpa;
import persistence.jpa.VeloDaoJpa;

public class Application {
	private static Application instance = null;

	private final EntityManagerFactory emf = Persistence.createEntityManagerFactory("sopra-trottinette");

	private final IItineraireDao itineraireDao = new ItineraireDaoJpa();
	private final IMoyenDeTransportDao moyenDeTransport = new MoyenDeTransportDaoJpa();
	private final IPaiementFournisseurDao paiementFournisseurDao = new PaiementFournisseurDaoJpa();
	private final IScooterDao scooteurDao = new ScooterDaoJpa();
	private final ITrottinetteDao trottinetteDao = new TrottinetteDaoJpa();
	private final IVeloDao veloDao = new VeloDaoJpa();

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
}
