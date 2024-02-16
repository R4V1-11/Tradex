DELIMITER //
CREATE PROCEDURE AddUserFund(IN p_userid INT, IN p_fund BIGINT)
BEGIN
  UPDATE users
  SET fund = fund + p_fund
  WHERE id = p_userid;
END //
DELIMITER ;

