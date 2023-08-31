package com.sirhot.Travel.List.Project.repository;

import com.sirhot.Travel.List.Project.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item,Long> {
}
