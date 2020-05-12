package sopra.formation.web;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import sopra.formation.model.Evaluation;
import sopra.formation.persistence.IEvaluationRepository;

@Controller
public class EvaluationController {

	@Autowired
	private IEvaluationRepository evaluationRepo;

	@GetMapping("/evaluationOld")
	@ResponseBody
	public List<Evaluation> findAll() {

		List<Evaluation> evaluations = evaluationRepo.findAll();

		return evaluations;
	}
	
	@GetMapping("/evaluationOld/{id}")
	public ResponseEntity<Evaluation> find(@PathVariable Long id) {

		Optional<Evaluation> optEvaluation = evaluationRepo.findById(id);

		if(optEvaluation.isPresent()) {
			return new ResponseEntity<Evaluation>(optEvaluation.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Evaluation>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/evaluationOld")
	public ResponseEntity<Evaluation> create(@RequestBody Evaluation evaluation) {
		evaluation = evaluationRepo.save(evaluation);
		
		return new ResponseEntity<Evaluation>(evaluation, HttpStatus.OK);
	}
	
	@PutMapping("/evaluationOld/{id}")
	public ResponseEntity<Evaluation> update(@RequestBody Evaluation evaluation, @PathVariable Long id) {
		if(!evaluationRepo.existsById(id)) {
			return new ResponseEntity<Evaluation>(HttpStatus.NOT_FOUND);
		}		
		
		evaluation = evaluationRepo.save(evaluation);
		
		return new ResponseEntity<Evaluation>(evaluation, HttpStatus.OK);
	}
	
	@PatchMapping("/evaluationOld/{id}")
	public ResponseEntity<Evaluation> partialUpdate(@RequestBody Map<String, Object> updates, @PathVariable Long id) {
		if (!evaluationRepo.existsById(id)) {
			return new ResponseEntity<Evaluation>(HttpStatus.NOT_FOUND);
		}

		Evaluation evaluationFind = evaluationRepo.findById(id).get();

		if (updates.containsKey("comportemental")) {
			evaluationFind.setComportemental((Integer) updates.get("comportemental"));
		}
		if (updates.containsKey("technique")) {
			evaluationFind.setTechnique((Integer) updates.get("technique"));
		}
		if (updates.containsKey("commentaires")) {
			evaluationFind.setCommentaires((String) updates.get("commentaires"));
		}

		evaluationFind = evaluationRepo.save(evaluationFind);

		return new ResponseEntity<Evaluation>(evaluationFind, HttpStatus.OK);
	}
	
	@DeleteMapping("/evaluationOld/{id}")
	public void delete (@PathVariable Long id) {
		evaluationRepo.deleteById(id);
	}
}
