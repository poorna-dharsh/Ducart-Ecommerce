
 package com.api.book.bootrestbook.controllers;

 import java.util.List;

 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.DeleteMapping;
 import org.springframework.web.bind.annotation.GetMapping;
 import org.springframework.web.bind.annotation.PathVariable;
 import org.springframework.web.bind.annotation.PostMapping;
 import org.springframework.web.bind.annotation.PutMapping;
 import org.springframework.web.bind.annotation.RequestBody;
 import org.springframework.web.bind.annotation.RequestMapping;
 import org.springframework.web.bind.annotation.RestController;

 import com.api.book.bootrestbook.entities.Book;
 import com.api.book.bootrestbook.services.BookService;
 

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    // Get all books handler

    @GetMapping
    public ResponseEntity<List<Book>> getBooks(){
        List<Book>list = bookService.getAllBooks();
        if(list.size() <= 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
       return ResponseEntity.status(HttpStatus.CREATED).body(list);
    }

    // Get single book handler
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable("id") int id) {
        Book book = bookService.getBookById(id);
        if (book != null) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // New book handler
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book b = bookService.addBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(b);
    }

    // Delete book handler
    @DeleteMapping("/{bookId}")
    public ResponseEntity<Book> deleteBook(@PathVariable("bookId") int bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.noContent().build();
    }

    // Update book handler
    @PutMapping("/{bookId}")
    public ResponseEntity<Book> updateBook(@RequestBody Book book, @PathVariable("bookId") int bookId) {

        bookService.updateBook(book, bookId);
        return ResponseEntity.ok(book);
    }
}
