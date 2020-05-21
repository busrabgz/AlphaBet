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