package org.esprit.requestproject;

import org.esprit.requestproject.entities.Request;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class MongoDbSetup {

    private final MongoTemplate mongoTemplate;

    public MongoDbSetup(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @PostConstruct
    public void init() {
        // Supprimer l'index existant
       /* mongoTemplate.indexOps(Request.class).dropIndex("title_text_description_text");

        // Créer le nouvel index
        TextIndexDefinition textIndex = TextIndexDefinition.builder()
                .onField("title")
                .onField("description")
                .onField("status") // Ajouter le champ status
                .build();
        mongoTemplate.indexOps(Request.class).ensureIndex(textIndex);*/
    }
}

