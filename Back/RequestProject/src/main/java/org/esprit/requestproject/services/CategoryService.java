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
@RequiredArgsConstructor
public class CategoryService  {

    @Autowired
    private CategoryRepo categoryRepo;

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }


   public Category getCategoryById(String id) {

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

    public String createCategory(Category category) {
        categoryRepo.save(category);
        return "Catégorie ajoutée avec succès";
    }



    public Category updateCategory(String id, Category category) {
        Optional<Category> existingCategoryOptional = this.categoryRepo.findById(id);

        if (existingCategoryOptional.isPresent()) {
            Category existingCategory = existingCategoryOptional.get();

            if (category != null) {
                existingCategory.setCategoryName(category.getCategoryName());
                return this.categoryRepo.save(existingCategory);
            } else {
                System.err.println("Erreur : La catégorie envoyée est nulle");
            }
        } else {
            System.err.println("Erreur : Aucune catégorie trouvée pour l'ID " + id);
        }

        return null;
    }

    public void deleteCategory(String id) {
        categoryRepo.deleteById(id);
    }

}
