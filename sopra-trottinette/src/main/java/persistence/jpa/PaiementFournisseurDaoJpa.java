package persistence.jpa;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;

import app.Application;
import model.PaiementFournisseur;
import persistence.IPaiementFournisseurDao;

public class PaiementFournisseurDaoJpa implements IPaiementFournisseurDao{

	@Override
	public List<PaiementFournisseur> findAll() {
		List<PaiementFournisseur> paiementFournisseurs = null;

		EntityManager em = null;
		EntityTransaction tx = null;

		try {
			em = Application.getInstance().getEmf().createEntityManager();
			tx = em.getTransaction();
			tx.begin();

			TypedQuery<PaiementFournisseur> query = em.createQuery("from PaiementFournisseur", PaiementFournisseur.class);

			paiementFournisseurs = query.getResultList();

			tx.commit();
		} catch (Exception e) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			if (em != null) {
				em.close();
			}
		}

		return paiementFournisseurs;
	}

	@Override
	public PaiementFournisseur find(Long id) {
		PaiementFournisseur paiementFournisseur = null;

		EntityManager em = null;
		EntityTransaction tx = null;

		try {
			em = Application.getInstance().getEmf().createEntityManager();
			tx = em.getTransaction();
			tx.begin();

			paiementFournisseur = em.find(PaiementFournisseur.class, id);

			tx.commit();
		} catch (Exception e) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			if (em != null) {
				em.close();
			}
		}

		return paiementFournisseur;
	}

	@Override
	public PaiementFournisseur save(PaiementFournisseur obj) {
		PaiementFournisseur paiementFournisseur = null;

		EntityManager em = null;
		EntityTransaction tx = null;

		try {
			em = Application.getInstance().getEmf().createEntityManager();
			tx = em.getTransaction();
			tx.begin();

			paiementFournisseur = em.merge(obj);

			tx.commit();
		} catch (Exception e) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			if (em != null) {
				em.close();
			}
		}

		return paiementFournisseur;
	}

	@Override
	public void delete(PaiementFournisseur obj) {
		EntityManager em = null;
		EntityTransaction tx = null;

		try {
			em = Application.getInstance().getEmf().createEntityManager();
			tx = em.getTransaction();
			tx.begin();

			em.remove(em.merge(obj));

			tx.commit();
		} catch (Exception e) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}

}
