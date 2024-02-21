DELIMITER //

CREATE PROCEDURE SellStock(IN p_ticker VARCHAR(50), IN p_userid INT, IN p_price DECIMAL(10,2), IN p_quantity INT)
BEGIN
    DECLARE v_existing_quantity INT;
    DECLARE v_average_price DECIMAL(10,2);
    DECLARE v_updated_quantity INT;
    
    -- Retrieve the existing quantity for the stock
    SELECT quantity INTO v_existing_quantity FROM stock_entry WHERE ticker = p_ticker AND userid = p_userid;
    
    IF v_existing_quantity > p_quantity THEN
        -- Calculate the new average price after selling
        SET v_updated_quantity = v_existing_quantity - p_quantity;
        SET v_average_price = ((SELECT price FROM stock_entry WHERE ticker = p_ticker AND userid = p_userid) * v_existing_quantity - p_price * p_quantity) / v_updated_quantity;
        
        -- Update stock_entry with the new average price and decreased quantity
        UPDATE stock_entry   
        SET price = v_average_price, quantity = v_updated_quantity   
        WHERE ticker = p_ticker AND userid = p_userid;
        
        -- Insert a record into transaction_history
        INSERT INTO transaction_history (userid, ticker, price, actions, quantity)   
        VALUES (p_userid, p_ticker, p_price, 'sell', p_quantity);
        
        -- Update the user's funds after a successful sale
        UPDATE users SET fund = fund + (p_price * p_quantity) WHERE id = p_userid;
        
    ELSEIF v_existing_quantity = p_quantity THEN
        DELETE FROM stock_entry WHERE ticker = p_ticker AND userid = p_userid;
        INSERT INTO transaction_history (userid, ticker, price, actions, quantity)   
        VALUES (p_userid, p_ticker, p_price, 'sell', p_quantity);
        
        -- Update the user's funds after a successful sale
        UPDATE users SET fund = fund + (p_price * p_quantity) WHERE id = p_userid;
        
    ELSE
        -- Handle the case where the user tries to sell more stocks than they own
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Not enough stocks to sell';
    END IF;
END//

DELIMITER ;
