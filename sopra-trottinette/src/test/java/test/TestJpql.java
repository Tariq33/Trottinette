package test;

import app.Application;
import persistence.IAdministrateurDao;
import persistence.IClientDao;
import persistence.IFinDeTrajetDao;
import persistence.IFournisseurDao;
import persistence.IReservationDao;
import persistence.ITransactionDao;

public class TestJpql {

	IAdministrateurDao administrateurDao = Application.getInstance().getVilleDao();
	IClientDao clientDao = Application.getInstance().getClientDao();
	IFinDeTrajetDao finDeTrajetDao = Application.getInstance().getFinDeTrajetDao();
	IFournisseurDao fournisseurDao = Application.getInstance().getFournisseurDao();
	IItineraireDao itineraireDao = Application.getInstance().getItineraireDao();
	IMoyenDeTransport moyenDeTransportDao = Application.getInstance().getMoyenDeTransportDao();
	IPaiementFournisseurDao paiementFournisseurDao = Application.getInstance().getPaiementFournisseurDao();
	IReservationDao reservationDao = Application.getInstance().getReservationDao();
	IScooterDao scooterDao = Application.getInstance().getScooterDao();
	ITransactionDao transactionDao = Application.getInstance().getTransactionDao();
	ITrottinetteDao trottinetteDao = Application.getInstance().getTrottinetteDao();
	IVeloDao veloDao = Application.getInstance().getVeloDao();
	
	
}
