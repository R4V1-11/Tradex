create table fund_transaction_history(
	id INT AUTO_INCREMENT PRIMARY KEY,
    userid int not null,
    actions varchar(255) NOT NULL, -- Assuming action can only be 'buy' or 'sell'
    amount bigint not null ,
    transaction_time DATETIME DEFAULT CURRENT_TIMESTAMP, -- Field to store the current time
    foreign key (userid) references users(id) ON DELETE CASCADE ON UPDATE CASCADE
);