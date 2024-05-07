package org.esprit.requestproject.services;

import lombok.RequiredArgsConstructor;
import org.esprit.requestproject.entities.Category;
import org.esprit.requestproject.entities.Request;
import org.esprit.requestproject.repositories.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service

public class CategoryService  {
    private final SequenceGeneratorService sequenceGenerator;

    public CategoryService(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Autowired
    private CategoryRepo categoryRepo;


    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }


    public Category getCategoryById(Long id) {

        Category category = null;
        if (id != null) {
            final Optional<Category> optionalCategory = this.categoryRepo.findById(id);
            if (optionalCategory.isPresent()) {
                category = optionalCategory.get();
            } else {
                System.err.println("Erreur : Aucune categorie trouvée pour l'identifiant " + id);
            }
        } else {
            System.err.println("Erreur : L'identifiant de categorie est nul");
        }
        return category;

    }

    public Category createCategory(Category category) {
        category.setIdCategory(sequenceGenerator.generateSequence(Category.SEQUENCE_NAME));
        return  categoryRepo.save(category);

    }





    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);
    }

}
