package model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

@Entity
@Table(name = "reservation")
public class Reservation {
	@Id
	@GeneratedValue
	private Long id;
	@Version
	private int version;
	@Temporal(TemporalType.DATE)
	@Column(name = "departure_time")
	private Date heureDepart;
	@Temporal(TemporalType.DATE)
	@Column(name = "arrival_time")
	private Date heureArrivee;
	@Temporal(TemporalType.DATE)
	@Column(name = "date")
	private Date date;
	@Column(name = "total_time", length = 15)
	private Float dureeTotale;
	@Column(name = "estimated_amount", length = 15)
	private Float montantEstime;
	@Column(name = "total_amount", length = 15)
	private Float montantTotal;
	@Column(name = "expired")
	private Boolean expiree;
	@Embedded
	@AttributeOverrides({
		@AttributeOverride(name="rue", column = @Column(name="departure_street")),
		@AttributeOverride(name="complement", column = @Column(name="departure_additional")),
		@AttributeOverride(name="codePostal", column = @Column(name="departure_zipcode")),
		@AttributeOverride(name="ville", column = @Column(name="departure_city")),
		@AttributeOverride(name="latitude", column = @Column(name="departure_latitude")),
		@AttributeOverride(name="longitude", column = @Column(name="departure_longitude")),
	})
	private AdresseItineraire adrDepart;
	@Embedded
	@AttributeOverrides({
		@AttributeOverride(name="rue", column = @Column(name="arrival_street")),
		@AttributeOverride(name="complement", column = @Column(name="arrival_additional")),
		@AttributeOverride(name="codePostal", column = @Column(name="arrival_zipcode")),
		@AttributeOverride(name="ville", column = @Column(name="arrival_city")),
		@AttributeOverride(name="latitude", column = @Column(name="arrival_latitude")),
		@AttributeOverride(name="longitude", column = @Column(name="arrival_longitude")),
	})
	private AdresseItineraire adrArrivee;
	@ManyToOne
	@JoinColumn(name = "client_id")
	private Client client;
	@OneToMany(mappedBy = "reservation")
	private List<FinDeTrajet> finsDeTrajet = new ArrayList<FinDeTrajet>();
	@OneToMany(mappedBy = "reservation")
	private List<Itineraire> itineraires = new ArrayList<Itineraire>();

	public Reservation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public Date getHeureDepart() {
		return heureDepart;
	}

	public void setHeureDepart(Date heureDepart) {
		this.heureDepart = heureDepart;
	}

	public Date getHeureArrivee() {
		return heureArrivee;
	}

	public void setHeureArrivee(Date heureArrivee) {
		this.heureArrivee = heureArrivee;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Float getDureeTotale() {
		return dureeTotale;
	}

	public void setDureeTotale(Float dureeTotale) {
		this.dureeTotale = dureeTotale;
	}

	public Float getMontantEstime() {
		return montantEstime;
	}

	public void setMontantEstime(Float montantEstime) {
		this.montantEstime = montantEstime;
	}

	public Float getMontantTotal() {
		return montantTotal;
	}

	public void setMontantTotal(Float montantTotal) {
		this.montantTotal = montantTotal;
	}

	public Boolean getExpiree() {
		return expiree;
	}

	public void setExpiree(Boolean expiree) {
		this.expiree = expiree;
	}

	public AdresseItineraire getAdrDepart() {
		return adrDepart;
	}

	public void setAdrDepart(AdresseItineraire adrDepart) {
		this.adrDepart = adrDepart;
	}

	public AdresseItineraire getAdrArrivee() {
		return adrArrivee;
	}

	public void setAdrArrivee(AdresseItineraire adrArrivee) {
		this.adrArrivee = adrArrivee;
	}

	public List<FinDeTrajet> getFinsDeTrajet() {
		return finsDeTrajet;
	}

	public void setFinsDeTrajet(List<FinDeTrajet> finsDeTrajet) {
		this.finsDeTrajet = finsDeTrajet;
	}

	public void addFinDeTrajet(FinDeTrajet finDeTrajet) {
		this.finsDeTrajet.add(finDeTrajet);
	}

	public List<Itineraire> getItineraires() {
		return itineraires;
	}

	public void setItineraires(List<Itineraire> itineraires) {
		this.itineraires = itineraires;
	}

	public void addItineraire(Itineraire itineraire) {
		this.itineraires.add(itineraire);
	}

}
