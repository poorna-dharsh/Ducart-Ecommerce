package com.api.book.bookmangnt.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.book.bookmangnt.dao.BookRepository;
import com.api.book.bookmangnt.entities.Book;

@Service
public class BookService {
    @Autowired
 private BookRepository bookRepository;
   
    // Get all books
    public List<Book> getAllBooks() {
        List<Book> list=(List<Book>)this.bookRepository.findAll();
        return list;
    }

    // Get single book by id
    public Book getBookById(int id) {
        Book book = null;
        try{
             this.bookRepository.findById(id);
        }catch(Exception e){
            e.printStackTrace();
        }
        return book;
    }

    // Add a book
    public Book addBook(Book b) {
        Book result = bookRepository.save(b);
        return result;
    }

    // Delete book
    public void deleteBook(int id) {
      bookRepository.deleteById(id);
    }

    // Update a book
    public void updateBook(Book book, int bookId) {
        book.setId(bookId);
       bookRepository.save(book);
    } 
}
