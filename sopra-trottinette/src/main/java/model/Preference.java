package model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Preference {

	@Column(name = "bike")
	private Boolean velo;
	@Column(name = "moped")
	private Boolean scooter;
	@Column(name = "scooter")
	private Boolean trottinette;
	@Column(name = "fast")
	private Boolean rapide;
	@Column(name = "cheap")
	private Boolean moinsCher;
	@Column(name = "lessWalking")
	private Boolean moinsDeMarche;

	public Preference() {
		super();
	}

	public Boolean getVelo() {
		return velo;
	}

	public void setVelo(Boolean velo) {
		this.velo = velo;
	}

	public Boolean getScooter() {
		return scooter;
	}

	public void setScooter(Boolean scooter) {
		this.scooter = scooter;
	}

	public Boolean getTrottinette() {
		return trottinette;
	}

	public void setTrottinette(Boolean trottinette) {
		this.trottinette = trottinette;
	}

	public Boolean getRapide() {
		return rapide;
	}

	public void setRapide(Boolean rapide) {
		this.rapide = rapide;
	}

	public Boolean getMoinsCher() {
		return moinsCher;
	}

	public void setMoinsCher(Boolean moinsCher) {
		this.moinsCher = moinsCher;
	}

	public Boolean getMoinsDeMarche() {
		return moinsDeMarche;
	}

	public void setMoinsDeMarche(Boolean moinsDeMarche) {
		this.moinsDeMarche = moinsDeMarche;
	}

}
