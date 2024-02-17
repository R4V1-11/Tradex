CREATE TABLE transaction_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid int,
    ticker VARCHAR(255) NOT NULL,
    price DECIMAL(10,  2) NOT NULL, -- Assuming price can have decimal values
    actions varchar(255) NOT NULL, -- Assuming action can only be 'buy' or 'sell'
    quantity INT NOT NULL,
    transaction_time DATETIME DEFAULT CURRENT_TIMESTAMP, -- Field to store the current time
    foreign key (userid) references users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from transaction_history;

select * from users;