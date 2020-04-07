package model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("admin")
public class Administrateur extends Utilisateur{
	@Column(name = "first_name", length = 100)
	private String prenom;

	public Administrateur() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	
	
	
	

}
