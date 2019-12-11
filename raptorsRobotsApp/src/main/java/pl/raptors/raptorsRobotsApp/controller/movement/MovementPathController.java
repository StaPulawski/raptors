package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.service.movement.MovementPathService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/movement/movement-paths")
public class MovementPathController {
    @Autowired
    MovementPathService service;

    @GetMapping("/all")
    public List<MovementPath> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public MovementPath add(@RequestBody @Valid MovementPath movementPath) {
        return service.addOne(movementPath);
    }

    @GetMapping("/{id}")
    public MovementPath getOne(@PathVariable String id) {
        return service.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid MovementPath movementPath) {
        service.deleteOne(movementPath);
    }
}