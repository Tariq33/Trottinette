package scootilo.model;

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
	private Float longitude;
	@Column(name = "latitude", length = 100)
	private Float latitude;

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
}
