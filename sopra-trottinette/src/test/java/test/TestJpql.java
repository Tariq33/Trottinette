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

	}
}