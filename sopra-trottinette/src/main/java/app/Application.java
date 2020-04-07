package app;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Application {
	private static Application instance = null;

	private final EntityManagerFactory emf = Persistence.createEntityManagerFactory("sopra-trottinette");

//	private final IEvaluationDao evaluationDao = new EvaluationDaoJpa();
//	private final IFiliereDao filiereDao = new FiliereDaoJpa();
//	private final IFormateurDao formateurDao = new FormateurDaoJpa();
//	private final IMatiereDao matiereDao = new MatiereDaoJpa();
//	private final ISalleDao salleDao = new SalleDaoJpa();
//	private final IStagiaireDao stagiaireDao = new StagiaireDaoJpa();
//	private final IUEDao ueDao = new UEDaoJpa();

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
