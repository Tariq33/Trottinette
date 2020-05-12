package model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonView;

@JsonTypeInfo(
		  use = JsonTypeInfo.Id.NAME, 
		  include = JsonTypeInfo.As.PROPERTY, 
		  property = "type")
@JsonSubTypes({ 
		  @Type(value = Administrateur.class, name = "admin"), 
		  @Type(value = Client.class, name = "customer"),
		  @Type(value = Fournisseur.class, name = "supplier")
		})

@Entity
@Table(name = "user_account")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "typeOfUser", discriminatorType = DiscriminatorType.STRING, length = 25)
public abstract class Utilisateur {
	@Id
	@GeneratedValue
	@JsonView(Views.ViewCommon.class)
	private Long id;
	@Version
	@JsonView(Views.ViewCommon.class)
	private int version;
	@Column(name = "last_name", length = 50, nullable = false)
	@JsonView(Views.ViewCommon.class)
	private String nom;
	@Column(name = "login_name", length = 25, nullable = false)
	@JsonView(Views.ViewCommon.class)
	private String identifiant;
	@Column(name = "password", length = 25, nullable = false)
	@JsonView(Views.ViewCommon.class)
	private String motDePasse;
	@Column(name = "mail", length = 50, nullable = false)
	@JsonView(Views.ViewCommon.class)
	private String email;
	@Column(name = "account_validate")
	@JsonView(Views.ViewCommon.class)
	private Boolean compteValide;
	
	public Utilisateur() {
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

	public String getIdentifiant() {
		return identifiant;
	}

	public void setIdentifiant(String identifiant) {
		this.identifiant = identifiant;
	}

	public String getMotDePasse() {
		return motDePasse;
	}

	public void setMotDePasse(String motDePasse) {
		this.motDePasse = motDePasse;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getCompteValide() {
		return compteValide;
	}

	public void setCompteValide(Boolean compteValide) {
		this.compteValide = compteValide;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}
	
	
}
