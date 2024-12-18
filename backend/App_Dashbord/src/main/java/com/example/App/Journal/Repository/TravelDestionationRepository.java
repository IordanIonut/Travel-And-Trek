package com.example.App.Journal.Repository;

import com.example.App.Journal.Model.TravelDestination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelDestionationRepository extends JpaRepository<TravelDestination, Long> {
}
