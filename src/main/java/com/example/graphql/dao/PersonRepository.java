package com.example.graphql.dao;

import com.example.graphql.entity.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, Integer> {
    Person findByEmail(String email);
}
