package com.devsuperior.dsdeliver.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.dsdeliver.entities.Product;

public interface ProductRepositrory extends JpaRepository<Product, Long> {

	public List<Product> findAllByOrderByNameAsc();
	
}
