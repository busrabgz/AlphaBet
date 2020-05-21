CREATE TRIGGER achievement_check_2
AFTER INSERT
ON user_friend FOR EACH ROW
BEGIN
   DECLARE friend_count INT;
   SET friend_count = ( SELECT COUNT(*) FROM user_friend WHERE user_id = NEW.user_id);
   IF friend_count = 3
      THEN
        INSERT INTO gained_achievement VALUES (2, NEW.user_id);
   END IF;
END

CREATE TRIGGER achievement_check_3
AFTER UPDATE
ON bet_slip FOR EACH ROW
BEGIN
    DECLARE slip_count INT;
    SET slip_count = ( SELECT COUNT(*) FROM bet_slip WHERE placed = 1 AND creator_id = NEW.creator_id);
    IF slip_count = 1
        THEN
            INSERT INTO gained_achievement VALUES (3, NEW.creator_id);
    END IF;
END