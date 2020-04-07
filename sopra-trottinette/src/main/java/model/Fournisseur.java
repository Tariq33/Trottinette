package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
@DiscriminatorValue("supplier")
public class Fournisseur extends Utilisateur{
	@Column(name = "siret_number", nullable = false)
	private String numeroSiret;
	@Column(name = "tva_number", nullable = false)
	private String numeroTva;
	@Column(name = "iban", nullable = false)
	private String iban;
	@Column(name = "bic", nullable = false)
	private String bic;
	@Embedded
	private Adresse adresse;
	@OneToMany(mappedBy = "fournisseur")
	private List<PaiementFournisseur> paiements = new ArrayList<PaiementFournisseur>();

	public Fournisseur() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getNumeroSiret() {
		return numeroSiret;
	}

	public void setNumeroSiret(String numeroSiret) {
		this.numeroSiret = numeroSiret;
	}

	public String getNumeroTva() {
		return numeroTva;
	}

	public void setNumeroTva(String numeroTva) {
		this.numeroTva = numeroTva;
	}

	public String getIban() {
		return iban;
	}

	public void setIban(String iban) {
		this.iban = iban;
	}

	public String getBic() {
		return bic;
	}

	public void setBic(String bic) {
		this.bic = bic;
	}

	public Adresse getAdresse() {
		return adresse;
	}

	public void setAdresse(Adresse adresse) {
		this.adresse = adresse;
	}

	public List<PaiementFournisseur> getPaiements() {
		return paiements;
	}

	public void setPaiements(List<PaiementFournisseur> paiements) {
		this.paiements = paiements;
	}
	
	public void addPaiementFournissuer(PaiementFournisseur paiement) {
		this.paiements.add(paiement);
	}
	
	
	
	
	
	
}
