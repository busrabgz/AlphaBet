CREATE TRIGGER balance_check
    BEFORE UPDATE
    ON user FOR EACH ROW
        IF NEW.account_balance < 0 THEN SET NEW.account_balance = 0; END IF;