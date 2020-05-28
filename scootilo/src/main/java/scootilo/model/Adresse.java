package scootilo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
@Table(name="address")
public class Adresse {
	@Id
	@GeneratedValue
	@JsonView(Views.ViewCommon.class)
	private Long id;
	@Version
	@JsonView(Views.ViewCommon.class)
	private int version;
	@Column(name = "address_name", length = 255)
	@JsonView(Views.ViewCommon.class)
	private String nomAdresse;
	@JsonView(Views.ViewCommon.class)
	@Column(name = "street", length = 255)
	private String rue;
	@JsonView(Views.ViewCommon.class)
	@Column(name = "additional", length = 255)
	private String complement;
	@JsonView(Views.ViewCommon.class)
	@Column(name = "zipcode", length = 10)
	private String codePostal;
	@JsonView(Views.ViewCommon.class)
	@Column(name = "city", length = 100)
	private String ville;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Utilisateur utilisateur;
	
	public Adresse() {
		super();
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

	public String getNomAdresse() {
		return nomAdresse;
	}

	public void setNomAdresse(String nomAdresse) {
		this.nomAdresse = nomAdresse;
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

	public Utilisateur getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}

}
