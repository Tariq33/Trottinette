package persistence.jpa;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;

import app.Application;
import model.Fournisseur;
import persistence.IFournisseurDao;

public class FournisseurDaoJpa implements IFournisseurDao{


		@Override
		public List<Fournisseur> findAll() {
			List<Fournisseur> fournisseurs = null;

			EntityManager em = null;
			EntityTransaction tx = null;

			try {
				em = Application.getInstance().getEmf().createEntityManager();
				tx = em.getTransaction();
				tx.begin();

				TypedQuery<Fournisseur> query = em.createQuery("from Fournisseur", Fournisseur.class);

				fournisseurs = query.getResultList();

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

			return fournisseurs;
		}

		@Override
		public Fournisseur find(Long id) {
			Fournisseur fournisseur = null;

			EntityManager em = null;
			EntityTransaction tx = null;

			try {
				em = Application.getInstance().getEmf().createEntityManager();
				tx = em.getTransaction();
				tx.begin();

				fournisseur = em.find(Fournisseur.class, id);

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

			return fournisseur;
		}

		@Override
		public Fournisseur save(Fournisseur obj) {
			Fournisseur fournisseur = null;

			EntityManager em = null;
			EntityTransaction tx = null;

			try {
				em = Application.getInstance().getEmf().createEntityManager();
				tx = em.getTransaction();
				tx.begin();

				fournisseur = em.merge(obj);

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

			return fournisseur;
		}

		@Override
		public void delete(Fournisseur obj) {
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
