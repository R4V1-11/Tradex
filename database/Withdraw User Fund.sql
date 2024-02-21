DELIMITER //
CREATE PROCEDURE WithdrawUserFund(IN p_userid INT, IN p_fund BIGINT)
BEGIN
  -- Declare a variable to hold the current user's fund
  DECLARE current_fund BIGINT;
  DECLARE updatedFund bigint DEFAULT 0;
   
  -- Get the current fund for the user
  SELECT fund INTO current_fund FROM users WHERE id = p_userid;
   
  -- Check if the user has enough funds
  IF current_fund >= p_fund THEN
    -- Subtract the fund amount from the user's current fund
    UPDATE users
    SET fund = fund - p_fund
    WHERE id = p_userid;
  ELSE
    -- Signal an error if the user does not have enough funds
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'User does not have enough funds to remove';
  END IF;
  SET updatedFund = current_fund - p_fund;
  INSERT INTO fund_transaction_history(userid, actions, amount, updatedAmount) VALUES(p_userid,"Withdraw", p_fund, updatedFund);
END //
DELIMITER ;
-- drop PROCEDURE WithdrawUserFund;
