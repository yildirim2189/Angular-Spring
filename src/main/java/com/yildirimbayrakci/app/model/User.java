package com.yildirimbayrakci.app.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "username")
  private String username;

  @Column(name = "password")
  private String password;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "email")
  private String email;

  @Column(name = "type")
  private String type;

  @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.REMOVE, CascadeType.DETACH})
  @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Collection<Role> roles;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "user_tasks", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "task_id", referencedColumnName = "task_id"))
  private Collection<Task> tasks;

    /*
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "user_favorite_movies", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "movie_id"))
    private Set<Movie> favoriteMovies;*/

  public User() {
  }

  public User(String username, String password, String firstName, String lastName, String email) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  public User(String username, String password, String firstName, String lastName, String email,
              Collection<Role> roles) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.roles = roles;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Collection<Role> getRoles() {
    return roles;
  }

  public void setRoles(Collection<Role> roles) {
    this.roles = roles;
  }


    /*
    public Set<Movie> getFavoriteMovies() {
        return favoriteMovies;
    }

    public void setFavoriteMovies(Set<Movie> favoriteMovies) {
        this.favoriteMovies = favoriteMovies;
    }*/



  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

    /*
    public boolean addMovieToFavorites(Movie movie) {
        if(favoriteMovies == null)
            favoriteMovies = new HashSet<Movie>();

        if(!favoriteMovies.contains(movie)) {
            favoriteMovies.add(movie);
            return true;
        }else
            return false;
    }

    public boolean removeMovieFromFavorite(Movie movie) {
        if(favoriteMovies == null)
            favoriteMovies = new HashSet<Movie>();

        if(favoriteMovies.contains(movie)) {
            return favoriteMovies.remove(movie);
        }
        else
            return false;
    }*/

  public Collection<Task> getTasks() {
    return tasks;
  }

  public void setTasks(Collection<Task> tasks) {
    this.tasks = tasks;
  }

  @Override
  public String toString() {
    return "User [id=" + id + ", username=" + username + ", password=" + password + ", firstName=" + firstName
      + ", lastName=" + lastName + ", email=" + email + ", roles=" + roles + "]";
  }

  public boolean addTask(Task task) {
    if(tasks == null){
      tasks = new ArrayList<Task>();
    }
    tasks.add(task);
    return true;
  }

  public boolean removeTask(Long taskId){
    if(tasks == null){
      tasks = new ArrayList<Task>();
      return false;
    }else{
      if(tasks.removeIf(task -> task.getId().longValue() == taskId))
        return true;
      return false;
    }
  }
}
