package org.esprit.requestproject;

import org.esprit.requestproject.entities.Request;
import org.springframework.data.mongodb.core.index.IndexInfo;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class MongoDbSetup {

    private final MongoTemplate mongoTemplate;

    public MongoDbSetup(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @PostConstruct
    public void init() {
        // Supprimer l'index existant
        List<IndexInfo> indexes = mongoTemplate.indexOps(Request.class).getIndexInfo();

        // Check if the index exists before trying to drop it
        boolean exists = indexes.stream()
                .anyMatch(index -> index.getName().equals("title_text_description_text"));

        if (exists) {
            mongoTemplate.indexOps(Request.class).dropIndex("title_text_description_text");
        }

        // Create the new index
        TextIndexDefinition textIndex = TextIndexDefinition.builder()
                .onField("title")
                .onField("description")
                .onField("status")
                .build();
        mongoTemplate.indexOps(Request.class).ensureIndex(textIndex);
    }
}

