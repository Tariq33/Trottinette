package scootilo.model;

import java.util.Date;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
@Table(name = "itinerary")
public class Itineraire {
	@Id
	@GeneratedValue
	@JsonView(Views.ViewItineraire.class)
	private Long id;
	@Version
	@JsonView(Views.ViewItineraire.class)
	private Integer version;
	@Embedded
	@AttributeOverrides({ @AttributeOverride(name = "rue", column = @Column(name = "departure_street")),
			@AttributeOverride(name = "complement", column = @Column(name = "departure_additional")),
			@AttributeOverride(name = "codePostal", column = @Column(name = "departure_zipcode")),
			@AttributeOverride(name = "ville", column = @Column(name = "departure_city")),
			@AttributeOverride(name = "latitude", column = @Column(name = "departure_latitude")),
			@AttributeOverride(name = "longitude", column = @Column(name = "departure_longitude")),

	})
	@JsonView(Views.ViewItineraire.class)
	private AdresseItineraire adrDepart;
	@Embedded
	@AttributeOverrides({ @AttributeOverride(name = "rue", column = @Column(name = "arrival_street")),
			@AttributeOverride(name = "complement", column = @Column(name = "arrival_additional")),
			@AttributeOverride(name = "codePostal", column = @Column(name = "arrival_zipcode")),
			@AttributeOverride(name = "ville", column = @Column(name = "arrival_city")),
			@AttributeOverride(name = "latitude", column = @Column(name = "arrival_latitude")),
			@AttributeOverride(name = "longitude", column = @Column(name = "arrival_longitude")), })
	@JsonView(Views.ViewItineraire.class)
	private AdresseItineraire adrArrivee;
	@Column(name = "startingHour", length = 100)
	@JsonView(Views.ViewItineraire.class)
	private Date heureDepart;
	@Column(name = "endingHour", length = 100)
	@JsonView(Views.ViewItineraire.class)
	private String heureArrivee;
	@Column(name = "hourLimit", length = 100)
	@JsonView(Views.ViewItineraire.class)
	private Date heureLimite;
	@Column(name = "estimatedDuration", length = 100)
	@JsonView(Views.ViewItineraire.class)
	private Float dureeEstimee;
	@Column(name = "duration", length = 100)
	@JsonView(Views.ViewItineraire.class)
	private Float duree;
	@Column(name = "amount", length = 100)
	@JsonView(Views.ViewItineraire.class)
	private Float montant;
	@Column(name = "deposit", length = 100)
	@JsonView(Views.ViewItineraire.class)
	private Float acompte;
	@OneToOne(mappedBy = "itineraire")
//	@JsonView(Views.ViewItineraireDetail.class)
	private PaiementFournisseur paiementFournisseur;
	@OneToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "transportMeans_id")
	@JsonView(Views.ViewItineraire.class)
	private MoyenDeTransport moyenDeTransport;
	@ManyToOne
	@JoinColumn(name = "reservation_id")
//	@JsonView(Views.ViewItineraireDetail.class)
	private Reservation reservation;

	public Itineraire() {
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

	public Date getHeureDepart() {
		return heureDepart;
	}

	public void setHeureDepart(Date heureDepart) {
		this.heureDepart = heureDepart;
	}

	public String getHeureArrivee() {
		return heureArrivee;
	}

	public void setHeureArrivee(String heureArrivee) {
		this.heureArrivee = heureArrivee;
	}

	public Date getHeureLimite() {
		return heureLimite;
	}

	public void setHeureLimite(Date heureLimite) {
		this.heureLimite = heureLimite;
	}

	public Float getDureeEstimee() {
		return dureeEstimee;
	}

	public void setDureeEstimee(Float dureeEstimee) {
		this.dureeEstimee = dureeEstimee;
	}

	public Float getDuree() {
		return duree;
	}

	public void setDuree(Float duree) {
		this.duree = duree;
	}

	public Float getMontant() {
		return montant;
	}

	public void setMontant(Float montant) {
		this.montant = montant;
	}

	public Float getAcompte() {
		return acompte;
	}

	public void setAcompte(Float acompte) {
		this.acompte = acompte;
	}

	public PaiementFournisseur getPaiementFournisseur() {
		return paiementFournisseur;
	}

	public void setPaiementFournisseur(PaiementFournisseur paiementFournisseur) {
		this.paiementFournisseur = paiementFournisseur;
	}

	public MoyenDeTransport getMoyenDeTransport() {
		return moyenDeTransport;
	}

	public void setMoyenDeTransport(MoyenDeTransport moyenDeTransport) {
		this.moyenDeTransport = moyenDeTransport;
	}

	public Reservation getReservation() {
		return reservation;
	}

	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}

}
