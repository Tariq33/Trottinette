package scootilo.model;

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
	@JsonView(Views.ViewCommon.class)
	private Float solde;
	@Column(name = "first_name", length = 100)
	@JsonView(Views.ViewCommon.class)
	private String prenom;
	@Column(name = "latitude")
	@JsonView(Views.ViewCommon.class)
	private Float latitude;
	@Column(name = "longitude")
	@JsonView(Views.ViewCommon.class)
	private Float longitude;
//	@Embedded
//	@Column(name = "address")
//	@JsonView(Views.ViewCommon.class)
//	private Adresse adresse;
	@Embedded
	@JsonView(Views.ViewCommon.class)
	private Preference preference;
	@OneToMany(mappedBy = "client")
//	@JsonView(Views.ViewClientReservation.class)
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

//	public Adresse getAdresse() {
//		return adresse;
//	}
//
//	public void setAdresse(Adresse adresse) {
//		this.adresse = adresse;
//	}

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
	
	public Float getLatitude() {
		return latitude;
	}

	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	public Float getLongitude() {
		return longitude;
	}

	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}

}
