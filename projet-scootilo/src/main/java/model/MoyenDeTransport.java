package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Version;

@Entity
@Table(name = "transport_means")
public class MoyenDeTransport {
	@Id
	@GeneratedValue
	private Long id;
	@Version
	private Integer version;
	@Column(name = "longitude", length = 100)
	private Float longitude;
	@Column(name = "latitude", length = 100)
	private Float latitude;
	@Enumerated(EnumType.STRING)
	@Column(name = "type_of_transport")
	private TypeDeTransport typeDeTransport;
	@Column(name = "estimatedDistance", length = 255)
	private Float distanceEstimee;
	@Column(name = "engineType", length = 255)
	@Enumerated(EnumType.STRING)
	private TypeMoteur typeMoteur;
	@Column(name = "capacity", length = 255)
	private Float capacite;
	@ManyToOne
	@JoinColumn(name = "supplier_id")
	private Fournisseur fournisseur;
	@Column(name = "perMinuteCost", length = 100)
	private Float prixMinute;
	@Column(name = "serialNumber", length = 100)
	private String numeroDeSerie;
	@Column(name = "qrCode", length = 100)
	private String qrCode;
	@Column(name = "available", length = 100)
	private Boolean disponible;
	@Column(name = "inUse", length = 100)
	private Boolean enUtilisation;
	@OneToOne(mappedBy = "moyenDeTransport")
	private Itineraire itineraire;

	public MoyenDeTransport() {
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

	public Float getLongitude() {
		return longitude;
	}

	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}

	public Float getLatitude() {
		return latitude;
	}

	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	public TypeDeTransport getTypeDeTransport() {
		return typeDeTransport;
	}

	public void setTypeDeTransport(TypeDeTransport typeDeTransport) {
		this.typeDeTransport = typeDeTransport;
	}

	public Float getDistanceEstimee() {
		return distanceEstimee;
	}

	public void setDistanceEstimee(Float distanceEstimee) {
		this.distanceEstimee = distanceEstimee;
	}

	public TypeMoteur getTypeMoteur() {
		return typeMoteur;
	}

	public void setTypeMoteur(TypeMoteur typeMoteur) {
		this.typeMoteur = typeMoteur;
	}

	public Float getCapacite() {
		return capacite;
	}

	public void setCapacite(Float capacite) {
		this.capacite = capacite;
	}

	public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

	public Float getPrixMinute() {
		return prixMinute;
	}

	public void setPrixMinute(Float prixMinute) {
		this.prixMinute = prixMinute;
	}

	public String getNumeroDeSerie() {
		return numeroDeSerie;
	}

	public void setNumeroDeSerie(String numeroDeSerie) {
		this.numeroDeSerie = numeroDeSerie;
	}

	public String getQrCode() {
		return qrCode;
	}

	public void setQrCode(String qrCode) {
		this.qrCode = qrCode;
	}

	public Boolean getDisponible() {
		return disponible;
	}

	public void setDisponible(Boolean disponible) {
		this.disponible = disponible;
	}

	public Boolean getEnUtilisation() {
		return enUtilisation;
	}

	public void setEnUtilisation(Boolean enUtilisation) {
		this.enUtilisation = enUtilisation;
	}

	public Itineraire getItineraire() {
		return itineraire;
	}

	public void setItineraire(Itineraire itineraire) {
		this.itineraire = itineraire;
	}

	
}
