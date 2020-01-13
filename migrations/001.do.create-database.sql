CREATE TABLE game_types (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE game_machines (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  serial_number int NOT NULL,
  end_of_guarantee_date date NOT NULL,
  game_type_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FOREIGN KEY (game_type_id) REFERENCES game_types (id)
);

INSERT INTO game_types (name)
VALUES ('t1'), ('t2'), ('t3');
