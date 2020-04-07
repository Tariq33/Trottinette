package test;

import java.util.Date;

import javax.persistence.Column;

import app.Application;
import model.Administrateur;
import model.Client;
import model.FinDeTrajet;
import model.Fournisseur;
import model.Itineraire;
import model.PaiementFournisseur;
import model.Reservation;
import model.Scooter;
import model.Transaction;
import model.Trottinette;
import model.Velo;
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

public class TestJpql {

	public static void main(String[] args) {

		IAdministrateurDao administrateurDao = Application.getInstance().getAdministrateurDao();
		IClientDao clientDao = Application.getInstance().getClientDao();
		IFinDeTrajetDao finDeTrajetDao = Application.getInstance().getFinDeTrajetDao();
		IFournisseurDao fournisseurDao = Application.getInstance().getFournisseurDao();
		IItineraireDao itineraireDao = Application.getInstance().getItineraireDao();
		IPaiementFournisseurDao paiementFournisseurDao = Application.getInstance().getPaiementFournisseurDao();
		IReservationDao reservationDao = Application.getInstance().getReservationDao();
		IScooterDao scooterDao = Application.getInstance().getScooterDao();
		ITransactionDao transactionDao = Application.getInstance().getTransactionDao();
		ITrottinetteDao trottinetteDao = Application.getInstance().getTrottinetteDao();
		IVeloDao veloDao = Application.getInstance().getVeloDao();
		
		Scooter scoot = new Scooter();
		scoot.setDisponible(true);
		scoot.setLongitude("45.12.36");
		scoot.setLatitude("45.20.30");
		scoot.setPrixMinute(2F);
		
		scoot = scooterDao.save(scoot);
		
		Velo velo = new Velo();
		velo.setDisponible(true);
		velo.setLongitude("25.01.00");
		velo.setLatitude("98.24.35");
		velo.setPrixMinute(0.8F);
		
		velo = veloDao.save(velo);
		
		Trottinette trot = new Trottinette();
		
		trot.setDisponible(true);
		trot.setLongitude("28.30.33");
		trot.setLatitude("64.25.22");
		trot.setPrixMinute(1.5F);
		
		trot = trottinetteDao.save(trot);
		
		Fournisseur lime = new Fournisseur();
		lime.setNumeroSiret("1817881454187");
		lime.setNumeroTva("28951891979");
		lime.setBic("FR29478171");
		lime.setIban("189595195295298");
		lime.setNom("Lime");
		lime.setIdentifiant("Lime");
		lime.setMotDePasse("azerty");
		lime.setEmail("lime@gmail.com");
		
		lime = fournisseurDao.save(lime);
		
		Administrateur clement = new Administrateur();
		
		clement.setPrenom("Clément");
		clement.setNom("PREDAL");
		clement.setIdentifiant("clement_admin");
		clement.setMotDePasse("123456");
		clement.setEmail("clement@hotmail.com");
		
		clement = administrateurDao.save(clement);
		
		Client jeremy = new Client();
		jeremy.setNom("CHARTIER");
		jeremy.setIdentifiant("jeje");
		jeremy.setMotDePasse("dede");
		jeremy.setEmail("jeremy@hotmail.com");
		
		jeremy = clientDao.save(jeremy);
		
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
	}
}