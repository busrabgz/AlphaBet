CREATE TRIGGER achievement_check
    AFTER INSERT
    ON user_friend FOR EACH ROW
    BEGIN
       DECLARE friend_count INT;
       SET friend_count = ( SELECT COUNT(*) FROM user_friend WHERE user_id = NEW.user_id);
       IF friend_count = 1
         THEN
            INSERT INTO gained_achievement VALUES (1, NEW.user_id);
       END IF;
    END