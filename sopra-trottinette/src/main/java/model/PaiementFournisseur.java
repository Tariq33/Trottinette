package model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Version;

@Entity
@Table(name = "supplierPaiement")
public class PaiementFournisseur {
	@Id
	@GeneratedValue
	private Long id;
	@Version
	private Integer version;
	@Column(name = "amount", length = 100)
	private Float montant;
	@Column(name = "date", length = 100)
	private Date date;
	@Column(name = "transactionNumber", length = 100)
	private String numeroDeTransaction;

	@OneToOne
	private Itineraire itineraire;

	private Fournisseur fournisseur;

	public PaiementFournisseur() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public Float getMontant() {
		return montant;
	}

	public void setMontant(Float montant) {
		this.montant = montant;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getNumeroDeTransaction() {
		return numeroDeTransaction;
	}

	public void setNumeroDeTransaction(String numeroDeTransaction) {
		this.numeroDeTransaction = numeroDeTransaction;
	}

	public Itineraire getItineraire() {
		return itineraire;
	}

	public void setItineraire(Itineraire itineraire) {
		this.itineraire = itineraire;
	}

	public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

}
