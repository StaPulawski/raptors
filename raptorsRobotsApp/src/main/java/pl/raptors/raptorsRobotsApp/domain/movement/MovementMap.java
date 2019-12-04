package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import org.bson.types.Binary;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "movement_maps")
public class MovementMap {
    @Id
    private String id;
    private String name;
    private Binary mapImage;

    public MovementMap(String name, Binary mapImage) {
        this.name = name;
        this.mapImage = mapImage;
    }
}