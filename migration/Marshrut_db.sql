CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) NOT NULL ,
                       password_hash VARCHAR(255) NOT NULL,
                       salt VARCHAR(255) NOT NULL
);

CREATE TABLE tokens(
                       user_id INTEGER NOT NULL,
                       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                       refresh_token VARCHAR(255) NOT NULL
)