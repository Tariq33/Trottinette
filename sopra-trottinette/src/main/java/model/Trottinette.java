package model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Trottinette")
public class Trottinette extends MoyenDeTransport {

	@Column(name = "estimatedDistance", length = 255)
	private Float distanceEstimee;
	@Column(name = "battery", length = 255)
	private Integer battery;

	public Trottinette() {
		super();
	}

	public Float getDistanceEstimee() {
		return distanceEstimee;
	}

	public void setDistanceEstimee(Float distanceEstimee) {
		this.distanceEstimee = distanceEstimee;
	}

	public Integer getBattery() {
		return battery;
	}

	public void setBattery(Integer battery) {
		this.battery = battery;
	}

}
