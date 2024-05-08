package org.esprit.requestproject;

import org.esprit.requestproject.entities.Request;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.index.Index;
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
        List<IndexInfo> indexes = mongoTemplate.indexOps("ma_collection").getIndexInfo();

        // Check if the index exists before trying to drop it
        boolean exists = indexes.stream()
                .anyMatch(index -> index.getName().equals("title_text_description_text_status_text"));

        if (exists) {
            mongoTemplate.indexOps("ma_collection").dropIndex("title_text_description_text_status_text");
        }

        // Créer un index avec un nom spécifique
        Index indexDefinition = new Index()
                .named("title_description_status_index")
                .on("title", Sort.Direction.ASC)
                .on("description", Sort.Direction.ASC)
                .on("status", Sort.Direction.ASC);

// Appliquer l'index à la collection
        mongoTemplate.indexOps("ma_collection").ensureIndex(indexDefinition);
    }
}

