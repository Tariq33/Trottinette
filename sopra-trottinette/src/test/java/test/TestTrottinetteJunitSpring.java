package test;



import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import model.Administrateur;
import model.Client;
import model.FinDeTrajet;
import model.Fournisseur;
import model.Itineraire;
import model.MoyenDeTransport;
import model.PaiementFournisseur;
import model.Reservation;
import model.Transaction;
import model.TypeDeTransport;
import model.Utilisateur;
import persistence.IFinDeTrajetRepository;
import persistence.IItineraireRepository;
import persistence.IMoyenDeTransportRepository;
import persistence.IPaiementFournisseurRepository;
import persistence.IReservationRepository;
import persistence.ITransactionRepository;
import persistence.IUtilisateurRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "/application-context.xml")
//@ContextConfiguration(classes = ApplicationConfig.class)
public class TestTrottinetteJunitSpring {

	
	@Autowired
	private IMoyenDeTransportRepository moyenDeTransportDao;
	@Autowired
	private IUtilisateurRepository utilisateurDao;
	@Autowired
	private ITransactionRepository transactionDao;
	@Autowired
	private IReservationRepository reservationDao;
	@Autowired
	private IFinDeTrajetRepository finDeTrajetDao;
	@Autowired
	private IPaiementFournisseurRepository paiementFournisseurDao;
	@Autowired
	private IItineraireRepository itineraireDao;

	@Test
	public void Scooter() {
		
		MoyenDeTransport scoot = new MoyenDeTransport();
		scoot.setTypeDeTransport(TypeDeTransport.scooter);
		scoot.setDisponible(true);
		scoot.setLongitude(1F);
		scoot.setLatitude(2F);
		scoot.setPrixMinute(2F);
		
		scoot = moyenDeTransportDao.save(scoot);
		
		MoyenDeTransport velo = new MoyenDeTransport();
		velo.setTypeDeTransport(TypeDeTransport.velo);
		velo.setDisponible(true);
		velo.setLongitude(3F);
		velo.setLatitude(4F);
		velo.setPrixMinute(0.8F);
		
		velo = moyenDeTransportDao.save(velo);
		
		MoyenDeTransport trot = new MoyenDeTransport();
		trot.setTypeDeTransport(TypeDeTransport.trottinette);
		trot.setDisponible(true);
		trot.setLongitude(10F);
		trot.setLatitude(50F);
		trot.setPrixMinute(1.5F);
		
		trot = moyenDeTransportDao.save(trot);
		
		Fournisseur lime = new Fournisseur();
		lime.setNumeroSiret("1817881454187");
		lime.setNumeroTva("28951891979");
		lime.setBic("FR29478171");
		lime.setIban("189595195295298");
		lime.setNom("Lime");
		lime.setIdentifiant("Lime");
		lime.setMotDePasse("azerty");
		lime.setEmail("lime@gmail.com");
		
		lime = utilisateurDao.save(lime);
		
		Administrateur clement = new Administrateur();
		
		clement.setPrenom("Clément");
		clement.setNom("PREDAL");
		clement.setIdentifiant("clement_admin");
		clement.setMotDePasse("123456");
		clement.setEmail("clement@hotmail.com");
		
		clement = utilisateurDao.save(clement);
		
		Client jeremy = new Client();
		jeremy.setNom("CHARTIER");
		jeremy.setIdentifiant("jeje");
		jeremy.setMotDePasse("dede");
		jeremy.setEmail("jeremy@hotmail.com");
		jeremy.setSolde(1000000F);
		
		jeremy = utilisateurDao.save(jeremy);
		
		Transaction montant30e	= new Transaction();
		montant30e.setMontant(30F);
		montant30e.setDate(new Date());
		montant30e.setNumeroDeTransaction("289298895");
		
		montant30e = transactionDao.save(montant30e);
		
		montant30e.setClient(jeremy);
		montant30e = transactionDao.save(montant30e);
		
		
		
		Reservation resa = new Reservation();
		resa.setDate(new Date());
		resa.setMontantTotal(10F);
		resa.setDureeTotale(11F);
		
		resa = reservationDao.save(resa);
		resa.setClient(jeremy);	
		
		resa = reservationDao.save(resa);
		
		FinDeTrajet trajet1 = new FinDeTrajet();
		trajet1.setCommentaire("test123");
		trajet1.setPhoto("lien vers photo");
		
		trajet1 = finDeTrajetDao.save(trajet1);
		trajet1.setReservation(resa);
		trajet1 = finDeTrajetDao.save(trajet1);
		
		
		PaiementFournisseur paiement123 = new PaiementFournisseur();
		paiement123.setMontant(5.23F);
		paiement123.setNumeroDeTransaction("2892985982");
		
		paiement123 = paiementFournisseurDao.save(paiement123);
		
		Itineraire itineraire1 = new Itineraire();
		itineraire1.setAcompte(1F);
		itineraire1.setDuree(2.5F);
		
		itineraire1 = itineraireDao.save(itineraire1);
		
		itineraire1.setMoyenDeTransport(trot);
		
		itineraire1 = itineraireDao.save(itineraire1);
		
		Utilisateur clementVerif = utilisateurDao.findByIdentifiantAndMotDePasse("clement_admin", "123456");
		
		if (clementVerif != null) {
			System.out.println("ça marche");
		}
		else {
			System.out.println("ç");
		}
		
		Float solde = utilisateurDao.findSoldeByIdentifiant("jeje");
		
		System.out.println(solde);
		
		List<Reservation> reservations = utilisateurDao.findAllReservation("jeje");
		
		System.out.println(reservations.get(0).getMontantTotal());
		
		List<MoyenDeTransport> listes = moyenDeTransportDao.findAllMoyenDeTransportInArea(0F, 5F, 0F, 5F);
		
		for (MoyenDeTransport moyen : listes) {
			System.out.println(moyen.getClass().getSimpleName());
		}
		
		velo.setFournisseur(lime);
		velo = moyenDeTransportDao.save(velo);
		//lime.addMoyenDeTransport(velo);
		//lime = utilisateurDao.save(lime);
		
//		List<Object> moyensDeTransport = moyenDeTransportDao.findRecapPrix();
//		
//		System.out.println(moyensDeTransport.get(0));
		
		
		utilisateurDao.delete(clement);

		
	}


}
