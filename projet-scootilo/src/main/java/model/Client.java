package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
@DiscriminatorValue("customer")
public class Client extends Utilisateur {

	@Column(name = "balance", length = 10)
	@JsonView(Views.ViewClient.class)
	private Float solde;
	@Column(name = "first_name", length = 100)
	@JsonView(Views.ViewClient.class)
	private String prenom;
	@Embedded
	@Column(name = "address")
	@JsonView(Views.ViewClient.class)
	private Adresse adresse;
	@Embedded
	@JsonView(Views.ViewClient.class)
	private Preference preference;
	@OneToMany(mappedBy = "client")
//	@JsonView(Views.ViewClientDetail.class)
	private List<Reservation> reservations = new ArrayList<Reservation>();
	@OneToMany(mappedBy = "client")
//	@JsonView(Views.ViewClientDetail.class)
	private List<Transaction> transactions = new ArrayList<Transaction>();

	public Client() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Float getSolde() {
		return solde;
	}

	public void setSolde(Float solde) {
		this.solde = solde;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public Adresse getAdresse() {
		return adresse;
	}

	public void setAdresse(Adresse adresse) {
		this.adresse = adresse;
	}

	public Preference getPreference() {
		return preference;
	}

	public void setPreference(Preference preference) {
		this.preference = preference;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}

	public void addReservation(Reservation reservation) {
		this.reservations.add(reservation);
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}

	public void addTransaction(Transaction transaction) {
		this.transactions.add(transaction);
	}

}
