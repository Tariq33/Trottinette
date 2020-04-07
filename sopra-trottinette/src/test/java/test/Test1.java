package test;

import app.Application;
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

public class Test1 {
	
	IItineraireDao itineraireDao = Application.getInstance().getItineraireDao();
	IPaiementFournisseurDao paiementFournisseurDao =  Application.getInstance().getPaiementFournisseurDao();
	IScooterDao scooteurDao =  Application.getInstance().getScooteurDao();
	ITrottinetteDao trottinetteDao =  Application.getInstance().getTrottinetteDao();
	IVeloDao veloDao =  Application.getInstance().getVeloDao();
	IAdministrateurDao administrateurDao =  Application.getInstance().getAdministrateurDao();
	ITransactionDao transactionDao =  Application.getInstance().getTransactionDao();
	IClientDao clientDao =  Application.getInstance().getClientDao();
	IReservationDao reservationDao =  Application.getInstance().getReservationDao();
	IFinDeTrajetDao finDeTrajetDao =  Application.getInstance().getFinDeTrajetDao();
	IFournisseurDao fournisseurDao =  Application.getInstance().getFournisseurDao();

}
