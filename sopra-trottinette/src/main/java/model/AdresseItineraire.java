package model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class AdresseItineraire {
	
	@Column(name = "street", length = 255)
	private String rue;
	@Column(name = "additional", length = 255)
	private String complement;
	@Column(name = "zipcode", length = 10)
	private String codePostal;
	@Column(name = "city", length = 100)
	private String ville;
	@Column(name = "longitude", length = 100)
	private String longitude;
	@Column(name = "latitude", length = 100)
	private String latitude;

	public AdresseItineraire() {
		super();
	}

	public String getRue() {
		return rue;
	}

	public void setRue(String rue) {
		this.rue = rue;
	}

	public String getComplement() {
		return complement;
	}

	public void setComplement(String complement) {
		this.complement = complement;
	}

	public String getCodePostal() {
		return codePostal;
	}

	public void setCodePostal(String codePostal) {
		this.codePostal = codePostal;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
}
