package test;

import app.Application;
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

public class Test1 {

	public static void main(String[] args) {

		IItineraireRepository itineraireDao = Application.getInstance().getItineraireDao();
		IPaiementFournisseurRepository paiementFournisseurDao = Application.getInstance().getPaiementFournisseurDao();
		IScooterRepository scooterDao = Application.getInstance().getScooterDao();
		ITrottinetteRepository trottinetteDao = Application.getInstance().getTrottinetteDao();
		IVeloRepository veloDao = Application.getInstance().getVeloDao();
		IAdministrateurRepository administrateurDao = Application.getInstance().getAdministrateurDao();
		ITransactionRepository transactionDao = Application.getInstance().getTransactionDao();
		IClientRepository clientDao = Application.getInstance().getClientDao();
		IReservationRepository reservationDao = Application.getInstance().getReservationDao();
		IFinDeTrajetRepository finDeTrajetDao = Application.getInstance().getFinDeTrajetDao();
		IFournisseurRepository fournisseurDao = Application.getInstance().getFournisseurDao();

	}
}
