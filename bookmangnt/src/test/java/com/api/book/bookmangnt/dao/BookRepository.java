package com.api.book.bookmangnt.dao;
import org.springframework.data.repository.CrudRepository;

import com.api.book.bookmangnt.entities.Book;
 
public interface BookRepository extends CrudRepository<Book,Integer>{
  public Book findById(int id);
    
}

