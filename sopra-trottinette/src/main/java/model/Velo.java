package model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Velo")
public class Velo extends MoyenDeTransport{

	public Velo() {
		super();
	}
	
}
