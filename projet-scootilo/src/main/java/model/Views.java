package model;

public class Views {
	public static class ViewCommon {}
	
	public static class ViewFinDeTrajet extends ViewCommon {}
	
	public static class ViewItineraire extends ViewCommon {}
	
	public static class ViewMoyenDeTransport extends ViewCommon {}
	
	public static class ViewPaiementFournisseur extends ViewCommon {}
	
	public static class ViewReservation extends ViewCommon {}
	
	public static class ViewTransaction extends ViewCommon {}
		
	public static class ViewUtilisateur extends ViewCommon {}
	
	public static class ViewFournisseur extends ViewUtilisateur {}
	
	public static class ViewAdministrateur extends ViewUtilisateur {}
	
	public static class ViewClient extends ViewUtilisateur {}
	
	public static class ViewMoyenDeTransportByFournisseur extends ViewMoyenDeTransport {}
}
