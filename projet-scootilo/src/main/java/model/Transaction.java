package model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;


@Entity
@Table(name = "deal")
public class Transaction {
	@Id
	@GeneratedValue
	private Long id;
	@Version
	private int version;
	@Column(name = "amount", length = 10, nullable = false)
	private Float montant;
	@Temporal(TemporalType.DATE)
	@Column(name = "date", nullable = false)
	private Date date;
	@Column(name = "deal_number", length = 25, nullable = false)
	private String numeroDeTransaction;
	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Client client;


	public Transaction() {
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


	public Float getMontant() {
		return montant;
	}


	public void setMontant(Float montant) {
		this.montant = montant;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	public String getNumeroDeTransaction() {
		return numeroDeTransaction;
	}


	public void setNumeroDeTransaction(String numeroDeTransaction) {
		this.numeroDeTransaction = numeroDeTransaction;
	}


	public Client getClient() {
		return client;
	}


	public void setClient(Client client) {
		this.client = client;
	}
	
	


}
