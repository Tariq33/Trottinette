package model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Version;

@Entity
@Table(name = "itinerary")
public class Itineraire {
	@Id
	@GeneratedValue
	private Long id;
	@Version
	private Integer version;
	@Column(name = "startingAddress", length = 100)
	private AdresseItineraire adrDepart;
	@Column(name = "endingAddress", length = 100)
	private AdresseItineraire adrArrivee;
	@Column(name = "startingHour", length = 100)
	private Date heureDepart;
	@Column(name = "endingHour", length = 100)
	private Date heureArrivee;
	@Column(name = "hourLimit", length = 100)
	private Date heureLimite;
	@Column(name = "estimatedDuration", length = 100)
	private Float dureeEstimee;
	@Column(name = "duration", length = 100)
	private Float Duree;
	@Column(name = "amount", length = 100)
	private Float montant;
	@Column(name = "deposit", length = 100)
	private Float acompte;
	@OneToOne(mappedBy = "itineraire")
	private PaiementFournisseur paiementFournisseur;
	@OneToOne
	private MoyenDeTransport moyenDeTransport;
	@ManyToOne
	@JoinColumn(name = "reservation_id")
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

	public Date getHeureArrivee() {
		return heureArrivee;
	}

	public void setHeureArrivee(Date heureArrivee) {
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
		return Duree;
	}

	public void setDuree(Float duree) {
		Duree = duree;
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
