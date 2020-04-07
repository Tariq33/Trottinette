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

public class Test1 {

	public static void main(String[] args) {

		IItineraireDao itineraireDao = Application.getInstance().getItineraireDao();
		IPaiementFournisseurDao paiementFournisseurDao = Application.getInstance().getPaiementFournisseurDao();
		IScooterDao scooterDao = Application.getInstance().getScooterDao();
		ITrottinetteDao trottinetteDao = Application.getInstance().getTrottinetteDao();
		IVeloDao veloDao = Application.getInstance().getVeloDao();
		IAdministrateurDao administrateurDao = Application.getInstance().getAdministrateurDao();
		ITransactionDao transactionDao = Application.getInstance().getTransactionDao();
		IClientDao clientDao = Application.getInstance().getClientDao();
		IReservationDao reservationDao = Application.getInstance().getReservationDao();
		IFinDeTrajetDao finDeTrajetDao = Application.getInstance().getFinDeTrajetDao();
		IFournisseurDao fournisseurDao = Application.getInstance().getFournisseurDao();

	}
}
