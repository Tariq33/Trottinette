package model;

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
@Table(name = "end_of_journey")
public class FinDeTrajet {

	@Id
	@GeneratedValue
	@JsonView(Views.ViewFinDeTrajet.class)
	private Long id;
	@Version
	@JsonView(Views.ViewFinDeTrajet.class)
	private int version;
	@Column(name = "picture", length = 255)
	@JsonView(Views.ViewFinDeTrajet.class)
	private String photo;
	@Column(name = "comment", length = 400)
	@JsonView(Views.ViewFinDeTrajet.class)
	private String commentaire;
	@ManyToOne
	@JoinColumn(name = "reservation_id")
//	@JsonView(Views.ViewFinDeTrajetDetail.class)
	private Reservation reservation;

	public FinDeTrajet() {
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

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Reservation getReservation() {
		return reservation;
	}

	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}

}
