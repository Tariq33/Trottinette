package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonView;

import web.Views;

@Entity
@DiscriminatorValue("supplier")
public class Fournisseur extends Utilisateur {
	@Column(name = "siret_number")
	@JsonView(Views.ViewFournisseur.class)
	private String numeroSiret;
	@Column(name = "tva_number")
	@JsonView(Views.ViewFournisseur.class)
	private String numeroTva;
	@Column(name = "iban")
	@JsonView(Views.ViewFournisseur.class)
	private String iban;
	@Column(name = "bic")
	@JsonView(Views.ViewFournisseur.class)
	private String bic;
	@Embedded
	@JsonView(Views.ViewFournisseur.class)
	private Adresse adresse;
	@OneToMany(mappedBy = "fournisseur")
//	@JsonView(Views.ViewFournisseurDetail.class)
	private List<PaiementFournisseur> paiements = new ArrayList<PaiementFournisseur>();
	@OneToMany(mappedBy = "fournisseur")
//	@JsonView(Views.ViewFournisseurDetail.class)
	private List<MoyenDeTransport> moyensDeTransport = new ArrayList<MoyenDeTransport>();

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

	public void addPaiementFournisseur(PaiementFournisseur paiement) {
		this.paiements.add(paiement);
	}

	public List<MoyenDeTransport> getMoyensDeTransport() {
		return moyensDeTransport;
	}

	public void setMoyensDeTransport(List<MoyenDeTransport> moyensDeTransport) {
		this.moyensDeTransport = moyensDeTransport;
	}

	public void addMoyenDeTransport(MoyenDeTransport moyenDeTransport) {
		this.moyensDeTransport.add(moyenDeTransport);
	}

}
