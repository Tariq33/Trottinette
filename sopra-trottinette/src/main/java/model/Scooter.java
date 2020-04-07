package model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
@DiscriminatorValue("Scooter")
public class Scooter extends MoyenDeTransport {

	@Column(name = "estimatedDistance", length = 255)
	private Float distanceEstimee;
	@Column(name = "engineType", length = 255)
	@Enumerated(EnumType.STRING)
	private TypeMoteur typeMoteur;
	@Column(name = "capacity", length = 255)
	private Float capacite;

	public Scooter() {
		super();
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

}
